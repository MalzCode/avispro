'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { reviews } from '../../lib/supabase';
import ShareModal from '../../components/dashboard/ShareModal';
import CustomizeModal from '../../components/dashboard/CustomizeModal';
import ProfileEditor from '../../components/dashboard/ProfileEditor';

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const router = useRouter();

  // Debug pour comprendre le problème
  useEffect(() => {
    console.log('Dashboard render - User:', !!user, 'Profile:', !!profile, 'Loading:', loading);
  }, [user, profile, loading]);

  // Rediriger si pas connecté
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Charger les avis de l'utilisateur
  useEffect(() => {
    const loadReviews = async () => {
      if (user && profile) {
        setReviewsLoading(true);
        const { data, error } = await reviews.getAllByProfile(profile.id);
        if (!error) {
          setUserReviews(data || []);
        }
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, [user, profile]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Approuver un avis
  const approveReview = async (reviewId) => {
    const { error } = await reviews.updateStatus(reviewId, 'approved');
    if (!error) {
      setUserReviews(prev => 
        prev.map(review => 
          review.id === reviewId 
            ? { ...review, status: 'approved' }
            : review
        )
      );
    }
  };

  // Rejeter un avis
  const rejectReview = async (reviewId) => {
    const { error } = await reviews.updateStatus(reviewId, 'rejected');
    if (!error) {
      setUserReviews(prev => 
        prev.map(review => 
          review.id === reviewId 
            ? { ...review, status: 'rejected' }
            : review
        )
      );
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto 1rem auto', color: '#6b7280' }}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <div>Chargement de votre dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Profil par défaut si pas encore créé
  const displayProfile = profile || {
    business_name: user.email?.split('@')[0] || 'Mon Entreprise',
    username: user.email?.split('@')[0]?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'demo',
    description: null,
    phone: null
  };

  const pendingReviews = userReviews.filter(r => r.status === 'pending');
  const approvedReviews = userReviews.filter(r => r.status === 'approved');
  const rejectedReviews = userReviews.filter(r => r.status === 'rejected');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5', textDecoration: 'none' }}>
              AvisPro
            </Link>
            <span style={{ marginLeft: '1rem', color: '#6b7280' }}>Dashboard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#6b7280' }}>Bonjour, {displayProfile.business_name}</span>
            <button 
              onClick={handleSignOut}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Statistiques */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '2rem', 
            borderRadius: '1rem', 
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.2 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3v18h18"/>
                <path d="M18 17V9"/>
                <path d="M13 17V5"/>
                <path d="M8 17V13"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', opacity: 0.9, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>TOTAL AVIS</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{userReviews.length}</p>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              {userReviews.length === 0 ? 'Commencez à collecter' : userReviews.length === 1 ? 'Premier avis reçu !' : 'Excellente progression !'}
            </p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '2rem', 
            borderRadius: '1rem', 
            boxShadow: '0 8px 25px rgba(245, 87, 108, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.2 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', opacity: 0.9, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>EN ATTENTE</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{pendingReviews.length}</p>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              {pendingReviews.length === 0 ? 'Aucune modération' : pendingReviews.length === 1 ? 'À modérer' : 'Avis à traiter'}
            </p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: '2rem', 
            borderRadius: '1rem', 
            boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.2 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', opacity: 0.9, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>APPROUVÉS</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{approvedReviews.length}</p>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              {approvedReviews.length === 0 ? 'Prêt à publier' : 'Visibles sur votre page'}
            </p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            color: 'white',
            padding: '2rem', 
            borderRadius: '1rem', 
            boxShadow: '0 8px 25px rgba(250, 112, 154, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.2 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', opacity: 0.9, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>NOTE MOYENNE</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {approvedReviews.length > 0 
                ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
                : '0'
              }
            </p>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              {approvedReviews.length === 0 ? 'Premières étoiles' : 'Sur 5 étoiles'}
            </p>
          </div>
        </div>

        {/* Actions rapides */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem', 
          borderRadius: '1rem', 
          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)', 
          marginBottom: '2rem',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
            Gestion de votre page AvisPro
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Link 
              href={`/${displayProfile.username}`}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '1rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ marginBottom: '0.5rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>Voir ma page publique</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                {displayProfile.username}.avispro.com
              </div>
            </Link>
            <button 
              onClick={() => setShowProfileEditor(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              <div style={{ marginBottom: '0.5rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M17 4a2 2 0 0 0 2 2 2 2 0 0 0-2 2 2 2 0 0 0-2-2 2 2 0 0 0 2-2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 11a2 2 0 0 0 2 2 2 2 0 0 0-2 2 2 2 0 0 0-2-2 2 2 0 0 0 2-2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>Éditeur avancé</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                Thèmes + Aperçu
              </div>
            </button>
            <button 
              onClick={() => setShowShareModal(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              <div style={{ marginBottom: '0.5rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="16,6 12,2 8,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>Partager le lien</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                SMS, Email...
              </div>
            </button>
          </div>
        </div>

        {/* Avis en attente */}
        {pendingReviews.length > 0 && (
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Avis en attente de modération ({pendingReviews.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingReviews.map(review => (
                <div key={review.id} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600' }}>{review.customer_name}</span>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < review.rating ? '#fbbf24' : '#e5e7eb'} xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p style={{ color: '#374151', marginBottom: '0.5rem' }}>&quot;{review.comment}&quot;</p>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {new Date(review.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => approveReview(review.id)}
                        style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.25rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        ✓ Approuver
                      </button>
                      <button 
                        onClick={() => rejectReview(review.id)}
                        style={{
                          backgroundColor: '#ef4444',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.25rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        ✗ Rejeter
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guide pour commencer */}
        {userReviews.length === 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
              Comment commencer à recevoir des avis
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Personnalisez votre page
                </h3>
                <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  Ajoutez le nom de votre entreprise et une description
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="16,6 12,2 8,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Partagez votre lien
                </h3>
                <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  Envoyez le lien à vos clients par SMS ou email
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="9,11 12,14 22,4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Gérez vos avis
                </h3>
                <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  Approuvez les avis depuis ce dashboard
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tous les avis */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                Tous les avis ({userReviews.length})
              </h2>
            </div>
            {userReviews.length > 0 && (
              <div style={{ 
                backgroundColor: '#f0f9ff', 
                color: '#0369a1', 
                padding: '0.5rem 1rem', 
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {approvedReviews.length} publics
              </div>
            )}
          </div>
          
          {reviewsLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto 1rem auto', color: '#6b7280' }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <p>Chargement des avis...</p>
            </div>
          ) : userReviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto 1rem auto', color: '#d1d5db' }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>
                Prêt à recevoir vos premiers avis !
              </h3>
              <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
                Votre page est configurée. Partagez votre lien pour commencer à collecter des avis.
              </p>
              <button 
                onClick={() => setShowShareModal(true)}
                style={{
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                Partager mon lien maintenant
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userReviews.map(review => (
                <div 
                  key={review.id} 
                  style={{ 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '0.5rem', 
                    padding: '1rem',
                    backgroundColor: review.status === 'approved' ? '#f0fdf4' : review.status === 'rejected' ? '#fef2f2' : '#fffbeb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600' }}>{review.customer_name}</span>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < review.rating ? '#fbbf24' : '#e5e7eb'} xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '0.25rem',
                          backgroundColor: review.status === 'approved' ? '#10b981' : review.status === 'rejected' ? '#ef4444' : '#f59e0b',
                          color: 'white'
                        }}>
                          {review.status === 'approved' ? 'Approuvé' : review.status === 'rejected' ? 'Rejeté' : 'En attente'}
                        </span>
                      </div>
                      <p style={{ color: '#374151', marginBottom: '0.5rem' }}>&quot;{review.comment}&quot;</p>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {new Date(review.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message si pas de profil configuré */}
        {!profile && (
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#92400e" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 16.5c-1.5 1.5-1.5 4 0 5.5s4 1.5 5.5 0L12 20l2 2c1.5 1.5 4 1.5 5.5 0s1.5-4 0-5.5L17 14l-5-5-5 5-2.5 2.5z"/>
                <path d="M13.5 8.5L21 1"/>
                <path d="M21 1l-2 2"/>
                <path d="M21 1l-4 4"/>
              </svg>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#92400e' }}>
                Finalisez votre configuration
              </h3>
            </div>
            <p style={{ color: '#92400e', marginBottom: '1rem' }}>
              Personnalisez votre profil pour activer toutes les fonctionnalités
            </p>
            <button 
              onClick={() => setShowCustomizeModal(true)}
              style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Configurer maintenant
            </button>
          </div>
        )}

        {/* Modals */}
        <ShareModal 
          profile={displayProfile}
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
        />
        <CustomizeModal 
          isOpen={showCustomizeModal}
          onClose={() => setShowCustomizeModal(false)}
        />
        <ProfileEditor 
          isOpen={showProfileEditor}
          onClose={() => setShowProfileEditor(false)}
        />
      </div>
    </div>
  );
}