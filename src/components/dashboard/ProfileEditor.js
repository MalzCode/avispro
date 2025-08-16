'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { themes } from '../../data/themes';
import { settings } from '../../lib/supabase';
import ThemePreview from '../themes/ThemePreview';

export default function ProfileEditor({ isOpen, onClose }) {
  const { profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    business_name: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    logo_image: '',
    banner_image: '',
    theme_id: 'professional'
  });
  const [previewData, setPreviewData] = useState({});
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'theme', 'preview'

  // Avis de démonstration pour la prévisualisation
  const demoReviews = [
    {
      customer_name: 'Marie Dubois',
      rating: 5,
      comment: 'Service exceptionnel ! Je recommande vivement cette entreprise.',
      created_at: new Date().toISOString()
    },
    {
      customer_name: 'Pierre Martin',
      rating: 4,
      comment: 'Très satisfait du travail réalisé, équipe professionnelle.',
      created_at: new Date().toISOString()
    },
    {
      customer_name: 'Sophie Laurent',
      rating: 5,
      comment: 'Parfait ! Délais respectés et qualité au rendez-vous.',
      created_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    if (profile) {
      const data = {
        business_name: profile.business_name || '',
        description: profile.description || '',
        phone: profile.phone || '',
        email: profile.email || '',
        website: profile.website || '',
        logo_image: profile.logo_image || '',
        banner_image: profile.banner_image || '',
        theme_id: profile.theme_id || 'professional'
      };
      setFormData(data);
      setPreviewData(data);
    }
  }, [profile]);

  // Mettre à jour la prévisualisation en temps réel
  useEffect(() => {
    setPreviewData(formData);
  }, [formData]);

  if (!isOpen) return null;

  const handleImageUpload = (type) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert('L&apos;image est trop voluminose (max 5MB)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        [type]: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Mettre à jour le profil principal
      const { error: profileError } = await updateProfile(formData);
      
      if (profileError) {
        alert('Erreur lors de la mise à jour du profil: ' + profileError.message);
        setSaving(false);
        return;
      }

      // Mettre à jour les paramètres avec le thème sélectionné
      if (profile && profile.id) {
        try {
          const { error: settingsError } = await settings.update(profile.id, {
            selected_theme_id: formData.theme_id
          });
          
          if (settingsError) {
            console.warn('Error updating theme settings:', settingsError);
            // Créer les paramètres s'ils n'existent pas
            const { error: createError } = await settings.create(profile.id);
            if (!createError) {
              await settings.update(profile.id, {
                selected_theme_id: formData.theme_id
              });
            }
          }
        } catch (settingsErr) {
          console.warn('Settings update error:', settingsErr);
        }
      }
      
      alert('Profil mis à jour avec succès !');
      onClose();
    } catch (err) {
      console.error('Update error:', err);
      alert('Erreur inattendue lors de la mise à jour');
    }
    
    setSaving(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        width: '100%',
        maxWidth: '1400px',
        height: '90vh',
        display: 'flex',
        overflow: 'hidden',
        boxShadow: '0 25px 100px rgba(0,0,0,0.3)'
      }}>
        {/* Panel de gauche - Éditeur */}
        <div style={{
          width: '50%',
          padding: '2rem',
          borderRight: '1px solid #e5e7eb',
          overflow: 'auto'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem' 
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              Éditeur de profil
            </h2>
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              ×
            </button>
          </div>

          {/* Onglets */}
          <div style={{ 
            display: 'flex', 
            marginBottom: '2rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            {[
              { id: 'info', label: 'Informations', icon: '📝' },
              { id: 'theme', label: 'Thème', icon: '🎨' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1rem 1.5rem',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.id ? '2px solid #4f46e5' : '2px solid transparent',
                  color: activeTab === tab.id ? '#4f46e5' : '#6b7280',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  fontSize: '0.875rem'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          <form onSubmit={handleSubmit}>
            {activeTab === 'info' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Nom de votre entreprise *
                  </label>
                  <input 
                    type="text" 
                    value={formData.business_name}
                    onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                    placeholder="Maçonnerie Martin"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Description de votre activité
                  </label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Spécialiste en maçonnerie depuis 20 ans..."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: '#374151', 
                      marginBottom: '0.5rem' 
                    }}>
                      Téléphone
                    </label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="06 12 34 56 78"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: '#374151', 
                      marginBottom: '0.5rem' 
                    }}>
                      Email
                    </label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="contact@entreprise.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Site web
                  </label>
                  <input 
                    type="url" 
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="https://www.monentreprise.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: '#374151', 
                      marginBottom: '0.5rem' 
                    }}>
                      Logo de l&apos;entreprise
                    </label>
                    <div style={{
                      border: '2px dashed #d1d5db',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      textAlign: 'center',
                      backgroundColor: '#f8fafc',
                      cursor: 'pointer',
                      minHeight: '100px'
                    }}
                    onClick={() => document.getElementById('logo-upload').click()}
                    >
                      {formData.logo_image ? (
                        <div style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          backgroundImage: `url(${formData.logo_image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          margin: '0 auto',
                          border: '2px solid #e5e7eb'
                        }} />
                      ) : (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ 
                            margin: '0 auto 0.5rem auto', 
                            color: '#9ca3af' 
                          }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>Logo</p>
                        </>
                      )}
                      <input 
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="logo-upload"
                        onChange={handleImageUpload('logo_image')}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: '#374151', 
                      marginBottom: '0.5rem' 
                    }}>
                      Bannière
                    </label>
                    <div style={{
                      border: '2px dashed #d1d5db',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      textAlign: 'center',
                      backgroundColor: '#f8fafc',
                      cursor: 'pointer',
                      minHeight: '100px'
                    }}
                    onClick={() => document.getElementById('banner-upload').click()}
                    >
                      {formData.banner_image ? (
                        <div style={{
                          width: '100%',
                          height: '60px',
                          borderRadius: '0.5rem',
                          backgroundImage: `url(${formData.banner_image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          border: '2px solid #e5e7eb'
                        }} />
                      ) : (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ 
                            margin: '0 auto 0.5rem auto', 
                            color: '#9ca3af' 
                          }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>Bannière</p>
                        </>
                      )}
                      <input 
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="banner-upload"
                        onChange={handleImageUpload('banner_image')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'theme' && (
              <div>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#374151'
                }}>
                  Choisissez votre thème
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  {Object.values(themes).map(theme => (
                    <div
                      key={theme.id}
                      onClick={() => setFormData({...formData, theme_id: theme.id})}
                      style={{
                        border: formData.theme_id === theme.id ? '2px solid #4f46e5' : '1px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        cursor: 'pointer',
                        backgroundColor: formData.theme_id === theme.id ? '#f0f4ff' : 'white',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Mini preview du thème */}
                      <div style={{
                        height: '80px',
                        borderRadius: '0.5rem',
                        background: theme.config.gradients.header,
                        marginBottom: '1rem',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          bottom: '0.5rem',
                          left: '0.5rem',
                          right: '0.5rem',
                          height: '20px',
                          backgroundColor: theme.config.colors.card,
                          borderRadius: '0.25rem',
                          opacity: 0.9
                        }} />
                      </div>
                      
                      <h4 style={{ 
                        fontSize: '1rem', 
                        fontWeight: 'bold', 
                        marginBottom: '0.25rem',
                        color: '#374151'
                      }}>
                        {theme.name}
                      </h4>
                      <p style={{ 
                        fontSize: '0.75rem', 
                        color: '#6b7280' 
                      }}>
                        {theme.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button 
                type="submit"
                disabled={saving}
                style={{
                  flex: 1,
                  backgroundColor: saving ? '#9ca3af' : '#10b981',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontWeight: '600'
                }}
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder les changements'}
              </button>
              <button 
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: '#6b7280',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>

        {/* Panel de droite - Aperçu en temps réel */}
        <div style={{
          width: '50%',
          backgroundColor: '#f8fafc',
          overflow: 'auto'
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: 'bold', 
              color: '#374151',
              textAlign: 'center'
            }}>
              🔍 Aperçu en temps réel
            </h3>
            <p style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              textAlign: 'center',
              marginTop: '0.25rem'
            }}>
              Voici comment apparaîtra votre page publique
            </p>
          </div>
          
          <div style={{ transform: 'scale(0.7)', transformOrigin: 'top center' }}>
            <ThemePreview 
              themeId={previewData.theme_id || 'professional'}
              profile={previewData}
              reviews={demoReviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
}