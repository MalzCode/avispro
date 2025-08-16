-- AvisPro - Schéma de base de données Supabase complet
-- À exécuter dans l'éditeur SQL de Supabase

-- Table des profils d'entreprise
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    business_name TEXT NOT NULL,
    description TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    logo_image TEXT, -- URL ou base64 du logo
    banner_image TEXT, -- URL ou base64 de la bannière
    
    -- Informations business
    address TEXT,
    city TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'France',
    
    -- Paramètres
    theme_color TEXT DEFAULT '#667eea',
    custom_domain TEXT, -- pour domaine personnalisé
    
    -- Statut et limites
    plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'premium', 'annual')),
    max_reviews INTEGER DEFAULT 100, -- limite selon le plan
    is_active BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des avis clients
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Informations client
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    
    -- Contenu de l'avis
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    images JSONB DEFAULT '[]', -- Array d'URLs/base64 des images
    videos JSONB DEFAULT '[]', -- Array d'URLs des vidéos
    
    -- Métadonnées
    source TEXT DEFAULT 'web', -- web, sms, email, qr_code
    ip_address INET,
    user_agent TEXT,
    
    -- Modération
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
    moderated_at TIMESTAMP WITH TIME ZONE,
    moderated_by UUID REFERENCES auth.users(id),
    rejection_reason TEXT,
    
    -- Réponse du business
    business_response TEXT,
    response_date TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des abonnements (Stripe)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Stripe
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    stripe_price_id TEXT,
    
    -- Détails de l'abonnement
    plan_type TEXT NOT NULL CHECK (plan_type IN ('free', 'premium', 'annual')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
    
    -- Dates
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des paramètres personnalisés
CREATE TABLE profile_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Paramètres d'affichage
    show_contact_info BOOLEAN DEFAULT true,
    show_average_rating BOOLEAN DEFAULT true,
    require_email BOOLEAN DEFAULT false,
    require_phone BOOLEAN DEFAULT false,
    
    -- Modération automatique
    auto_approve_5_stars BOOLEAN DEFAULT false,
    auto_approve_4_stars BOOLEAN DEFAULT false,
    moderate_keywords JSONB DEFAULT '[]', -- mots-clés à modérer
    
    -- Notifications
    email_new_review BOOLEAN DEFAULT true,
    email_weekly_summary BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT false,
    
    -- Widgets et intégrations
    widget_enabled BOOLEAN DEFAULT true,
    qr_code_enabled BOOLEAN DEFAULT true,
    google_reviews_sync BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des statistiques d'analyse
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Métriques
    date DATE NOT NULL,
    page_views INTEGER DEFAULT 0,
    review_form_views INTEGER DEFAULT 0,
    reviews_submitted INTEGER DEFAULT 0,
    reviews_approved INTEGER DEFAULT 0,
    
    -- Sources de trafic
    traffic_sources JSONB DEFAULT '{}', -- {direct: 10, social: 5, email: 2}
    
    -- Performance
    avg_time_on_page INTEGER DEFAULT 0, -- en secondes
    bounce_rate DECIMAL(5,2) DEFAULT 0.00,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(profile_id, date)
);

-- Table des invitations/campagnes
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Détails de la campagne
    name TEXT NOT NULL,
    type TEXT DEFAULT 'sms' CHECK (type IN ('sms', 'email', 'qr_code', 'link')),
    message TEXT,
    
    -- Targeting
    customer_list JSONB DEFAULT '[]', -- array de contacts
    send_date TIMESTAMP WITH TIME ZONE,
    
    -- Statistiques
    sent_count INTEGER DEFAULT 0,
    opened_count INTEGER DEFAULT 0,
    clicked_count INTEGER DEFAULT 0,
    reviews_generated INTEGER DEFAULT 0,
    
    -- Statut
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'cancelled')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des templates de messages
CREATE TABLE message_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Template
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('sms', 'email', 'review_request')),
    subject TEXT, -- pour emails
    message TEXT NOT NULL,
    
    -- Variables disponibles: {customer_name}, {business_name}, {review_link}
    is_default BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des intégrations externes
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Type d'intégration
    provider TEXT NOT NULL CHECK (provider IN ('google', 'facebook', 'trustpilot', 'webhook')),
    config JSONB NOT NULL DEFAULT '{}', -- configuration spécifique
    
    -- Statut
    is_active BOOLEAN DEFAULT true,
    last_sync TIMESTAMP WITH TIME ZONE,
    sync_status TEXT DEFAULT 'success' CHECK (sync_status IN ('success', 'error', 'pending')),
    error_message TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les performances
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_reviews_profile_id ON reviews(profile_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);
CREATE INDEX idx_analytics_profile_date ON analytics(profile_id, date);
CREATE INDEX idx_campaigns_profile_id ON campaigns(profile_id);

-- Fonctions pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profile_settings_updated_at BEFORE UPDATE ON profile_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_message_templates_updated_at BEFORE UPDATE ON message_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Politiques RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Politiques pour profiles
CREATE POLICY "Users can view public profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politiques pour reviews
CREATE POLICY "Anyone can view approved reviews" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Profile owners can view all their reviews" ON reviews FOR SELECT USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Anyone can create reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Profile owners can update review status" ON reviews FOR UPDATE USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Politiques pour subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Users can manage own subscriptions" ON subscriptions FOR ALL USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Politiques pour profile_settings
CREATE POLICY "Users can manage own settings" ON profile_settings FOR ALL USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Politiques pour analytics
CREATE POLICY "Users can view own analytics" ON analytics FOR SELECT USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
CREATE POLICY "System can insert analytics" ON analytics FOR INSERT WITH CHECK (true);

-- Politiques pour campaigns
CREATE POLICY "Users can manage own campaigns" ON campaigns FOR ALL USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Politiques pour message_templates
CREATE POLICY "Users can manage own templates" ON message_templates FOR ALL USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Politiques pour integrations
CREATE POLICY "Users can manage own integrations" ON integrations FOR ALL USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Fonctions utilitaires
CREATE OR REPLACE FUNCTION get_profile_stats(profile_uuid UUID)
RETURNS TABLE (
    total_reviews INTEGER,
    approved_reviews INTEGER,
    pending_reviews INTEGER,
    average_rating DECIMAL(3,2),
    this_month_reviews INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(COUNT(*), 0)::INTEGER as total_reviews,
        COALESCE(COUNT(*) FILTER (WHERE status = 'approved'), 0)::INTEGER as approved_reviews,
        COALESCE(COUNT(*) FILTER (WHERE status = 'pending'), 0)::INTEGER as pending_reviews,
        COALESCE(AVG(rating) FILTER (WHERE status = 'approved'), 0)::DECIMAL(3,2) as average_rating,
        COALESCE(COUNT(*) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE) AND status = 'approved'), 0)::INTEGER as this_month_reviews
    FROM reviews 
    WHERE profile_id = profile_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vue pour les statistiques publiques
CREATE VIEW public_profile_stats AS
SELECT 
    p.id,
    p.username,
    p.business_name,
    p.description,
    p.phone,
    p.email,
    p.website,
    p.logo_image,
    p.banner_image,
    COALESCE(COUNT(r.*) FILTER (WHERE r.status = 'approved'), 0) as total_approved_reviews,
    COALESCE(AVG(r.rating) FILTER (WHERE r.status = 'approved'), 0) as average_rating
FROM profiles p
LEFT JOIN reviews r ON p.id = r.profile_id
WHERE p.is_active = true
GROUP BY p.id;

-- Données de démonstration (optionnel)
INSERT INTO profiles (user_id, username, business_name, description, phone, email, website) VALUES
('00000000-0000-0000-0000-000000000000', 'demo', 'Entreprise Démo', 'Une entreprise de démonstration pour tester AvisPro', '01 23 45 67 89', 'contact@demo.com', 'https://demo.com');

-- Templates de messages par défaut
INSERT INTO message_templates (profile_id, name, type, message, is_default) 
SELECT 
    p.id,
    'SMS par défaut',
    'sms',
    'Bonjour {customer_name}, merci pour votre achat chez {business_name} ! Pourriez-vous laisser un avis ? {review_link}',
    true
FROM profiles p
WHERE p.username = 'demo';

INSERT INTO message_templates (profile_id, name, type, subject, message, is_default)
SELECT 
    p.id,
    'Email par défaut',
    'email',
    'Votre avis compte pour {business_name}',
    'Bonjour {customer_name},<br><br>Merci d''avoir fait confiance à {business_name} !<br><br>Votre expérience nous intéresse. Pourriez-vous prendre 2 minutes pour laisser un avis ?<br><br><a href="{review_link}">Laisser un avis</a><br><br>Merci beaucoup !',
    true
FROM profiles p
WHERE p.username = 'demo';

-- Paramètres par défaut
INSERT INTO profile_settings (profile_id)
SELECT id FROM profiles WHERE username = 'demo';

COMMENT ON TABLE profiles IS 'Profils des entreprises utilisant AvisPro';
COMMENT ON TABLE reviews IS 'Avis clients avec support photos/vidéos et modération';
COMMENT ON TABLE subscriptions IS 'Gestion des abonnements Stripe';
COMMENT ON TABLE profile_settings IS 'Paramètres personnalisés par profil';
COMMENT ON TABLE analytics IS 'Statistiques d''utilisation et performance';
COMMENT ON TABLE campaigns IS 'Campagnes d''invitation pour collecter des avis';
COMMENT ON TABLE message_templates IS 'Templates de messages SMS/Email personnalisables';
COMMENT ON TABLE integrations IS 'Intégrations avec services externes (Google, Facebook, etc.)';