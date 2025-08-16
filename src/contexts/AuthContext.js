'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, auth, profiles } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer la session actuelle
    const getSession = async () => {
      if (!supabase) {
        console.log('No supabase client, setting loading to false');
        setLoading(false);
        return;
      }
      
      try {
        console.log('Getting session...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session:', session?.user?.email);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Récupérer le profil de l'utilisateur
          console.log('Getting profile for user:', session.user.id);
          const { data: profileData, error: profileError } = await profiles.getById(session.user.id);
          console.log('Profile data:', profileData, 'Error:', profileError);
          
          if (profileError || !profileData) {
            console.warn('Profile not found, creating basic profile');
            // Créer un profil de base automatiquement
            const username = session.user.email?.split('@')[0]?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'user';
            const basicProfile = {
              id: session.user.id,
              username: username,
              business_name: session.user.email?.split('@')[0] || 'Mon Entreprise',
              phone: null,
              description: null
            };
            
            try {
              const { data: newProfile, error: createError } = await profiles.create(basicProfile);
              if (!createError && newProfile) {
                console.log('Basic profile created:', newProfile[0]);
                setProfile(newProfile[0]);
              } else {
                console.warn('Failed to create basic profile:', createError);
                setProfile(null);
              }
            } catch (createErr) {
              console.warn('Error creating basic profile:', createErr);
              setProfile(null);
            }
          } else {
            setProfile(profileData);
          }
        }
      } catch (error) {
        console.warn('Auth error:', error);
      }
      
      console.log('Setting loading to false');
      setLoading(false);
    };

    getSession();

    // Écouter les changements d'authentification
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state change:', event, session?.user?.email);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            try {
              const { data: profileData, error: profileError } = await profiles.getById(session.user.id);
              if (profileError) {
                console.warn('Profile error in auth change:', profileError);
                setProfile(null);
              } else {
                setProfile(profileData);
              }
            } catch (error) {
              console.warn('Error getting profile in auth change:', error);
              setProfile(null);
            }
          } else {
            setProfile(null);
          }
          
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    }
    
    // Assurons-nous que loading passe à false même sans supabase
    if (!supabase) {
      setLoading(false);
    }
  }, []);

  // Fonction d'inscription
  const signUp = async (email, password, userData) => {
    try {
      const { data, error } = await auth.signUp(email, password, userData);
      
      if (error) throw error;
      
      if (data.user) {
        // Créer le profil utilisateur
        const profileData = {
          id: data.user.id,
          username: userData.username,
          business_name: userData.business_name,
          phone: userData.phone || null,
          description: userData.description || null
        };
        
        const { error: profileError } = await profiles.create(profileData);
        if (profileError) throw profileError;
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Fonction de connexion
  const signIn = async (email, password) => {
    try {
      const { data, error } = await auth.signIn(email, password);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Fonction de déconnexion
  const signOut = async () => {
    try {
      const { error } = await auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Mettre à jour le profil
  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      const { data, error } = await profiles.update(user.id, updates);
      if (error) throw error;
      
      setProfile(data[0]);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};