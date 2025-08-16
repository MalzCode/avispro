import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables')
  // Fallback pour éviter les erreurs de build
}

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Helper functions pour l'authentification
export const auth = {
  // Inscription
  signUp: async (email, password, userData) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Connexion
  signIn: async (email, password) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Déconnexion
  signOut: async () => {
    if (!supabase) return { error: { message: 'Supabase not configured' } }
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obtenir l'utilisateur actuel
  getUser: async () => {
    if (!supabase) return { user: null, error: { message: 'Supabase not configured' } }
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
}

// Helper functions pour les profils
export const profiles = {
  // Créer un profil
  create: async (profileData) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
    return { data, error }
  },

  // Obtenir un profil par username
  getByUsername: async (username) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()
    return { data, error }
  },

  // Obtenir un profil par ID
  getById: async (id) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  // Mettre à jour un profil
  update: async (id, updates) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  }
}

// Helper functions pour les avis
export const reviews = {
  // Créer un avis
  create: async (reviewData) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    
    // Convertir les images en JSON si nécessaire
    const processedData = {
      ...reviewData,
      images: reviewData.images ? JSON.stringify(reviewData.images) : '[]',
      videos: reviewData.videos ? JSON.stringify(reviewData.videos) : '[]'
    }
    
    const { data, error } = await supabase
      .from('reviews')
      .insert([processedData])
      .select()
    return { data, error }
  },

  // Obtenir les avis d'un profil (approuvés seulement)
  getByProfile: async (profileId, approved = true) => {
    if (!supabase) return { data: [], error: { message: 'Supabase not configured' } }
    let query = supabase
      .from('reviews')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
    
    if (approved) {
      query = query.eq('status', 'approved')
    }
    
    const { data, error } = await query
    
    // Parser les JSON pour images et videos
    if (data) {
      data.forEach(review => {
        try {
          review.images = review.images ? JSON.parse(review.images) : []
          review.videos = review.videos ? JSON.parse(review.videos) : []
        } catch (e) {
          review.images = []
          review.videos = []
        }
      })
    }
    
    return { data, error }
  },

  // Obtenir tous les avis d'un utilisateur (pour le dashboard)
  getAllByProfile: async (profileId) => {
    if (!supabase) return { data: [], error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
    
    // Parser les JSON pour images et videos
    if (data) {
      data.forEach(review => {
        try {
          review.images = review.images ? JSON.parse(review.images) : []
          review.videos = review.videos ? JSON.parse(review.videos) : []
        } catch (e) {
          review.images = []
          review.videos = []
        }
      })
    }
    
    return { data, error }
  },

  // Mettre à jour le statut d'un avis
  updateStatus: async (reviewId, status) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', reviewId)
      .select()
    return { data, error }
  },

  // Supprimer un avis
  delete: async (reviewId) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
    return { data, error }
  },

  // Ajouter une réponse business
  addBusinessResponse: async (reviewId, response) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('reviews')
      .update({ 
        business_response: response,
        response_date: new Date().toISOString()
      })
      .eq('id', reviewId)
      .select()
    return { data, error }
  }
}

// Helper functions pour les abonnements
export const subscriptions = {
  // Créer un abonnement
  create: async (subscriptionData) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([subscriptionData])
      .select()
    return { data, error }
  },

  // Obtenir l'abonnement actuel d'un profil
  getCurrent: async (profileId) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('profile_id', profileId)
      .eq('status', 'active')
      .single()
    return { data, error }
  },

  // Mettre à jour un abonnement
  update: async (subscriptionId, updates) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('id', subscriptionId)
      .select()
    return { data, error }
  }
}

// Helper functions pour les paramètres
export const settings = {
  // Obtenir les paramètres d'un profil
  get: async (profileId) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('profile_settings')
      .select('*')
      .eq('profile_id', profileId)
      .single()
    return { data, error }
  },

  // Créer des paramètres par défaut
  create: async (profileId) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('profile_settings')
      .insert([{ profile_id: profileId }])
      .select()
    return { data, error }
  },

  // Mettre à jour les paramètres
  update: async (profileId, updates) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('profile_settings')
      .update(updates)
      .eq('profile_id', profileId)
      .select()
    return { data, error }
  }
}

// Helper functions pour les statistiques
export const analytics = {
  // Enregistrer une vue de page
  recordPageView: async (profileId, source = 'direct') => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase.rpc('increment_page_view', {
      profile_uuid: profileId,
      view_date: today,
      traffic_source: source
    })
    
    return { data, error }
  },

  // Obtenir les statistiques d'un profil
  getStats: async (profileId, days = 30) => {
    if (!supabase) return { data: [], error: { message: 'Supabase not configured' } }
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .eq('profile_id', profileId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: false })
    
    return { data, error }
  }
}

// Helper functions pour les campagnes
export const campaigns = {
  // Créer une campagne
  create: async (campaignData) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('campaigns')
      .insert([campaignData])
      .select()
    return { data, error }
  },

  // Obtenir les campagnes d'un profil
  getByProfile: async (profileId) => {
    if (!supabase) return { data: [], error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Mettre à jour une campagne
  update: async (campaignId, updates) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase
      .from('campaigns')
      .update(updates)
      .eq('id', campaignId)
      .select()
    return { data, error }
  }
}