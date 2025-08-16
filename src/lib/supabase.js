import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions pour l'authentification
export const auth = {
  // Inscription
  signUp: async (email, password, userData) => {
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Déconnexion
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obtenir l'utilisateur actuel
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
}

// Helper functions pour les profils
export const profiles = {
  // Créer un profil
  create: async (profileData) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
    return { data, error }
  },

  // Obtenir un profil par username
  getByUsername: async (username) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()
    return { data, error }
  },

  // Obtenir un profil par ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  // Mettre à jour un profil
  update: async (id, updates) => {
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
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select()
    return { data, error }
  },

  // Obtenir les avis d'un profil (approuvés seulement)
  getByProfile: async (profileId, approved = true) => {
    let query = supabase
      .from('reviews')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
    
    if (approved) {
      query = query.eq('status', 'approved')
    }
    
    const { data, error } = await query
    return { data, error }
  },

  // Obtenir tous les avis d'un utilisateur (pour le dashboard)
  getAllByProfile: async (profileId) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Mettre à jour le statut d'un avis
  updateStatus: async (reviewId, status) => {
    const { data, error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', reviewId)
      .select()
    return { data, error }
  },

  // Supprimer un avis
  delete: async (reviewId) => {
    const { data, error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
    return { data, error }
  }
}