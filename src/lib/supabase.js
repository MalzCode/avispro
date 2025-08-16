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
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
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
  }
}