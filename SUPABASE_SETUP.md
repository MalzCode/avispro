# Configuration Supabase pour AvisPro

## Étapes d'installation

### 1. Créer les tables principales
Exécutez le contenu de `supabase_schema.sql` dans l'éditeur SQL de Supabase.

### 2. Ajouter les fonctions personnalisées
Exécutez le contenu de `supabase_functions.sql` dans l'éditeur SQL de Supabase.

### 3. Configuration RLS (Row Level Security)
Les politiques de sécurité sont incluses dans le schéma principal.

## Structure de la base de données

### Tables principales

#### `profiles`
- Informations des entreprises
- Support logo/bannière, contact, adresse
- Gestion des plans (free/premium/annual)
- **Nouveaux champs** : `email`, `website`, `logo_image`, `banner_image`, `address`, `city`, `theme_color`, `custom_domain`

#### `reviews`
- Avis clients avec support photos/vidéos
- Système de modération complet
- Réponses business aux avis
- **Nouveaux champs** : `images` (JSONB), `videos` (JSONB), `source`, `business_response`

#### `subscriptions`
- Gestion des abonnements Stripe
- Tracking des périodes d'essai
- **Intégration Stripe** : `stripe_customer_id`, `stripe_subscription_id`

#### `profile_settings`
- Paramètres personnalisables par profil
- Modération automatique
- Notifications SMS/Email

#### `analytics`
- Statistiques de performance
- Sources de trafic
- Métriques d'engagement

#### `campaigns`
- Campagnes SMS/Email pour collecter des avis
- Tracking de performance

#### `message_templates`
- Templates personnalisables pour SMS/Email
- Variables dynamiques ({customer_name}, {business_name}, etc.)

#### `integrations`
- Connexions avec Google Reviews, Facebook, etc.
- Configuration flexible via JSONB

### Fonctions utiles

#### `get_profile_analytics(profile_uuid, days_back)`
Retourne les statistiques complètes d'un profil.

#### `get_weighted_rating(profile_uuid)`
Calcule une note moyenne pondérée (avis récents ont plus de poids).

#### `generate_unique_username(base_name)`
Génère un nom d'utilisateur unique basé sur un nom donné.

#### `cleanup_old_data()`
Nettoie automatiquement les anciennes données.

### Vues

#### `top_profiles`
Classement des profils les plus performants.

#### `public_profile_stats`
Statistiques publiques pour affichage optimisé.

## Configuration des variables d'environnement

Assurez-vous que votre `.env.local` contient :

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Fonctionnalités supportées

✅ **Profils complets** - Logo, bannière, infos de contact  
✅ **Avis avec médias** - Photos et vidéos dans les avis  
✅ **Modération avancée** - Approbation, rejet, réponses business  
✅ **Analytics** - Statistiques détaillées et sources de trafic  
✅ **Abonnements Stripe** - Gestion des plans payants  
✅ **Campagnes marketing** - SMS/Email automatisés  
✅ **Templates personnalisables** - Messages sur mesure  
✅ **Intégrations externes** - Google Reviews, Facebook, etc.  
✅ **Sécurité RLS** - Accès contrôlé aux données  
✅ **Performance optimisée** - Index et fonctions rapides  

## Migration depuis l'ancienne structure

Si vous avez déjà des données, les nouvelles colonnes ont des valeurs par défaut. Les anciens avis sans images fonctionneront normalement.

## Optimisations incluses

- Index sur les colonnes fréquemment utilisées
- Triggers pour `updated_at` automatique  
- Fonctions pour calculs complexes côté base
- Nettoyage automatique des anciennes données
- Politiques RLS granulaires pour la sécurité