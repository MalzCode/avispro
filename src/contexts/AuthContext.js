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
              if (profileError || !profileData) {
                console.warn('Profile not found, creating basic profile for auth change');
                // Créer un profil de base automatiquement
                const username = session.user.email?.split('@')[0]?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'user';
                let uniqueUsername = username;
                let counter = 1;
                
                // Générer un username unique
                while (true) {
                  const { data: existingProfile, error: checkError } = await profiles.getByUsername(uniqueUsername);
                  if (!existingProfile) break;
                  uniqueUsername = `${username}${counter}`;
                  counter++;
                  if (counter > 100) break;
                }
                
                const basicProfile = {
                  id: session.user.id,
                  user_id: session.user.id,
                  username: uniqueUsername,
                  business_name: session.user.email?.split('@')[0] || 'Mon Entreprise',
                  email: session.user.email,
                  phone: null,
                  description: null
                };
                
                try {
                  const { data: newProfile, error: createError } = await profiles.create(basicProfile);
                  if (!createError && newProfile && newProfile[0]) {
                    console.log('Basic profile created in auth change:', newProfile[0]);
                    setProfile(newProfile[0]);
                  } else {
                    console.warn('Failed to create basic profile in auth change:', createError);
                    setProfile(null);
                  }
                } catch (createErr) {
                  console.warn('Error creating basic profile in auth change:', createErr);
                  setProfile(null);
                }
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
          
          console.log('Auth state change complete, setting loading to false');
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
        // Générer un username unique si celui proposé existe déjà
        let uniqueUsername = userData.username;
        let counter = 1;
        
        // Vérifier si le username existe déjà
        while (true) {
          console.log(`Checking if username '${uniqueUsername}' exists...`);
          const { data: existingProfile, error: checkError } = await profiles.getByUsername(uniqueUsername);
          
          if (checkError && checkError.code !== 'PGRST116') {
            // Erreur autre que "not found"
            console.error('Error checking username:', checkError);
            throw new Error('Erreur lors de la vérification du nom d\'utilisateur');
          }
          
          if (!existingProfile) {
            console.log(`Username '${uniqueUsername}' is available`);
            break; // Username disponible
          }
          
          console.log(`Username '${uniqueUsername}' already exists, trying next...`);
          uniqueUsername = `${userData.username}${counter}`;
          counter++;
          
          if (counter > 100) {
            throw new Error('Impossible de générer un nom d\'utilisateur unique');
          }
        }
        
        // Créer le profil utilisateur avec le username unique
        const profileData = {
          id: data.user.id,
          user_id: data.user.id, // Ajouter user_id pour compatibilité
          username: uniqueUsername,
          business_name: userData.business_name,
          phone: userData.phone || null,
          description: userData.description || null,
          email: email, // Ajouter l'email du profil
          is_active: true
        };
        
        console.log('Creating profile with data:', profileData);
        const { data: newProfile, error: profileError } = await profiles.create(profileData);
        
        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw new Error(`Erreur lors de la création du profil: ${profileError.message}`);
        }
        
        console.log('Profile created successfully:', newProfile);
        
        // Mettre à jour l'état local immédiatement
        if (newProfile && newProfile[0]) {
          setProfile(newProfile[0]);
        }
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('SignUp error:', error);
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