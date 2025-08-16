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
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Récupérer le profil de l'utilisateur
        const { data: profileData } = await profiles.getById(session.user.id);
        setProfile(profileData);
      }
      
      setLoading(false);
    };

    getSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const { data: profileData } = await profiles.getById(session.user.id);
          setProfile(profileData);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
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