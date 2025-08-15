'use client';

import React, { useState } from 'react';

export default function AvisProSimple() {
  const [currentView, setCurrentView] = useState('landing');

  if (currentView === 'landing') {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '1rem'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#4f46e5'
            }}>
              AvisPro
            </div>
            <button 
              onClick={() => setCurrentView('signup')}
              style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Connexion
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 1rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Votre page d'avis clients<br/>
            <span style={{ color: '#4f46e5' }}>en 2 minutes</span>
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem auto'
          }}>
            Créez votre page personnalisée pour collecter et afficher les avis de vos clients. 
            Parfait pour artisans, consultants, freelances et petites entreprises.
          </p>

          <button 
            onClick={() => setCurrentView('signup')}
            style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.125rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '3rem'
            }}
          >
            Essayer Gratuitement
          </button>

          {/* Comment ça marche */}
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              Comment ça marche ?
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#dbeafe',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#4f46e5'
                  }}>1</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Créez votre page
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Inscrivez-vous en 2 minutes et obtenez votre lien personnalisé
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#dcfce7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#16a34a'
                  }}>2</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Partagez avec vos clients
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Envoyez votre lien par SMS, email ou donnez-le directement
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#f3e8ff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#9333ea'
                  }}>3</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Récoltez les avis
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Vos clients laissent facilement leur avis. Vous gérez tout depuis votre dashboard
                </p>
              </div>
            </div>

            {/* Demo Preview */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              padding: '2rem',
              margin: '2rem auto',
              maxWidth: '600px'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Votre page d'avis en action
                </h3>
                <p style={{ color: '#6b7280' }}>Voici à quoi ressemble une page AvisPro</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '2px dashed #4f46e5',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    backgroundColor: '#4f46e5',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}>
                    <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>JP</span>
                  </div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Maçonnerie JP</h4>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>⭐⭐⭐⭐⭐ 5.0 (12 avis)</p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    backgroundColor: 'white',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.75rem' }}>Marie D.</span>
                      <span style={{ color: '#fbbf24' }}>⭐⭐⭐⭐⭐</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>5.0</span>
                  <span style={{ color: '#6b7280' }}>(2 avis)</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  ✅ Devis gratuit<br/>
                  ✅ Assurance décennale
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{
                  backgroundColor: '#d97706',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                  Demander un devis
                </button>
                <button 
                  onClick={() => alert('Formulaire d\'avis en cours...')}
                  style={{
                    border: '2px solid #d97706',
                    color: '#d97706',
                    backgroundColor: 'transparent',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Laisser un avis
                </button>
              </div>
            </div>
            <div style={{
              backgroundColor: '#e5e7eb',
              borderRadius: '1rem',
              height: '24rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#6b7280' }}>Photo chantier principal</span>
            </div>
              </div>
            </section>
			
            {/* Services */}
            <section style={{ padding: '4rem 1rem', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              Mes services
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#fef3c7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🏗️</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Construction</h3>
                <p style={{ color: '#6b7280' }}>Maisons, extensions, garages. Du gros œuvre aux finitions.</p>
              </div>
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#fef3c7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🔨</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Rénovation</h3>
                <p style={{ color: '#6b7280' }}>Réfection complète, mise aux normes, modernisation.</p>
              </div>
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#fef3c7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🌿</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Aménagement</h3>
                <p style={{ color: '#6b7280' }}>Terrasses, allées, murets, aménagement paysager.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Avis Section */}
        <section style={{ padding: '4rem 1rem', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ce que disent mes clients</h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                marginBottom: '1.5rem'
              }}>
                La satisfaction client est ma priorité. Découvrez les retours de mes derniers chantiers.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1rem 1.5rem',
                  borderRadius: '9999px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#fbbf24' }}>⭐⭐⭐⭐⭐</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>5.0</span>
                    <span style={{ color: '#6b7280' }}>/ 5</span>
                  </div>
                </div>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1rem 1.5rem',
                  borderRadius: '9999px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>2</span>
                  <span style={{ color: '#6b7280', marginLeft: '0.25rem' }}>avis clients</span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>M</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Marie Dubois</h3>
                      <span style={{ color: '#fbbf24' }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p style={{
                      color: '#374151',
                      lineHeight: '1.6',
                      marginBottom: '0.75rem',
                      fontStyle: 'italic'
                    }}>
                      "Travail impeccable ! Jean-Paul a refait ma terrasse en 3 jours. Très professionnel et soigneux."
                    </p>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Chantier réalisé le 2025-08-10
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>P</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Philippe Martin</h3>
                      <span style={{ color: '#fbbf24' }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p style={{
                      color: '#374151',
                      lineHeight: '1.6',
                      marginBottom: '0.75rem',
                      fontStyle: 'italic'
                    }}>
                      "Excellent maçon, ponctuel et de bon conseil. Je recommande vivement !"
                    </p>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Chantier réalisé le 2025-08-05
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Vous avez travaillé avec moi ?
              </h3>
              <p style={{
                fontSize: '1.125rem',
                marginBottom: '1.5rem',
                color: '#fef3c7'
              }}>
                Votre avis m'aide à améliorer mes services et guide mes futurs clients
              </p>
              <button 
                onClick={() => alert('Formulaire d\'avis sera bientôt disponible !')}
                style={{
                  backgroundColor: 'white',
                  color: '#d97706',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                ⭐ Laisser un avis
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '2rem 1rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#d97706',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>JP</span>
                </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Maçonnerie JP</p>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Jean-Paul Dubois - Artisan maçon</p>
                </div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#9ca3af' }}>
                <p>© 2025 Maçonnerie JP - Tous droits réservés</p>
                <p style={{ marginTop: '0.25rem' }}>
                  Site créé avec{' '}
                  <button 
                    onClick={() => setCurrentView('landing')}
                    style={{
                      color: '#fbbf24',
                      textDecoration: 'underline',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    AvisPro
                  </button>
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button 
                  onClick={() => alert('Dashboard admin en développement !')}
                  style={{
                    color: '#fbbf24',
                    textDecoration: 'underline',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  🔧 Mode Admin
                </button>
                <button 
                  onClick={() => alert('Test client : Formulaire bientôt disponible !')}
                  style={{
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  👤 Tester comme client
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return null;
}f24', fontSize: '0.75rem' }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#374151' }}>"Travail impeccable ! Très professionnel."</p>
                  </div>

                  <div style={{
                    backgroundColor: 'white',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.75rem' }}>Philippe M.</span>
                      <span style={{ color: '#fbbf24', fontSize: '0.75rem' }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#374151' }}>"Ponctuel et de bon conseil. Je recommande !"</p>
                  </div>
                </div>

                <button 
                  onClick={() => setCurrentView('public-page')}
                  style={{
                    width: '100%',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}
                >
                  ⭐ Voir la démo
                </button>
              </div>
            </div>

            {/* Pricing */}
            <div style={{ marginTop: '4rem' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                Tarifs simples et transparents
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1000px',
                margin: '0 auto'
              }}>
                {/* Plan Gratuit */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: '2px solid #e5e7eb'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Gratuit</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>Pour tester AvisPro</p>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
                    0€<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/mois</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                      Jusqu'à 2 avis
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                      Page personnalisée
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                      Formulaire de collecte
                    </li>
                  </ul>
                  <button 
                    onClick={() => setCurrentView('signup')}
                    style={{
                      width: '100%',
                      border: '2px solid #4f46e5',
                      color: '#4f46e5',
                      backgroundColor: 'transparent',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Commencer gratuitement
                  </button>
                </div>

                {/* Plan Premium */}
                <div style={{
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-0.75rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fbbf24',
                    color: '#1f2937',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    POPULAIRE
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Premium</h3>
                  <p style={{ color: '#c7d2fe', fontSize: '0.875rem', marginBottom: '1rem' }}>Mensuel</p>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    5€<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/mois</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'white', borderRadius: '50%' }}></span>
                      Avis illimités
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'white', borderRadius: '50%' }}></span>
                      Photos dans les avis
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'white', borderRadius: '50%' }}></span>
                      Page personnalisée
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'white', borderRadius: '50%' }}></span>
                      Support prioritaire
                    </li>
                  </ul>
                  <button 
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: '#4f46e5',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Choisir Premium
                  </button>
                </div>

                {/* Plan Annuel */}
                <div style={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-0.75rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fbbf24',
                    color: '#1f2937',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    ÉCONOMIE
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Premium</h3>
                  <p style={{ color: '#bbf7d0', fontSize: '0.875rem', marginBottom: '0.5rem' }}>12 mois</p>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    39€<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/an</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#bbf7d0', marginBottom: '1rem' }}>
                    <span style={{ textDecoration: 'line-through' }}>60€</span> 
                    <span style={{ fontWeight: 'bold', color: '#fbbf24', marginLeft: '0.5rem' }}>-35%</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'white', borderRadius: '50%' }}></span>
                      Avis illimités
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'white', borderRadius: '50%' }}></span>
                      Photos dans les avis
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#fbbf24', borderRadius: '50%' }}></span>
                      2 mois gratuits
                    </li>
                  </ul>
                  <button 
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: '#16a34a',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Choisir 12 mois
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p style={{ color: '#6b7280' }}>
                  ✨ Tous les plans incluent le support client • Annulation possible à tout moment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'signup') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5', marginBottom: '0.5rem' }}>AvisPro</div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Créez votre page d'avis</h2>
            <p style={{ color: '#6b7280' }}>En 2 minutes, c'est parti !</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                Votre nom/prénom
              </label>
              <input 
                type="text" 
                placeholder="Jean-Paul"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                Votre activité
              </label>
              <input 
                type="text" 
                placeholder="Maçonnerie JP"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                Votre lien personnalisé
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  placeholder="jean-paul"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem 0 0 0.5rem',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <span style={{
                  padding: '0.75rem',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderLeft: 'none',
                  borderRadius: '0 0.5rem 0.5rem 0',
                  color: '#6b7280'
                }}>
                  .avispro.com
                </span>
              </div>
            </div>

            <button 
              onClick={() => alert('Dashboard en cours de développement !')}
              style={{
                width: '100%',
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              Créer ma page gratuitement
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button 
              onClick={() => setCurrentView('landing')}
              style={{
                color: '#4f46e5',
                textDecoration: 'underline',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              ← Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'public-page') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#d97706',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>JP</span>
                </div>
                <div>
                  <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>Maçonnerie JP</h1>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Artisan depuis 15 ans</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>📞 06 12 34 56 78</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
          padding: '4rem 1rem'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}>
                Maçonnerie de qualité<br/>
                <span style={{ color: '#d97706' }}>depuis 2009</span>
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                Spécialisé dans la construction, rénovation et aménagement extérieur. 
                Travail soigné, respect des délais et satisfaction client garantie.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#fbb