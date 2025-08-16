'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user, profile } = useAuth();

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
          <div style={{ display: 'flex', gap: '1rem' }}>
            {user ? (
              <>
                <Link 
                  href="/dashboard"
                  style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Dashboard
                </Link>
                {profile && (
                  <Link 
                    href={`/${profile.username}`}
                    style={{
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontWeight: '600'
                    }}
                  >
                    Ma page
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link 
                  href="/login"
                  style={{
                    color: '#4f46e5',
                    padding: '0.5rem 1rem',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Connexion
                </Link>
                <Link 
                  href="/signup"
                  style={{
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
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
          Votre page d&apos;avis clients<br/>
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

        {!user ? (
          <Link 
            href="/signup"
            style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Essayer Gratuitement
          </Link>
        ) : (
          <Link 
            href="/dashboard"
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Accéder à mon Dashboard
          </Link>
        )}

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
                Votre page d&apos;avis en action
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
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    &quot;Excellent travail, très professionnel !&quot;
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.75rem' }}>Pierre L.</span>
                    <span style={{ color: '#fbbf24' }}>⭐⭐⭐⭐⭐</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    &quot;Travail impeccable et dans les délais&quot;
                  </div>
                </div>
              </div>

              <button 
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

          {/* Pricing Section */}
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
                    Jusqu&apos;à 2 avis
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
                <Link 
                  href="/signup"
                  style={{
                    display: 'block',
                    width: '100%',
                    border: '2px solid #4f46e5',
                    color: '#4f46e5',
                    backgroundColor: 'transparent',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                  }}
                >
                  Commencer gratuitement
                </Link>
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