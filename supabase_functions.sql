-- Fonctions SQL personnalisées pour AvisPro
-- À exécuter dans l'éditeur SQL de Supabase après le schéma principal

-- Fonction pour incrémenter les vues de page
CREATE OR REPLACE FUNCTION increment_page_view(
    profile_uuid UUID,
    view_date DATE,
    traffic_source TEXT DEFAULT 'direct'
)
RETURNS void AS $$
BEGIN
    INSERT INTO analytics (profile_id, date, page_views, traffic_sources)
    VALUES (
        profile_uuid, 
        view_date, 
        1, 
        jsonb_build_object(traffic_source, 1)
    )
    ON CONFLICT (profile_id, date) 
    DO UPDATE SET 
        page_views = analytics.page_views + 1,
        traffic_sources = analytics.traffic_sources || jsonb_build_object(traffic_source, 
            COALESCE((analytics.traffic_sources->>traffic_source)::INTEGER, 0) + 1
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour obtenir les statistiques complètes d'un profil
CREATE OR REPLACE FUNCTION get_profile_analytics(profile_uuid UUID, days_back INTEGER DEFAULT 30)
RETURNS TABLE (
    total_reviews INTEGER,
    approved_reviews INTEGER,
    pending_reviews INTEGER,
    rejected_reviews INTEGER,
    average_rating DECIMAL(3,2),
    total_page_views INTEGER,
    this_month_reviews INTEGER,
    last_month_reviews INTEGER,
    growth_percentage DECIMAL(5,2)
) AS $$
DECLARE
    current_month_start DATE := date_trunc('month', CURRENT_DATE);
    last_month_start DATE := date_trunc('month', CURRENT_DATE - INTERVAL '1 month');
    last_month_end DATE := current_month_start - INTERVAL '1 day';
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(r.total_reviews, 0)::INTEGER,
        COALESCE(r.approved_reviews, 0)::INTEGER,
        COALESCE(r.pending_reviews, 0)::INTEGER,
        COALESCE(r.rejected_reviews, 0)::INTEGER,
        COALESCE(r.average_rating, 0)::DECIMAL(3,2),
        COALESCE(a.total_page_views, 0)::INTEGER,
        COALESCE(r.this_month_reviews, 0)::INTEGER,
        COALESCE(r.last_month_reviews, 0)::INTEGER,
        CASE 
            WHEN COALESCE(r.last_month_reviews, 0) = 0 THEN 0
            ELSE (
                (COALESCE(r.this_month_reviews, 0) - COALESCE(r.last_month_reviews, 0))::DECIMAL 
                / COALESCE(r.last_month_reviews, 1) * 100
            )
        END::DECIMAL(5,2) as growth_percentage
    FROM (
        SELECT 
            COUNT(*) as total_reviews,
            COUNT(*) FILTER (WHERE status = 'approved') as approved_reviews,
            COUNT(*) FILTER (WHERE status = 'pending') as pending_reviews,
            COUNT(*) FILTER (WHERE status = 'rejected') as rejected_reviews,
            AVG(rating) FILTER (WHERE status = 'approved') as average_rating,
            COUNT(*) FILTER (WHERE created_at >= current_month_start AND status = 'approved') as this_month_reviews,
            COUNT(*) FILTER (WHERE created_at >= last_month_start AND created_at <= last_month_end AND status = 'approved') as last_month_reviews
        FROM reviews 
        WHERE profile_id = profile_uuid
    ) r
    CROSS JOIN (
        SELECT 
            COALESCE(SUM(page_views), 0) as total_page_views
        FROM analytics 
        WHERE profile_id = profile_uuid 
        AND date >= CURRENT_DATE - INTERVAL '1 day' * days_back
    ) a;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour nettoyer les anciens avis en attente (plus de 30 jours)
CREATE OR REPLACE FUNCTION cleanup_old_pending_reviews()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM reviews 
    WHERE status = 'pending' 
    AND created_at < NOW() - INTERVAL '30 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour générer un nom d'utilisateur unique
CREATE OR REPLACE FUNCTION generate_unique_username(base_name TEXT)
RETURNS TEXT AS $$
DECLARE
    attempt_name TEXT;
    counter INTEGER := 0;
BEGIN
    -- Nettoyer le nom de base
    base_name := lower(regexp_replace(base_name, '[^a-z0-9]', '', 'g'));
    base_name := left(base_name, 20); -- Limiter à 20 caractères
    
    -- Si vide, utiliser 'user'
    IF base_name = '' THEN
        base_name := 'user';
    END IF;
    
    attempt_name := base_name;
    
    -- Boucler jusqu'à trouver un nom unique
    WHILE EXISTS (SELECT 1 FROM profiles WHERE username = attempt_name) LOOP
        counter := counter + 1;
        attempt_name := base_name || counter::TEXT;
    END LOOP;
    
    RETURN attempt_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour calculer la note moyenne pondérée (plus récent = plus de poids)
CREATE OR REPLACE FUNCTION get_weighted_rating(profile_uuid UUID)
RETURNS DECIMAL(3,2) AS $$
DECLARE
    weighted_avg DECIMAL(3,2);
BEGIN
    SELECT 
        COALESCE(
            SUM(rating * weight) / SUM(weight), 
            0
        )::DECIMAL(3,2)
    INTO weighted_avg
    FROM (
        SELECT 
            rating,
            -- Donner plus de poids aux avis récents (derniers 90 jours = poids 1, plus ancien = poids réduit)
            CASE 
                WHEN created_at >= NOW() - INTERVAL '90 days' THEN 1.0
                WHEN created_at >= NOW() - INTERVAL '180 days' THEN 0.8
                WHEN created_at >= NOW() - INTERVAL '365 days' THEN 0.6
                ELSE 0.4
            END as weight
        FROM reviews 
        WHERE profile_id = profile_uuid 
        AND status = 'approved'
    ) weighted_reviews;
    
    RETURN COALESCE(weighted_avg, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vue pour le classement des profils par performance
CREATE OR REPLACE VIEW top_profiles AS
SELECT 
    p.id,
    p.username,
    p.business_name,
    p.city,
    COUNT(r.*) FILTER (WHERE r.status = 'approved') as total_reviews,
    COALESCE(AVG(r.rating) FILTER (WHERE r.status = 'approved'), 0) as average_rating,
    get_weighted_rating(p.id) as weighted_rating,
    COUNT(r.*) FILTER (WHERE r.created_at >= NOW() - INTERVAL '30 days' AND r.status = 'approved') as recent_reviews
FROM profiles p
LEFT JOIN reviews r ON p.id = r.profile_id
WHERE p.is_active = true
GROUP BY p.id, p.username, p.business_name, p.city
HAVING COUNT(r.*) FILTER (WHERE r.status = 'approved') >= 3 -- Au moins 3 avis
ORDER BY weighted_rating DESC, total_reviews DESC;

-- Trigger pour créer automatiquement les paramètres par défaut
CREATE OR REPLACE FUNCTION create_default_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profile_settings (profile_id) VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_default_settings
    AFTER INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION create_default_settings();

-- Fonction pour nettoyer périodiquement les anciennes données
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void AS $$
BEGIN
    -- Supprimer les analytics de plus d'un an
    DELETE FROM analytics WHERE date < CURRENT_DATE - INTERVAL '365 days';
    
    -- Supprimer les campagnes terminées de plus de 6 mois
    DELETE FROM campaigns 
    WHERE status IN ('sent', 'cancelled') 
    AND created_at < NOW() - INTERVAL '6 months';
    
    -- Nettoyer les avis rejetés de plus de 90 jours
    DELETE FROM reviews 
    WHERE status = 'rejected' 
    AND created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;