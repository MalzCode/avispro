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
    background: colors.background,
    fontFamily: typography.fontFamily,
    padding: '2rem 1rem',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={containerStyle}>
      {/* Effets de fond spéciaux selon le thème */}
      {themeId === 'tech' && (
        <>
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />
        </>
      )}

      <div style={{ 
        maxWidth: layout.maxWidth, 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header avec bannière */}
        <div style={{
          background: colors.card,
          borderRadius: layout.borderRadius,
          boxShadow: layout.shadow,
          marginBottom: layout.spacing,
          overflow: 'hidden',
          backdropFilter: layout.backdropBlur || 'none',
          border: `1px solid ${colors.border}`,
          position: 'relative'
        }}>
          {/* Bannière */}
          <div style={{
            height: '240px',
            background: profile.banner_image 
              ? `url(${profile.banner_image}) center/cover`
              : gradients.header,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: themeId === 'tech' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!profile.banner_image && (
                <div style={{ 
                  color: 'white', 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  opacity: 0.9,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {themeId === 'professional' && '🏢'}
                    {themeId === 'modern' && '✨'}
                    {themeId === 'artisan' && '🛠️'}
                    {themeId === 'tech' && '🚀'}
                    {themeId === 'creative' && '🎨'}
                    {themeId === 'luxury' && '👑'}
                  </div>
                  {theme.name} Theme
                </div>
              )}
            </div>
          </div>
          
          {/* Contenu principal */}
          <div style={{ 
            padding: layout.spacing, 
            textAlign: 'center', 
            marginTop: '-4rem', 
            position: 'relative' 
          }}>
            {/* Logo/Avatar avec effets spéciaux */}
            <div style={{
              width: themeId === 'luxury' ? '8rem' : '6rem',
              height: themeId === 'luxury' ? '8rem' : '6rem',
              background: themeId === 'luxury' ? gradients.accent : colors.primary,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto',
              border: `4px solid ${colors.card}`,
              boxShadow: themeId === 'tech' ? 
                `${layout.shadow}, 0 0 30px ${colors.glow}` : 
                layout.shadow,
              backgroundImage: profile.logo_image ? `url(${profile.logo_image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...(themeId === 'luxury' && {
                border: `6px solid ${colors.gold}`,
                boxShadow: `0 20px 40px rgba(26, 26, 26, 0.2), 0 0 30px rgba(212, 175, 55, 0.3)`
              })
            }}>
              {!profile.logo_image && (
                <span style={{ 
                  color: themeId === 'luxury' ? colors.primary : 'white', 
                  fontSize: themeId === 'luxury' ? '3rem' : '2rem', 
                  fontWeight: 'bold' 
                }}>
                  {profile.business_name?.charAt(0)?.toUpperCase() || 'B'}
                </span>
              )}
            </div>
            
            <h1 style={{ 
              fontSize: typography.titleSize, 
              fontWeight: typography.titleWeight, 
              marginBottom: '1.5rem',
              background: gradients.header,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: colors.text,
              letterSpacing: typography.letterSpacing || 'normal',
              lineHeight: '1.1'
            }}>
              {profile.business_name || 'Nom de votre entreprise'}
            </h1>
            
            {profile.description && (
              <p style={{ 
                color: colors.textSecondary, 
                marginBottom: '2rem', 
                fontSize: typography.bodySize,
                maxWidth: '700px',
                margin: '0 auto 2rem auto',
                lineHeight: typography.lineHeight || '1.6',
                fontWeight: typography.bodyWeight
              }}>
                {profile.description}
              </p>
            )}

            {/* Informations de contact stylées */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2.5rem', 
              flexWrap: 'wrap',
              marginBottom: '2.5rem'
            }}>
              {profile.phone && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  color: colors.textSecondary,
                  padding: '1rem 1.5rem',
                  backgroundColor: themeId === 'modern' ? colors.highlight : 'transparent',
                  borderRadius: '1rem',
                  ...(themeId === 'tech' && {
                    border: `1px solid ${colors.border}`,
                    backdropFilter: 'blur(10px)'
                  })
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>{profile.phone}</span>
                </div>
              )}
              {profile.email && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  color: colors.textSecondary,
                  padding: '1rem 1.5rem',
                  backgroundColor: themeId === 'modern' ? colors.highlight : 'transparent',
                  borderRadius: '1rem',
                  ...(themeId === 'tech' && {
                    border: `1px solid ${colors.border}`,
                    backdropFilter: 'blur(10px)'
                  })
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>{profile.email}</span>
                </div>
              )}
              {profile.website && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  color: colors.textSecondary,
                  padding: '1rem 1.5rem',
                  backgroundColor: themeId === 'modern' ? colors.highlight : 'transparent',
                  borderRadius: '1rem',
                  ...(themeId === 'tech' && {
                    border: `1px solid ${colors.border}`,
                    backdropFilter: 'blur(10px)'
                  })
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>{profile.website}</span>
                </div>
              )}
            </div>
            
            {/* Note moyenne avec design premium */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                background: gradients.rating,
                padding: '1.5rem 3rem',
                borderRadius: '3rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: themeId === 'tech' ? 
                  `${layout.shadow}, 0 0 30px ${colors.glow}` : 
                  themeId === 'luxury' ?
                  `0 20px 40px rgba(212, 175, 55, 0.3)` :
                  layout.shadow,
                fontSize: '1.125rem'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style={{ fontSize: '1.75rem' }}>{averageRating}/5</span>
                <span style={{ opacity: 0.9 }}>({reviews.length} avis)</span>
              </div>
            </div>

            <button style={{
              background: gradients.button,
              color: 'white',
              padding: '1.25rem 3rem',
              borderRadius: '2.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              boxShadow: themeId === 'tech' ? 
                `${layout.shadow}, 0 0 20px ${colors.glow}` : 
                layout.shadow,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '0 auto',
              transition: 'all 0.3s ease',
              ...(themeId === 'luxury' && {
                border: `2px solid ${colors.gold}`,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              })
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Laisser un avis
            </button>
          </div>
        </div>

        {/* Section des avis avec designs modernes */}
        <div style={{
          background: colors.card,
          padding: layout.spacing,
          borderRadius: layout.borderRadius,
          boxShadow: layout.shadow,
          border: `1px solid ${colors.border}`,
          backdropFilter: layout.backdropBlur || 'none',
          position: 'relative'
        }}>
          {/* Effet de texture pour thème artisan */}
          {themeId === 'artisan' && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, transparent 25%, rgba(217,119,6,0.03) 25%, rgba(217,119,6,0.03) 50%, transparent 50%, transparent 75%, rgba(217,119,6,0.03) 75%)',
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
              borderRadius: layout.borderRadius
            }} />
          )}
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '2.5rem',
              color: colors.text,
              letterSpacing: typography.letterSpacing || 'normal'
            }}>
              Avis clients ({reviews.length})
            </h2>
            
            {reviews.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem', 
                color: colors.textSecondary 
              }}>
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" style={{ 
                  margin: '0 auto 1.5rem auto', 
                  color: colors.border 
                }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                  Aucun avis pour le moment
                </p>
                <p style={{ fontSize: '1.125rem' }}>
                  Soyez le premier à laisser un avis !
                </p>
              </div>
            ) : (
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: themeId === 'modern' ? 'repeat(auto-fit, minmax(350px, 1fr))' : '1fr',
                gap: layout.cardSpacing || '2rem'
              }}>
                {reviews.slice(0, 3).map((review, index) => (
                  <div 
                    key={index}
                    style={{
                      background: themeId === 'professional' ? gradients.card : 
                                  themeId === 'luxury' ? gradients.card :
                                  themeId === 'artisan' ? gradients.card :
                                  themeId === 'creative' ? gradients.card :
                                  themeId === 'tech' ? gradients.card :
                                  colors.card,
                      border: `1px solid ${colors.border}`,
                      borderRadius: layout.borderRadius,
                      padding: '2.5rem',
                      boxShadow: layout.cardShadow || layout.shadow,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      backdropFilter: layout.backdropBlur || 'none',
                      cursor: 'default',
                      ...(themeId === 'tech' && {
                        border: `1px solid ${colors.border}`,
                        boxShadow: `${layout.shadow}, inset 0 1px 0 rgba(6, 182, 212, 0.1)`
                      })
                    }}
                    onMouseEnter={(e) => {
                      if (layout.hoverShadow) {
                        e.currentTarget.style.boxShadow = layout.hoverShadow;
                      }
                      if (layout.hoverTransform) {
                        e.currentTarget.style.transform = layout.hoverTransform;
                      }
                      if (themeId === 'tech') {
                        e.currentTarget.style.boxShadow = `${layout.shadow}, 0 0 40px ${colors.glow}`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = layout.cardShadow || layout.shadow;
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {/* Barre d'accent pour thème luxe */}
                    {themeId === 'luxury' && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: gradients.accent,
                        borderRadius: `${layout.borderRadius} ${layout.borderRadius} 0 0`
                      }} />
                    )}

                    {/* Effet rainbow pour thème créatif */}
                    {themeId === 'creative' && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: gradients.rainbow,
                        borderRadius: `${layout.borderRadius} ${layout.borderRadius} 0 0`
                      }} />
                    )}
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '1.5rem', 
                      marginBottom: '2rem' 
                    }}>
                      <div style={{
                        width: themeId === 'luxury' ? '4.5rem' : '4rem',
                        height: themeId === 'luxury' ? '4.5rem' : '4rem',
                        background: themeId === 'luxury' ? gradients.accent : colors.primary,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        ...(themeId === 'tech' && {
                          boxShadow: `0 0 25px ${colors.glow}`,
                          border: `2px solid ${colors.neon}`
                        }),
                        ...(themeId === 'luxury' && {
                          border: `3px solid ${colors.gold}`,
                          boxShadow: `0 10px 25px rgba(212, 175, 55, 0.3)`
                        })
                      }}>
                        <span style={{ 
                          color: themeId === 'luxury' ? colors.primary : 'white', 
                          fontWeight: 'bold',
                          fontSize: themeId === 'luxury' ? '1.75rem' : '1.5rem'
                        }}>
                          {(reviews[index]?.customer_name || 'Client').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontWeight: '700', 
                          fontSize: '1.375rem',
                          color: colors.text,
                          marginBottom: '0.75rem',
                          letterSpacing: typography.letterSpacing || 'normal'
                        }}>
                          {reviews[index]?.customer_name || 'Client'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                width="22" 
                                height="22" 
                                viewBox="0 0 24 24" 
                                fill={i < (reviews[index]?.rating || 5) ? 
                                  (themeId === 'luxury' ? colors.gold : colors.accent) : 
                                  colors.border}
                                style={{
                                  ...(themeId === 'tech' && i < (reviews[index]?.rating || 5) && {
                                    filter: `drop-shadow(0 0 6px ${colors.glow})`
                                  })
                                }}
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            ))}
                          </div>
                          <span style={{ 
                            color: colors.textSecondary, 
                            fontSize: '1rem',
                            fontWeight: '500'
                          }}>
                            {new Date().toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <blockquote style={{ 
                      color: colors.text, 
                      fontSize: typography.bodySize, 
                      lineHeight: typography.lineHeight || '1.7',
                      fontStyle: 'italic',
                      margin: 0,
                      position: 'relative',
                      paddingLeft: '2rem',
                      borderLeft: `5px solid ${themeId === 'luxury' ? colors.gold : colors.accent}`,
                      fontWeight: typography.bodyWeight,
                      ...(themeId === 'luxury' && {
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.25rem'
                      }),
                      ...(themeId === 'creative' && {
                        background: gradients.accent,
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        border: 'none',
                        paddingLeft: '1.5rem'
                      })
                    }}>
                      &quot;{reviews[index]?.comment || 'Excellent service, je recommande vivement cette entreprise ! L\'équipe est très professionnelle et les résultats dépassent mes attentes. Un travail de qualité dans les délais convenus.'}&quot;
                    </blockquote>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer premium */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <div style={{
            background: colors.card,
            padding: '2rem',
            borderRadius: layout.borderRadius,
            boxShadow: layout.shadow,
            border: `1px solid ${colors.border}`,
            backdropFilter: layout.backdropBlur || 'none'
          }}>
            <p style={{ 
              color: colors.textSecondary, 
              fontSize: '1rem', 
              marginBottom: '0.75rem',
              fontWeight: '500'
            }}>
              Cette page est propulsée par
            </p>
            <div style={{ 
              background: gradients.header,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: colors.primary,
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '0.5rem'
            }}>
              AvisPro.com
            </div>
            <p style={{ 
              color: colors.textSecondary, 
              fontSize: '0.875rem'
            }}>
              Créez votre page d&apos;avis en 2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}