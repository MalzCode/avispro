'use client';

import { getThemeConfig } from '../../data/themes';

export default function ThemePreview({ themeId, profile, reviews = [] }) {
  const theme = getThemeConfig(themeId);
  const { colors, gradients, typography, layout } = theme.config;

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const containerStyle = {
    minHeight: '100vh',
    background: typeof colors.background === 'string' && colors.background.includes('gradient') 
      ? colors.background 
      : colors.background,
    fontFamily: typography.fontFamily,
    padding: '2rem 1rem'
  };

  return (
    <div style={containerStyle}>
      <div style={{ 
        maxWidth: layout.maxWidth, 
        margin: '0 auto' 
      }}>
        {/* Header avec bannière */}
        <div style={{
          backgroundColor: colors.card,
          borderRadius: layout.borderRadius,
          boxShadow: layout.shadow,
          marginBottom: layout.spacing,
          overflow: 'hidden'
        }}>
          {/* Bannière */}
          <div style={{
            height: '200px',
            background: profile.banner_image 
              ? `url(${profile.banner_image}) center/cover`
              : gradients.header,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!profile.banner_image && (
                <div style={{ 
                  color: 'white', 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  opacity: 0.8 
                }}>
                  {theme.name} Theme
                </div>
              )}
            </div>
          </div>
          
          {/* Contenu principal */}
          <div style={{ 
            padding: layout.spacing, 
            textAlign: 'center', 
            marginTop: '-3rem', 
            position: 'relative' 
          }}>
            {/* Logo/Avatar */}
            <div style={{
              width: '6rem',
              height: '6rem',
              backgroundColor: colors.primary,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              border: `4px solid ${colors.card}`,
              boxShadow: layout.shadow,
              backgroundImage: profile.logo_image ? `url(${profile.logo_image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              {!profile.logo_image && (
                <span style={{ 
                  color: 'white', 
                  fontSize: '2rem', 
                  fontWeight: 'bold' 
                }}>
                  {profile.business_name?.charAt(0)?.toUpperCase() || 'B'}
                </span>
              )}
            </div>
            
            <h1 style={{ 
              fontSize: typography.titleSize, 
              fontWeight: typography.titleWeight, 
              marginBottom: '1rem',
              background: gradients.header,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: colors.text
            }}>
              {profile.business_name || 'Nom de votre entreprise'}
            </h1>
            
            {profile.description && (
              <p style={{ 
                color: colors.textSecondary, 
                marginBottom: '1.5rem', 
                fontSize: typography.bodySize,
                maxWidth: '600px',
                margin: '0 auto 1.5rem auto',
                lineHeight: '1.6'
              }}>
                {profile.description}
              </p>
            )}

            {/* Informations de contact */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2rem', 
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              {profile.phone && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: colors.textSecondary 
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span style={{ fontWeight: '500' }}>{profile.phone}</span>
                </div>
              )}
              {profile.email && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: colors.textSecondary 
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span style={{ fontWeight: '500' }}>{profile.email}</span>
                </div>
              )}
              {profile.website && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: colors.textSecondary 
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span style={{ fontWeight: '500' }}>{profile.website}</span>
                </div>
              )}
            </div>
            
            {/* Note moyenne */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                background: gradients.rating,
                padding: '1rem 2rem',
                borderRadius: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: layout.shadow
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style={{ fontSize: '1.5rem' }}>{averageRating}/5</span>
                <span style={{ opacity: 0.9 }}>({reviews.length} avis)</span>
              </div>
            </div>

            <button style={{
              background: gradients.button,
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '2rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              boxShadow: layout.shadow,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0 auto'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Laisser un avis
            </button>
          </div>
        </div>

        {/* Section des avis */}
        <div style={{
          backgroundColor: colors.card,
          padding: layout.spacing,
          borderRadius: layout.borderRadius,
          boxShadow: layout.shadow,
          border: `1px solid ${colors.border}`
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            color: colors.text
          }}>
            Avis clients ({reviews.length})
          </h2>
          
          {reviews.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              color: colors.textSecondary 
            }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" style={{ 
                margin: '0 auto 1rem auto', 
                color: colors.border 
              }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <p style={{ fontSize: '1.125rem' }}>Aucun avis pour le moment</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Soyez le premier à laisser un avis !
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {reviews.slice(0, 3).map((review, index) => (
                <div 
                  key={index}
                  style={{
                    border: `1px solid ${colors.border}`,
                    borderRadius: layout.borderRadius,
                    padding: '1.5rem',
                    backgroundColor: colors.background
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    marginBottom: '1rem' 
                  }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: colors.primary,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: 'white', fontWeight: 'bold' }}>
                        {review.customer_name?.charAt(0)?.toUpperCase() || 'C'}
                      </span>
                    </div>
                    <div>
                      <div style={{ 
                        fontWeight: '600', 
                        fontSize: '1.125rem',
                        color: colors.text
                      }}>
                        {review.customer_name || 'Client'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < (review.rating || 5) ? colors.accent : colors.border}>
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <span style={{ 
                          color: colors.textSecondary, 
                          fontSize: '0.875rem' 
                        }}>
                          {new Date().toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p style={{ 
                    color: colors.text, 
                    fontSize: typography.bodySize, 
                    lineHeight: '1.6',
                    fontStyle: 'italic'
                  }}>
                    &quot;{review.comment || 'Excellent service, je recommande vivement cette entreprise !'}&quot;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div style={{
            backgroundColor: colors.card,
            padding: '1.5rem',
            borderRadius: layout.borderRadius,
            boxShadow: layout.shadow,
            border: `1px solid ${colors.border}`
          }}>
            <p style={{ 
              color: colors.textSecondary, 
              fontSize: '0.875rem', 
              marginBottom: '0.5rem' 
            }}>
              Cette page est propulsée par
            </p>
            <div style={{ 
              color: colors.primary, 
              fontWeight: 'bold',
              fontSize: '1.125rem'
            }}>
              AvisPro.com
            </div>
            <p style={{ 
              color: colors.textSecondary, 
              fontSize: '0.75rem', 
              marginTop: '0.5rem' 
            }}>
              Créez votre page d&apos;avis en 2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}