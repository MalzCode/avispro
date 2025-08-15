'use client&apos;;

import React, { useState } from &apos;react&apos;;

export default function AvisProSimple() {
  const [currentView, setCurrentView] = useState(&apos;landing&apos;);

  if (currentView === &apos;landing&apos;) {
    return (
      <div style={{ 
        minHeight: &apos;100vh&apos;,
        background: &apos;linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)&apos;,
        fontFamily: &apos;system-ui, -apple-system, sans-serif&apos;
      }}>
        {/* Header */}
        <header style={{
          backgroundColor: &apos;white&apos;,
          boxShadow: &apos;0 1px 3px rgba(0,0,0,0.1)&apos;,
          padding: &apos;1rem&apos;
        }}>
          <div style={{
            maxWidth: &apos;1200px&apos;,
            margin: &apos;0 auto&apos;,
            display: &apos;flex&apos;,
            justifyContent: &apos;space-between&apos;,
            alignItems: &apos;center&apos;
          }}>
            <div style={{
              fontSize: &apos;1.5rem&apos;,
              fontWeight: &apos;bold&apos;,
              color: &apos;#4f46e5&apos;
            }}>
              AvisPro
            </div>
            <button 
              onClick={() => setCurrentView(&apos;signup&apos;)}
              style={{
                backgroundColor: &apos;#4f46e5&apos;,
                color: &apos;white&apos;,
                padding: &apos;0.5rem 1rem&apos;,
                borderRadius: &apos;0.5rem&apos;,
                border: &apos;none&apos;,
                cursor: &apos;pointer&apos;,
                fontWeight: &apos;600&apos;
              }}
            >
              Connexion
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div style={{
          maxWidth: &apos;1200px&apos;,
          margin: &apos;0 auto&apos;,
          padding: &apos;4rem 1rem&apos;,
          textAlign: &apos;center&apos;
        }}>
          <h1 style={{
            fontSize: &apos;3rem&apos;,
            fontWeight: &apos;bold&apos;,
            color: &apos;#1f2937&apos;,
            marginBottom: &apos;1.5rem&apos;,
            lineHeight: &apos;1.2&apos;
          }}>
            Votre page d&apos;avis clients<br/>
            <span style={{ color: &apos;#4f46e5&apos; }}>en 2 minutes</span>
          </h1>
          
          <p style={{
            fontSize: &apos;1.25rem&apos;,
            color: &apos;#6b7280&apos;,
            marginBottom: &apos;2rem&apos;,
            maxWidth: &apos;800px&apos;,
            margin: &apos;0 auto 2rem auto&apos;
          }}>
            Créez votre page personnalisée pour collecter et afficher les avis de vos clients. 
            Parfait pour artisans, consultants, freelances et petites entreprises.
          </p>

          <button 
            onClick={() => setCurrentView(&apos;signup&apos;)}
            style={{
              backgroundColor: &apos;#4f46e5&apos;,
              color: &apos;white&apos;,
              padding: &apos;1rem 2rem&apos;,
              borderRadius: &apos;0.5rem&apos;,
              border: &apos;none&apos;,
              cursor: &apos;pointer&apos;,
              fontSize: &apos;1.125rem&apos;,
              fontWeight: &apos;600&apos;,
              boxShadow: &apos;0 4px 6px rgba(0,0,0,0.1)&apos;,
              marginBottom: &apos;3rem&apos;
            }}
          >
            Essayer Gratuitement
          </button>

          {/* Comment ça marche */}
          <div style={{ marginTop: &apos;4rem&apos; }}>
            <h2 style={{
              fontSize: &apos;2rem&apos;,
              fontWeight: &apos;bold&apos;,
              textAlign: &apos;center&apos;,
              marginBottom: &apos;3rem&apos;
            }}>
              Comment ça marche ?
            </h2>
            
            <div style={{
              display: &apos;grid&apos;,
              gridTemplateColumns: &apos;repeat(auto-fit, minmax(300px, 1fr))&apos;,
              gap: &apos;2rem&apos;,
              marginBottom: &apos;4rem&apos;
            }}>
              <div style={{ textAlign: &apos;center&apos; }}>
                <div style={{
                  width: &apos;4rem&apos;,
                  height: &apos;4rem&apos;,
                  backgroundColor: &apos;#dbeafe&apos;,
                  borderRadius: &apos;50%&apos;,
                  display: &apos;flex&apos;,
                  alignItems: &apos;center&apos;,
                  justifyContent: &apos;center&apos;,
                  margin: &apos;0 auto 1.5rem auto&apos;
                }}>
                  <span style={{
                    fontSize: &apos;1.5rem&apos;,
                    fontWeight: &apos;bold&apos;,
                    color: &apos;#4f46e5&apos;
                  }}>1</span>
                </div>
                <h3 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;1rem&apos; }}>
                  Créez votre page
                </h3>
                <p style={{ color: &apos;#6b7280&apos; }}>
                  Inscrivez-vous en 2 minutes et obtenez votre lien personnalisé
                </p>
              </div>

              <div style={{ textAlign: &apos;center&apos; }}>
                <div style={{
                  width: &apos;4rem&apos;,
                  height: &apos;4rem&apos;,
                  backgroundColor: &apos;#dcfce7&apos;,
                  borderRadius: &apos;50%&apos;,
                  display: &apos;flex&apos;,
                  alignItems: &apos;center&apos;,
                  justifyContent: &apos;center&apos;,
                  margin: &apos;0 auto 1.5rem auto&apos;
                }}>
                  <span style={{
                    fontSize: &apos;1.5rem&apos;,
                    fontWeight: &apos;bold&apos;,
                    color: &apos;#16a34a&apos;
                  }}>2</span>
                </div>
                <h3 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;1rem&apos; }}>
                  Partagez avec vos clients
                </h3>
                <p style={{ color: &apos;#6b7280&apos; }}>
                  Envoyez votre lien par SMS, email ou donnez-le directement
                </p>
              </div>

              <div style={{ textAlign: &apos;center&apos; }}>
                <div style={{
                  width: &apos;4rem&apos;,
                  height: &apos;4rem&apos;,
                  backgroundColor: &apos;#f3e8ff&apos;,
                  borderRadius: &apos;50%&apos;,
                  display: &apos;flex&apos;,
                  alignItems: &apos;center&apos;,
                  justifyContent: &apos;center&apos;,
                  margin: &apos;0 auto 1.5rem auto&apos;
                }}>
                  <span style={{
                    fontSize: &apos;1.5rem&apos;,
                    fontWeight: &apos;bold&apos;,
                    color: &apos;#9333ea&apos;
                  }}>3</span>
                </div>
                <h3 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;1rem&apos; }}>
                  Récoltez les avis
                </h3>
                <p style={{ color: &apos;#6b7280&apos; }}>
                  Vos clients laissent facilement leur avis. Vous gérez tout depuis votre dashboard
                </p>
              </div>
            </div>

            {/* Demo Preview */}
            <div style={{
              backgroundColor: &apos;white&apos;,
              borderRadius: &apos;1rem&apos;,
              boxShadow: &apos;0 10px 25px rgba(0,0,0,0.1)&apos;,
              padding: &apos;2rem&apos;,
              margin: &apos;2rem auto&apos;,
              maxWidth: &apos;600px&apos;
            }}>
              <div style={{ textAlign: &apos;center&apos;, marginBottom: &apos;2rem&apos; }}>
                <h3 style={{ fontSize: &apos;1.5rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;0.5rem&apos; }}>
                  Votre page d&apos;avis en action
                </h3>
                <p style={{ color: &apos;#6b7280&apos; }}>Voici à quoi ressemble une page AvisPro</p>
              </div>

              <div style={{
                background: &apos;linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)&apos;,
                padding: &apos;1.5rem&apos;,
                borderRadius: &apos;0.75rem&apos;,
                border: &apos;2px dashed #4f46e5&apos;,
                maxWidth: &apos;400px&apos;,
                margin: &apos;0 auto&apos;
              }}>
                <div style={{ textAlign: &apos;center&apos;, marginBottom: &apos;1.5rem&apos; }}>
                  <div style={{
                    width: &apos;4rem&apos;,
                    height: &apos;4rem&apos;,
                    backgroundColor: &apos;#4f46e5&apos;,
                    borderRadius: &apos;50%&apos;,
                    display: &apos;flex&apos;,
                    alignItems: &apos;center&apos;,
                    justifyContent: &apos;center&apos;,
                    margin: &apos;0 auto 1rem auto&apos;
                  }}>
                    <span style={{ color: &apos;white&apos;, fontSize: &apos;1.5rem&apos;, fontWeight: &apos;bold&apos; }}>JP</span>
                  </div>
                  <h4 style={{ fontSize: &apos;1.125rem&apos;, fontWeight: &apos;bold&apos; }}>Maçonnerie JP</h4>
                  <p style={{ color: &apos;#6b7280&apos;, fontSize: &apos;0.875rem&apos; }}>⭐⭐⭐⭐⭐ 5.0 (12 avis)</p>
                </div>

                <div style={{ marginBottom: &apos;1rem&apos; }}>
                  <div style={{
                    backgroundColor: &apos;white&apos;,
                    padding: &apos;0.75rem&apos;,
                    borderRadius: &apos;0.5rem&apos;,
                    boxShadow: &apos;0 1px 3px rgba(0,0,0,0.1)&apos;,
                    marginBottom: &apos;0.75rem&apos;
                  }}>
                    <div style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos;, marginBottom: &apos;0.25rem&apos; }}>
                      <span style={{ fontWeight: &apos;600&apos;, fontSize: &apos;0.75rem&apos; }}>Marie D.</span>
                      <span style={{ color: &apos;#fbbf24&apos;, fontSize: &apos;0.75rem&apos; }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p style={{ fontSize: &apos;0.75rem&apos;, color: &apos;#374151&apos; }}>&quot;Travail impeccable ! Très professionnel.&quot;</p>
                  </div>

                  <div style={{
                    backgroundColor: &apos;white&apos;,
                    padding: &apos;0.75rem&apos;,
                    borderRadius: &apos;0.5rem&apos;,
                    boxShadow: &apos;0 1px 3px rgba(0,0,0,0.1)&apos;
                  }}>
                    <div style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos;, marginBottom: &apos;0.25rem&apos; }}>
                      <span style={{ fontWeight: &apos;600&apos;, fontSize: &apos;0.75rem&apos; }}>Philippe M.</span>
                      <span style={{ color: &apos;#fbbf24&apos;, fontSize: &apos;0.75rem&apos; }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p style={{ fontSize: &apos;0.75rem&apos;, color: &apos;#374151&apos; }}>&quot;Ponctuel et de bon conseil. Je recommande !&quot;</p>
                  </div>
                </div>

                <button 
                  onClick={() => setCurrentView(&apos;public-page&apos;)}
                  style={{
                    width: &apos;100%&apos;,
                    backgroundColor: &apos;#4f46e5&apos;,
                    color: &apos;white&apos;,
                    padding: &apos;0.5rem&apos;,
                    borderRadius: &apos;0.5rem&apos;,
                    border: &apos;none&apos;,
                    cursor: &apos;pointer&apos;,
                    fontSize: &apos;0.875rem&apos;,
                    fontWeight: &apos;600&apos;
                  }}
                >
                  ⭐ Voir la démo
                </button>
              </div>
            </div>

            {/* Pricing */}
            <div style={{ marginTop: &apos;4rem&apos; }}>
              <h2 style={{
                fontSize: &apos;2rem&apos;,
                fontWeight: &apos;bold&apos;,
                textAlign: &apos;center&apos;,
                marginBottom: &apos;2rem&apos;
              }}>
                Tarifs simples et transparents
              </h2>
              
              <div style={{
                display: &apos;grid&apos;,
                gridTemplateColumns: &apos;repeat(auto-fit, minmax(300px, 1fr))&apos;,
                gap: &apos;1.5rem&apos;,
                maxWidth: &apos;1000px&apos;,
                margin: &apos;0 auto&apos;
              }}>
                {/* Plan Gratuit */}
                <div style={{
                  backgroundColor: &apos;white&apos;,
                  padding: &apos;1.5rem&apos;,
                  borderRadius: &apos;0.75rem&apos;,
                  boxShadow: &apos;0 4px 6px rgba(0,0,0,0.1)&apos;,
                  border: &apos;2px solid #e5e7eb&apos;
                }}>
                  <h3 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;0.5rem&apos; }}>Gratuit</h3>
                  <p style={{ color: &apos;#6b7280&apos;, fontSize: &apos;0.875rem&apos;, marginBottom: &apos;1rem&apos; }}>Pour tester AvisPro</p>
                  <div style={{ fontSize: &apos;2rem&apos;, fontWeight: &apos;bold&apos;, color: &apos;#1f2937&apos;, marginBottom: &apos;1.5rem&apos; }}>
                    0€<span style={{ fontSize: &apos;1rem&apos;, fontWeight: &apos;normal&apos; }}>/mois</span>
                  </div>
                  <ul style={{ listStyle: &apos;none&apos;, padding: 0, marginBottom: &apos;2rem&apos; }}>
                    <li style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos;, marginBottom: &apos;0.75rem&apos; }}>
                      <span style={{ width: &apos;0.5rem&apos;, height: &apos;0.5rem&apos;, backgroundColor: &apos;#10b981&apos;, borderRadius: &apos;50%&apos; }}></span>
                      Jusqu&apos;à 2 avis
                    </li>
                    <li style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos;, marginBottom: &apos;0.75rem&apos; }}>
                      <span style={{ width: &apos;0.5rem&apos;, height: &apos;0.5rem&apos;, backgroundColor: &apos;#10b981&apos;, borderRadius: &apos;50%&apos; }}></span>
                      Page personnalisée
                    </li>
                    <li style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos; }}>
                      <span style={{ width: &apos;0.5rem&apos;, height: &apos;0.5rem&apos;, backgroundColor: &apos;#10b981&apos;, borderRadius: &apos;50%&apos; }}></span>
                      Formulaire de collecte
                    </li>
                  </ul>
                  <button 
                    onClick={() => setCurrentView(&apos;signup&apos;)}
                    style={{
                      width: &apos;100%&apos;,
                      border: &apos;2px solid #4f46e5&apos;,
                      color: &apos;#4f46e5&apos;,
                      backgroundColor: &apos;transparent&apos;,
                      padding: &apos;0.75rem&apos;,
                      borderRadius: &apos;0.5rem&apos;,
                      cursor: &apos;pointer&apos;,
                      fontWeight: &apos;600&apos;
                    }}
                  >
                    Commencer gratuitement
                  </button>
                </div>

                {/* Plan Premium */}
                <div style={{
                  backgroundColor: &apos;#4f46e5&apos;,
                  color: &apos;white&apos;,
                  padding: &apos;1.5rem&apos;,
                  borderRadius: &apos;0.75rem&apos;,
                  boxShadow: &apos;0 4px 6px rgba(0,0,0,0.1)&apos;,
                  position: &apos;relative&apos;
                }}>
                  <div style={{
                    position: &apos;absolute&apos;,
                    top: &apos;-0.75rem&apos;,
                    left: &apos;50%&apos;,
                    transform: &apos;translateX(-50%)&apos;,
                    backgroundColor: &apos;#fbbf24&apos;,
                    color: &apos;#1f2937&apos;,
                    padding: &apos;0.25rem 0.75rem&apos;,
                    borderRadius: &apos;9999px&apos;,
                    fontSize: &apos;0.75rem&apos;,
                    fontWeight: &apos;bold&apos;
                  }}>
                    POPULAIRE
                  </div>
                  <h3 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;0.5rem&apos; }}>Premium</h3>
                  <p style={{ color: &apos;#c7d2fe&apos;, fontSize: &apos;0.875rem&apos;, marginBottom: &apos;1rem&apos; }}>Mensuel</p>
                  <div style={{ fontSize: &apos;2rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;1.5rem&apos; }}>
                    5€<span style={{ fontSize: &apos;1rem&apos;, fontWeight: &apos;normal&apos; }}>/mois</span>
                  </div>
                  <ul style={{ listStyle: &apos;none&apos;, padding: 0, marginBottom: &apos;2rem&apos; }}>
                    <li style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos;, marginBottom: &apos;0.75rem&apos; }}>
                      <span style={{ width: &apos;0.5rem&apos;, height: &apos;0.5rem&apos;, backgroundColor: &apos;white&apos;, borderRadius: &apos;50%&apos; }}></span>
                      Avis illimités
                    </li>
                    <li style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos;, marginBottom: &apos;0.75rem&apos; }}>
                      <span style={{ width: &apos;0.5rem&apos;, height: &apos;0.5rem&apos;, backgroundColor: &apos;white&apos;, borderRadius: &apos;50%&apos; }}></span>
                      Photos dans les avis
                    </li>
                    <li style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos;, marginBottom: &apos;0.75rem&apos; }}>
                      <span style={{ width: &apos;0.5rem&apos;, height: &apos;0.5rem&apos;, backgroundColor: &apos;white&apos;, borderRadius: &apos;50%&apos; }}></span>
                      Page personnalisée
                    </li>
                    <li style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos; }}>
                      <span style={{ width: &apos;0.5rem&apos;, height: &apos;0.5rem&apos;, backgroundColor: &apos;white&apos;, borderRadius: &apos;50%&apos; }}></span>
                      Support prioritaire
                    </li>
                  </ul>
                  <button 
                    style={{
                      width: &apos;100%&apos;,
                      backgroundColor: &apos;white&apos;,
                      color: &apos;#4f46e5&apos;,
                      border: &apos;none&apos;,
                      padding: &apos;0.75rem&apos;,
                      borderRadius: &apos;0.5rem&apos;,
                      cursor: &apos;pointer&apos;,
                      fontWeight: &apos;bold&apos;
                    }}
                  >
                    Choisir Premium
                  </button>
                </div>

                {/* Plan Annuel */}
                <div style={{
                  background: &apos;linear-gradient(135deg, #16a34a 0%, #15803d 100%)&apos;,
                  color: &apos;white&apos;,
                  padding: &apos;1.5rem&apos;,
                  borderRadius: &apos;0.75rem&apos;,
                  boxShadow: &apos;0 4px 6px rgba(0,0,0,0.1)&apos;,
                  position: &apos;relative&apos;
                }}>
                  <div style={{
                    position: &apos;absolute&apos;,
                    top: &apos;-0.75rem&apos;,
                    left: &apos;50%&apos;,
                    transform: &apos;translateX(-50%)&apos;,
                    backgroundColor: &apos;#fbbf24&apos;,
                    color: &apos;#1f2937&apos;,
                    padding: &apos;0.25rem 0.75rem&apos;,
                    borderRadius: &apos;9999px&apos;,
                    fontSize: &apos;0.75rem&apos;,
                    fontWeight: &apos;bold&apos;
                  }}>
                    ÉCONOMIE
                  </div>
                  <h3 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;0.5rem&apos; }}>Premium</h3>
                  <p style={{ color: &apos;#bbf7d0&apos;, fontSize: &apos;0.875rem&apos;, marginBottom: &apos;0.5rem&apos; }}>12 mois</p>
                  <div style={{ fontSize: &apos;2rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;0.5rem&apos; }}>
                    39€<span style={{ fontSize: &apos;1rem&apos;, fontWeight: &apos;normal&apos; }}>/an</span>
                  </div>
                  <div style={{ fontSize: &apos;0.875rem&apos;, color: &apos;#bbf7d0&apos;, marginBottom: &apos;1rem&apos; }}>
                    <span style={{ textDecoration: &apos;line-through&apos; }}>60€</span> 
                    <span style={{ fontWeight: &apos;bold&apos;, color: &apos;#fbbf24&apos;, marginLeft: &apos;0.5rem&apos; }}>-35%</span>
                  </div>
                  <ul style={{ listStyle: &apos;none&apos;, padding: 0, marginBottom: &apos;2rem&apos; }}>
                    <li style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos;, marginBottom: &apos;0.75rem&apos; }}>
                      <span style={{ width: &apos;0.5rem&apos;, height: &apos;0.5rem&apos;, backgroundColor: &apos;white&apos;, borderRadius: &apos;50%&apos; }}></span>
                      Avis illimités
                    </li>
                    <li style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos;, marginBottom: &apos;0.75rem&apos; }}>
                      <span style={{ width: &apos;0.5rem&apos;, height: &apos;0.5rem&apos;, backgroundColor: &apos;white&apos;, borderRadius: &apos;50%&apos; }}></span>
                      Photos dans les avis
                    </li>
                    <li style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos;, marginBottom: &apos;0.75rem&apos; }}>
                      <span style={{ width: &apos;0.5rem&apos;, height: &apos;0.5rem&apos;, backgroundColor: &apos;#fbbf24&apos;, borderRadius: &apos;50%&apos; }}></span>
                      2 mois gratuits
                    </li>
                  </ul>
                  <button 
                    style={{
                      width: &apos;100%&apos;,
                      backgroundColor: &apos;white&apos;,
                      color: &apos;#16a34a&apos;,
                      border: &apos;none&apos;,
                      padding: &apos;0.75rem&apos;,
                      borderRadius: &apos;0.5rem&apos;,
                      cursor: &apos;pointer&apos;,
                      fontWeight: &apos;bold&apos;
                    }}
                  >
                    Choisir 12 mois
                  </button>
                </div>
              </div>

              <div style={{ textAlign: &apos;center&apos;, marginTop: &apos;2rem&apos; }}>
                <p style={{ color: &apos;#6b7280&apos; }}>
                  ✨ Tous les plans incluent le support client • Annulation possible à tout moment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === &apos;signup&apos;) {
    return (
      <div style={{
        minHeight: &apos;100vh&apos;,
        background: &apos;linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)&apos;,
        display: &apos;flex&apos;,
        alignItems: &apos;center&apos;,
        justifyContent: &apos;center&apos;,
        fontFamily: &apos;system-ui, -apple-system, sans-serif&apos;
      }}>
        <div style={{
          backgroundColor: &apos;white&apos;,
          padding: &apos;2rem&apos;,
          borderRadius: &apos;1rem&apos;,
          boxShadow: &apos;0 10px 25px rgba(0,0,0,0.1)&apos;,
          width: &apos;100%&apos;,
          maxWidth: &apos;400px&apos;
        }}>
          <div style={{ textAlign: &apos;center&apos;, marginBottom: &apos;2rem&apos; }}>
            <div style={{ fontSize: &apos;1.5rem&apos;, fontWeight: &apos;bold&apos;, color: &apos;#4f46e5&apos;, marginBottom: &apos;0.5rem&apos; }}>AvisPro</div>
            <h2 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos; }}>Créez votre page d&apos;avis</h2>
            <p style={{ color: &apos;#6b7280&apos; }}>En 2 minutes, c&apos;est parti !</p>
          </div>

          <div style={{ display: &apos;flex&apos;, flexDirection: &apos;column&apos;, gap: &apos;1rem&apos; }}>
            <div>
              <label style={{ display: &apos;block&apos;, fontSize: &apos;0.875rem&apos;, fontWeight: &apos;500&apos;, color: &apos;#374151&apos;, marginBottom: &apos;0.25rem&apos; }}>
                Votre nom/prénom
              </label>
              <input 
                type=&quot;text&quot; 
                placeholder=&quot;Jean-Paul&quot;
                style={{
                  width: &apos;100%&apos;,
                  padding: &apos;0.75rem&apos;,
                  border: &apos;1px solid #d1d5db&apos;,
                  borderRadius: &apos;0.5rem&apos;,
                  fontSize: &apos;1rem&apos;,
                  outline: &apos;none&apos;
                }}
              />
            </div>

            <div>
              <label style={{ display: &apos;block&apos;, fontSize: &apos;0.875rem&apos;, fontWeight: &apos;500&apos;, color: &apos;#374151&apos;, marginBottom: &apos;0.25rem&apos; }}>
                Votre activité
              </label>
              <input 
                type=&quot;text&quot; 
                placeholder=&quot;Maçonnerie JP&quot;
                style={{
                  width: &apos;100%&apos;,
                  padding: &apos;0.75rem&apos;,
                  border: &apos;1px solid #d1d5db&apos;,
                  borderRadius: &apos;0.5rem&apos;,
                  fontSize: &apos;1rem&apos;,
                  outline: &apos;none&apos;
                }}
              />
            </div>

            <div>
              <label style={{ display: &apos;block&apos;, fontSize: &apos;0.875rem&apos;, fontWeight: &apos;500&apos;, color: &apos;#374151&apos;, marginBottom: &apos;0.25rem&apos; }}>
                Votre lien personnalisé
              </label>
              <div style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos; }}>
                <input 
                  type=&quot;text&quot; 
                  placeholder=&quot;jean-paul&quot;
                  style={{
                    flex: 1,
                    padding: &apos;0.75rem&apos;,
                    border: &apos;1px solid #d1d5db&apos;,
                    borderRadius: &apos;0.5rem 0 0 0.5rem&apos;,
                    fontSize: &apos;1rem&apos;,
                    outline: &apos;none&apos;
                  }}
                />
                <span style={{
                  padding: &apos;0.75rem&apos;,
                  backgroundColor: &apos;#f3f4f6&apos;,
                  border: &apos;1px solid #d1d5db&apos;,
                  borderLeft: &apos;none&apos;,
                  borderRadius: &apos;0 0.5rem 0.5rem 0&apos;,
                  color: &apos;#6b7280&apos;
                }}>
                  .avispro.com
                </span>
              </div>
            </div>

            <button 
              onClick={() => alert(&apos;Dashboard en cours de développement !&apos;)}
              style={{
                width: &apos;100%&apos;,
                backgroundColor: &apos;#4f46e5&apos;,
                color: &apos;white&apos;,
                padding: &apos;0.75rem&apos;,
                borderRadius: &apos;0.5rem&apos;,
                border: &apos;none&apos;,
                cursor: &apos;pointer&apos;,
                fontWeight: &apos;600&apos;,
                fontSize: &apos;1rem&apos;
              }}
            >
              Créer ma page gratuitement
            </button>
          </div>

          <div style={{ textAlign: &apos;center&apos;, marginTop: &apos;1.5rem&apos; }}>
            <button 
              onClick={() => setCurrentView(&apos;landing&apos;)}
              style={{
                color: &apos;#4f46e5&apos;,
                textDecoration: &apos;underline&apos;,
                border: &apos;none&apos;,
                background: &apos;none&apos;,
                cursor: &apos;pointer&apos;,
                fontSize: &apos;0.875rem&apos;
              }}
            >
              ← Retour à l&apos;accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === &apos;public-page&apos;) {
    return (
      <div style={{
        minHeight: &apos;100vh&apos;,
        backgroundColor: &apos;white&apos;,
        fontFamily: &apos;system-ui, -apple-system, sans-serif&apos;
      }}>
        {/* Header */}
        <header style={{
          backgroundColor: &apos;white&apos;,
          boxShadow: &apos;0 1px 3px rgba(0,0,0,0.1)&apos;,
          position: &apos;sticky&apos;,
          top: 0,
          zIndex: 50
        }}>
          <div style={{
            maxWidth: &apos;1200px&apos;,
            margin: &apos;0 auto&apos;,
            padding: &apos;1rem&apos;
          }}>
            <div style={{
              display: &apos;flex&apos;,
              justifyContent: &apos;space-between&apos;,
              alignItems: &apos;center&apos;
            }}>
              <div style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.75rem&apos; }}>
                <div style={{
                  width: &apos;3rem&apos;,
                  height: &apos;3rem&apos;,
                  backgroundColor: &apos;#d97706&apos;,
                  borderRadius: &apos;0.5rem&apos;,
                  display: &apos;flex&apos;,
                  alignItems: &apos;center&apos;,
                  justifyContent: &apos;center&apos;
                }}>
                  <span style={{ color: &apos;white&apos;, fontWeight: &apos;bold&apos;, fontSize: &apos;1.125rem&apos; }}>JP</span>
                </div>
                <div>
                  <h1 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos;, color: &apos;#1f2937&apos; }}>Maçonnerie JP</h1>
                  <p style={{ fontSize: &apos;0.875rem&apos;, color: &apos;#6b7280&apos; }}>Artisan depuis 15 ans</p>
                </div>
              </div>
              <div style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos; }}>
                <span style={{ fontSize: &apos;0.875rem&apos;, fontWeight: &apos;500&apos; }}>📞 06 12 34 56 78</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{
          background: &apos;linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)&apos;,
          padding: &apos;4rem 1rem&apos;
        }}>
          <div style={{
            maxWidth: &apos;1200px&apos;,
            margin: &apos;0 auto&apos;,
            display: &apos;grid&apos;,
            gridTemplateColumns: &apos;repeat(auto-fit, minmax(400px, 1fr))&apos;,
            gap: &apos;3rem&apos;,
            alignItems: &apos;center&apos;
          }}>
            <div>
              <h1 style={{
                fontSize: &apos;2.5rem&apos;,
                fontWeight: &apos;bold&apos;,
                color: &apos;#1f2937&apos;,
                marginBottom: &apos;1.5rem&apos;,
                lineHeight: &apos;1.2&apos;
              }}>
                Maçonnerie de qualité<br/>
                <span style={{ color: &apos;#d97706&apos; }}>depuis 2009</span>
              </h1>
              <p style={{
                fontSize: &apos;1.125rem&apos;,
                color: &apos;#6b7280&apos;,
                marginBottom: &apos;2rem&apos;
              }}>
                Spécialisé dans la construction, rénovation et aménagement extérieur. 
                Travail soigné, respect des délais et satisfaction client garantie.
              </p>
              <div style={{
                display: &apos;flex&apos;,
                alignItems: &apos;center&apos;,
                gap: &apos;1.5rem&apos;,
                marginBottom: &apos;2rem&apos;
              }}>
                <div style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos; }}>
                  <span style={{ color: &apos;#fbbf24&apos; }}>⭐⭐⭐⭐⭐</span>
                  <span style={{ fontWeight: &apos;bold&apos;, fontSize: &apos;1.125rem&apos; }}>5.0</span>
                  <span style={{ color: &apos;#6b7280&apos; }}>(2 avis)</span>
                </div>
                <div style={{ fontSize: &apos;0.875rem&apos;, color: &apos;#6b7280&apos; }}>
                  ✅ Devis gratuit<br/>
                  ✅ Assurance décennale
                </div>
              </div>
              <div style={{ display: &apos;flex&apos;, gap: &apos;1rem&apos; }}>
                <button style={{
                  backgroundColor: &apos;#d97706&apos;,
                  color: &apos;white&apos;,
                  padding: &apos;0.75rem 1.5rem&apos;,
                  borderRadius: &apos;0.5rem&apos;,
                  border: &apos;none&apos;,
                  cursor: &apos;pointer&apos;,
                  fontWeight: &apos;600&apos;
                }}>
                  Demander un devis
                </button>
                <button 
                  onClick={() => alert(&apos;Formulaire d\'avis en cours...&apos;)}
                  style={{
                    border: &apos;2px solid #d97706&apos;,
                    color: &apos;#d97706&apos;,
                    backgroundColor: &apos;transparent&apos;,
                    padding: &apos;0.75rem 1.5rem&apos;,
                    borderRadius: &apos;0.5rem&apos;,
                    cursor: &apos;pointer&apos;,
                    fontWeight: &apos;600&apos;
                  }}
                >
                  Laisser un avis
                </button>
              </div>
            </div>
            <div style={{
              backgroundColor: &apos;#e5e7eb&apos;,
              borderRadius: &apos;1rem&apos;,
              height: &apos;24rem&apos;,
              display: &apos;flex&apos;,
              alignItems: &apos;center&apos;,
              justifyContent: &apos;center&apos;
            }}>
              <span style={{ color: &apos;#6b7280&apos; }}>Photo chantier principal</span>
            </div>
          </div>
        </section>

        {/* Services */}
        <section style={{ padding: &apos;4rem 1rem&apos;, backgroundColor: &apos;white&apos; }}>
          <div style={{ maxWidth: &apos;1200px&apos;, margin: &apos;0 auto&apos; }}>
            <h2 style={{
              fontSize: &apos;2rem&apos;,
              fontWeight: &apos;bold&apos;,
              textAlign: &apos;center&apos;,
              marginBottom: &apos;3rem&apos;
            }}>
              Mes services
            </h2>
            <div style={{
              display: &apos;grid&apos;,
              gridTemplateColumns: &apos;repeat(auto-fit, minmax(250px, 1fr))&apos;,
              gap: &apos;2rem&apos;
            }}>
              <div style={{ textAlign: &apos;center&apos;, padding: &apos;1.5rem&apos; }}>
                <div style={{
                  width: &apos;4rem&apos;,
                  height: &apos;4rem&apos;,
                  backgroundColor: &apos;#fef3c7&apos;,
                  borderRadius: &apos;50%&apos;,
                  display: &apos;flex&apos;,
                  alignItems: &apos;center&apos;,
                  justifyContent: &apos;center&apos;,
                  margin: &apos;0 auto 1rem auto&apos;
                }}>
                  <span style={{ fontSize: &apos;1.5rem&apos; }}>🏗️</span>
                </div>
                <h3 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;0.75rem&apos; }}>Construction</h3>
                <p style={{ color: &apos;#6b7280&apos; }}>Maisons, extensions, garages. Du gros œuvre aux finitions.</p>
              </div>
              <div style={{ textAlign: &apos;center&apos;, padding: &apos;1.5rem&apos; }}>
                <div style={{
                  width: &apos;4rem&apos;,
                  height: &apos;4rem&apos;,
                  backgroundColor: &apos;#fef3c7&apos;,
                  borderRadius: &apos;50%&apos;,
                  display: &apos;flex&apos;,
                  alignItems: &apos;center&apos;,
                  justifyContent: &apos;center&apos;,
                  margin: &apos;0 auto 1rem auto&apos;
                }}>
                  <span style={{ fontSize: &apos;1.5rem&apos; }}>🔨</span>
                </div>
                <h3 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;0.75rem&apos; }}>Rénovation</h3>
                <p style={{ color: &apos;#6b7280&apos; }}>Réfection complète, mise aux normes, modernisation.</p>
              </div>
              <div style={{ textAlign: &apos;center&apos;, padding: &apos;1.5rem&apos; }}>
                <div style={{
                  width: &apos;4rem&apos;,
                  height: &apos;4rem&apos;,
                  backgroundColor: &apos;#fef3c7&apos;,
                  borderRadius: &apos;50%&apos;,
                  display: &apos;flex&apos;,
                  alignItems: &apos;center&apos;,
                  justifyContent: &apos;center&apos;,
                  margin: &apos;0 auto 1rem auto&apos;
                }}>
                  <span style={{ fontSize: &apos;1.5rem&apos; }}>🌿</span>
                </div>
                <h3 style={{ fontSize: &apos;1.25rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;0.75rem&apos; }}>Aménagement</h3>
                <p style={{ color: &apos;#6b7280&apos; }}>Terrasses, allées, murets, aménagement paysager.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Avis Section */}
        <section style={{ padding: &apos;4rem 1rem&apos;, backgroundColor: &apos;#f9fafb&apos; }}>
          <div style={{ maxWidth: &apos;1200px&apos;, margin: &apos;0 auto&apos; }}>
            <div style={{ textAlign: &apos;center&apos;, marginBottom: &apos;3rem&apos; }}>
              <h2 style={{ fontSize: &apos;2rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;1rem&apos; }}>Ce que disent mes clients</h2>
              <p style={{
                fontSize: &apos;1.125rem&apos;,
                color: &apos;#6b7280&apos;,
                marginBottom: &apos;1.5rem&apos;
              }}>
                La satisfaction client est ma priorité. Découvrez les retours de mes derniers chantiers.
              </p>
              <div style={{
                display: &apos;flex&apos;,
                justifyContent: &apos;center&apos;,
                gap: &apos;1rem&apos;,
                marginBottom: &apos;2rem&apos;
              }}>
                <div style={{
                  backgroundColor: &apos;white&apos;,
                  padding: &apos;1rem 1.5rem&apos;,
                  borderRadius: &apos;9999px&apos;,
                  boxShadow: &apos;0 1px 3px rgba(0,0,0,0.1)&apos;
                }}>
                  <div style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.5rem&apos; }}>
                    <span style={{ color: &apos;#fbbf24&apos; }}>⭐⭐⭐⭐⭐</span>
                    <span style={{ fontWeight: &apos;bold&apos;, fontSize: &apos;1.25rem&apos; }}>5.0</span>
                    <span style={{ color: &apos;#6b7280&apos; }}>/ 5</span>
                  </div>
                </div>
                <div style={{
                  backgroundColor: &apos;white&apos;,
                  padding: &apos;1rem 1.5rem&apos;,
                  borderRadius: &apos;9999px&apos;,
                  boxShadow: &apos;0 1px 3px rgba(0,0,0,0.1)&apos;
                }}>
                  <span style={{ fontWeight: &apos;bold&apos;, fontSize: &apos;1.125rem&apos; }}>2</span>
                  <span style={{ color: &apos;#6b7280&apos;, marginLeft: &apos;0.25rem&apos; }}>avis clients</span>
                </div>
              </div>
            </div>

            <div style={{
              display: &apos;grid&apos;,
              gridTemplateColumns: &apos;repeat(auto-fit, minmax(400px, 1fr))&apos;,
              gap: &apos;1.5rem&apos;,
              marginBottom: &apos;3rem&apos;
            }}>
              <div style={{
                backgroundColor: &apos;white&apos;,
                padding: &apos;1.5rem&apos;,
                borderRadius: &apos;0.75rem&apos;,
                boxShadow: &apos;0 1px 3px rgba(0,0,0,0.1)&apos;,
                border: &apos;1px solid #e5e7eb&apos;
              }}>
                <div style={{ display: &apos;flex&apos;, alignItems: &apos;flex-start&apos;, gap: &apos;1rem&apos; }}>
                  <div style={{
                    width: &apos;3.5rem&apos;,
                    height: &apos;3.5rem&apos;,
                    background: &apos;linear-gradient(135deg, #fbbf24 0%, #d97706 100%)&apos;,
                    borderRadius: &apos;50%&apos;,
                    display: &apos;flex&apos;,
                    alignItems: &apos;center&apos;,
                    justifyContent: &apos;center&apos;
                  }}>
                    <span style={{ color: &apos;white&apos;, fontWeight: &apos;bold&apos;, fontSize: &apos;1.125rem&apos; }}>M</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: &apos;flex&apos;,
                      alignItems: &apos;center&apos;,
                      gap: &apos;0.75rem&apos;,
                      marginBottom: &apos;0.75rem&apos;
                    }}>
                      <h3 style={{ fontWeight: &apos;bold&apos;, fontSize: &apos;1.125rem&apos; }}>Marie Dubois</h3>
                      <span style={{ color: &apos;#fbbf24&apos; }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p style={{
                      color: &apos;#374151&apos;,
                      lineHeight: &apos;1.6&apos;,
                      marginBottom: &apos;0.75rem&apos;,
                      fontStyle: &apos;italic&apos;
                    }}>
                      &quot;Travail impeccable ! Jean-Paul a refait ma terrasse en 3 jours. Très professionnel et soigneux.&quot;
                    </p>
                    <div style={{ fontSize: &apos;0.875rem&apos;, color: &apos;#6b7280&apos; }}>
                      Chantier réalisé le 2025-08-10
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: &apos;white&apos;,
                padding: &apos;1.5rem&apos;,
                borderRadius: &apos;0.75rem&apos;,
                boxShadow: &apos;0 1px 3px rgba(0,0,0,0.1)&apos;,
                border: &apos;1px solid #e5e7eb&apos;
              }}>
                <div style={{ display: &apos;flex&apos;, alignItems: &apos;flex-start&apos;, gap: &apos;1rem&apos; }}>
                  <div style={{
                    width: &apos;3.5rem&apos;,
                    height: &apos;3.5rem&apos;,
                    background: &apos;linear-gradient(135deg, #fbbf24 0%, #d97706 100%)&apos;,
                    borderRadius: &apos;50%&apos;,
                    display: &apos;flex&apos;,
                    alignItems: &apos;center&apos;,
                    justifyContent: &apos;center&apos;
                  }}>
                    <span style={{ color: &apos;white&apos;, fontWeight: &apos;bold&apos;, fontSize: &apos;1.125rem&apos; }}>P</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: &apos;flex&apos;,
                      alignItems: &apos;center&apos;,
                      gap: &apos;0.75rem&apos;,
                      marginBottom: &apos;0.75rem&apos;
                    }}>
                      <h3 style={{ fontWeight: &apos;bold&apos;, fontSize: &apos;1.125rem&apos; }}>Philippe Martin</h3>
                      <span style={{ color: &apos;#fbbf24&apos; }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p style={{
                      color: &apos;#374151&apos;,
                      lineHeight: &apos;1.6&apos;,
                      marginBottom: &apos;0.75rem&apos;,
                      fontStyle: &apos;italic&apos;
                    }}>
                      &quot;Excellent maçon, ponctuel et de bon conseil. Je recommande vivement !&quot;
                    </p>
                    <div style={{ fontSize: &apos;0.875rem&apos;, color: &apos;#6b7280&apos; }}>
                      Chantier réalisé le 2025-08-05
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: &apos;linear-gradient(135deg, #f59e0b 0%, #d97706 100%)&apos;,
              borderRadius: &apos;1rem&apos;,
              padding: &apos;2rem&apos;,
              textAlign: &apos;center&apos;,
              color: &apos;white&apos;
            }}>
              <h3 style={{ fontSize: &apos;1.5rem&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;1rem&apos; }}>
                Vous avez travaillé avec moi ?
              </h3>
              <p style={{
                fontSize: &apos;1.125rem&apos;,
                marginBottom: &apos;1.5rem&apos;,
                color: &apos;#fef3c7&apos;
              }}>
                Votre avis m&apos;aide à améliorer mes services et guide mes futurs clients
              </p>
              <button 
                onClick={() => alert(&apos;Formulaire d\'avis sera bientôt disponible !&apos;)}
                style={{
                  backgroundColor: &apos;white&apos;,
                  color: &apos;#d97706&apos;,
                  padding: &apos;1rem 2rem&apos;,
                  borderRadius: &apos;0.75rem&apos;,
                  border: &apos;none&apos;,
                  cursor: &apos;pointer&apos;,
                  fontSize: &apos;1.125rem&apos;,
                  fontWeight: &apos;bold&apos;,
                  boxShadow: &apos;0 4px 6px rgba(0,0,0,0.1)&apos;
                }}
              >
                ⭐ Laisser un avis
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: &apos;#1f2937&apos;, color: &apos;white&apos;, padding: &apos;2rem 1rem&apos; }}>
          <div style={{ maxWidth: &apos;1200px&apos;, margin: &apos;0 auto&apos; }}>
            <div style={{
              display: &apos;flex&apos;,
              justifyContent: &apos;space-between&apos;,
              alignItems: &apos;center&apos;,
              flexWrap: &apos;wrap&apos;,
              gap: &apos;1rem&apos;
            }}>
              <div style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;0.75rem&apos; }}>
                <div style={{
                  width: &apos;2.5rem&apos;,
                  height: &apos;2.5rem&apos;,
                  backgroundColor: &apos;#d97706&apos;,
                  borderRadius: &apos;0.5rem&apos;,
                  display: &apos;flex&apos;,
                  alignItems: &apos;center&apos;,
                  justifyContent: &apos;center&apos;
                }}>
                  <span style={{ color: &apos;white&apos;, fontWeight: &apos;bold&apos; }}>JP</span>
                </div>
                <div>
                  <p style={{ fontWeight: &apos;bold&apos; }}>Maçonnerie JP</p>
                  <p style={{ fontSize: &apos;0.875rem&apos;, color: &apos;#9ca3af&apos; }}>Jean-Paul Dubois - Artisan maçon</p>
                </div>
              </div>
              <div style={{ textAlign: &apos;center&apos;, fontSize: &apos;0.875rem&apos;, color: &apos;#9ca3af&apos; }}>
                <p>© 2025 Maçonnerie JP - Tous droits réservés</p>
                <p style={{ marginTop: &apos;0.25rem&apos; }}>
                  Site créé avec{&apos; &apos;}
                  <button 
                    onClick={() => setCurrentView(&apos;landing&apos;)}
                    style={{
                      color: &apos;#fbbf24&apos;,
                      textDecoration: &apos;underline&apos;,
                      border: &apos;none&apos;,
                      background: &apos;none&apos;,
                      cursor: &apos;pointer&apos;
                    }}
                  >
                    AvisPro
                  </button>
                </p>
              </div>
              <div style={{ display: &apos;flex&apos;, alignItems: &apos;center&apos;, gap: &apos;1rem&apos; }}>
                <button 
                  onClick={() => alert(&apos;Dashboard admin en développement !&apos;)}
                  style={{
                    color: &apos;#fbbf24&apos;,
                    textDecoration: &apos;underline&apos;,
                    border: &apos;none&apos;,
                    background: &apos;none&apos;,
                    cursor: &apos;pointer&apos;,
                    fontSize: &apos;0.875rem&apos;
                  }}
                >
                  🔧 Mode Admin
                </button>
                <button 
                  onClick={() => alert(&apos;Test client : Formulaire bientôt disponible !&apos;)}
                  style={{
                    backgroundColor: &apos;#f59e0b&apos;,
                    color: &apos;white&apos;,
                    padding: &apos;0.5rem 1rem&apos;,
                    borderRadius: &apos;0.5rem&apos;,
                    border: &apos;none&apos;,
                    cursor: &apos;pointer&apos;,
                    fontSize: &apos;0.875rem&apos;
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
}