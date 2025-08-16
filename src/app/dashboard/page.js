'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { reviews } from '../../lib/supabase';
import ShareModal from '../../components/dashboard/ShareModal';
import CustomizeModal from '../../components/dashboard/CustomizeModal';

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const router = useRouter();

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
        justifyContent: 'center' 
      }}>
        <div>Chargement...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

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
            <span style={{ color: '#6b7280' }}>Bonjour, {profile.business_name}</span>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.5rem' }}>TOTAL AVIS</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>{userReviews.length}</p>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.5rem' }}>EN ATTENTE</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{pendingReviews.length}</p>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.5rem' }}>APPROUVÉS</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{approvedReviews.length}</p>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.5rem' }}>NOTE MOYENNE</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
              {approvedReviews.length > 0 
                ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
                : '0'
              }
            </p>
          </div>
        </div>

        {/* Actions rapides */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Actions rapides</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link 
              href={`/${profile.username}`}
              style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              🌐 Voir ma page publique
            </Link>
            <button 
              onClick={() => setShowCustomizeModal(true)}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              ✏️ Personnaliser ma page
            </button>
            <button 
              onClick={() => setShowShareModal(true)}
              style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              📤 Partager mon lien
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
                        <span style={{ color: '#fbbf24' }}>{'⭐'.repeat(review.rating)}</span>
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

        {/* Tous les avis */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Tous les avis ({userReviews.length})
          </h2>
          
          {reviewsLoading ? (
            <p>Chargement des avis...</p>
          ) : userReviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
              <p>Aucun avis pour le moment.</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Partagez votre lien pour commencer à recevoir des avis !
              </p>
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
                        <span style={{ color: '#fbbf24' }}>{'⭐'.repeat(review.rating)}</span>
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

        {/* Modals */}
        <ShareModal 
          profile={profile}
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
        />
        <CustomizeModal 
          isOpen={showCustomizeModal}
          onClose={() => setShowCustomizeModal(false)}
        />
      </div>
    </div>
  );
}