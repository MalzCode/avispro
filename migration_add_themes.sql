-- Migration pour ajouter le support des thèmes à la table profiles
-- À exécuter dans l'éditeur SQL de Supabase

-- Ajouter les colonnes theme_id et theme_config si elles n'existent pas
DO $$ 
BEGIN
    -- Ajouter theme_id si n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'theme_id'
    ) THEN
        ALTER TABLE profiles 
        ADD COLUMN theme_id TEXT DEFAULT 'professional' 
        CHECK (theme_id IN ('professional', 'modern', 'artisan', 'tech', 'creative', 'luxury'));
        
        RAISE NOTICE 'Colonne theme_id ajoutée à la table profiles';
    ELSE
        RAISE NOTICE 'Colonne theme_id existe déjà';
    END IF;

    -- Ajouter theme_config si n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'theme_config'
    ) THEN
        ALTER TABLE profiles 
        ADD COLUMN theme_config JSONB DEFAULT '{}';
        
        RAISE NOTICE 'Colonne theme_config ajoutée à la table profiles';
    ELSE
        RAISE NOTICE 'Colonne theme_config existe déjà';
    END IF;
END $$;

-- Vérifier la structure de la table profiles
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;