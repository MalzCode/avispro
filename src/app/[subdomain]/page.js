'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { profiles, reviews } from '../../lib/supabase';
import Link from 'next/link';

export default function PublicProfilePage() {
  const params = useParams();
  const subdomain = params.subdomain;
  
  const [profile, setProfile] = useState(null);
  const [profileReviews, setProfileReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    customer_name: '',
    customer_email: '',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const { data: profileData, error: profileError } = await profiles.getByUsername(subdomain);
        
        if (profileError || !profileData) {
          setError('Page non trouvée');
          setLoading(false);
          return;
        }
        
        setProfile(profileData);
        
        const { data: reviewsData, error: reviewsError } = await reviews.getByProfile(profileData.id, true);
        
        if (!reviewsError) {
          setProfileReviews(reviewsData || []);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement');
        setLoading(false);
      }
    };

    if (subdomain) {
      loadProfileData();
    }
  }, [subdomain]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const reviewData = {
        profile_id: profile.id,
        customer_name: reviewForm.customer_name,
        customer_email: reviewForm.customer_email,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        status: 'pending'
      };

      const { error } = await reviews.create(reviewData);
      
      if (error) {
        alert('Erreur lors de l&apos;envoi de l&apos;avis');
      } else {
        alert('Merci ! Votre avis a été envoyé et sera visible après validation.');
        setReviewForm({
          customer_name: '',
          customer_email: '',
          rating: 5,
          comment: ''
        });
        setShowReviewForm(false);
      }
    } catch (err) {
      alert('Erreur lors de l&apos;envoi');
    }
    
    setSubmitting(false);
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
        <div>Chargement...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Page non trouvée
          </h1>
          <Link 
            href="/"
            style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = profileReviews.length > 0 
    ? (profileReviews.reduce((sum, r) => sum + r.rating, 0) / profileReviews.length).toFixed(1)
    : 0;

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '5rem',
            height: '5rem',
            backgroundColor: '#4f46e5',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <span style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
              {profile.business_name.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {profile.business_name}
          </h1>
          
          {profile.description && (
            <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '1.125rem' }}>
              {profile.description}
            </p>
          )}
          
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem', color: '#fbbf24' }}>
              {'⭐'.repeat(Math.round(averageRating))}
            </span>
            <span style={{ marginLeft: '0.5rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
              {averageRating}/5
            </span>
            <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
              ({profileReviews.length} avis)
            </span>
          </div>

          <button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.125rem'
            }}
          >
            ⭐ Laisser un avis
          </button>
        </div>

        {showReviewForm && (
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Partagez votre expérience
            </h2>
            
            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                  Votre nom *
                </label>
                <input 
                  type="text" 
                  value={reviewForm.customer_name}
                  onChange={(e) => setReviewForm({...reviewForm, customer_name: e.target.value})}
                  placeholder="Jean Dupont"
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
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                  Email (optionnel)
                </label>
                <input 
                  type="email" 
                  value={reviewForm.customer_email}
                  onChange={(e) => setReviewForm({...reviewForm, customer_email: e.target.value})}
                  placeholder="jean@email.com"
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
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Note *
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                      style={{
                        fontSize: '2rem',
                        color: star <= reviewForm.rating ? '#fbbf24' : '#d1d5db',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                  Votre commentaire *
                </label>
                <textarea 
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  placeholder="Partagez votre expérience..."
                  required
                  rows={4}
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

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="submit"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    backgroundColor: submitting ? '#9ca3af' : '#10b981',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontWeight: '600'
                  }}
                >
                  {submitting ? 'Envoi...' : 'Publier mon avis'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  style={{
                    backgroundColor: '#6b7280',
                    color: 'white',
                    padding: '1rem 1.5rem',
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
        )}

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Avis clients ({profileReviews.length})
          </h2>
          
          {profileReviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
              <p style={{ fontSize: '1.125rem' }}>Aucun avis pour le moment</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Soyez le premier à laisser un avis !
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {profileReviews.map(review => (
                <div 
                  key={review.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: '#4f46e5',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: 'white', fontWeight: 'bold' }}>
                        {review.customer_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                        {review.customer_name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#fbbf24', fontSize: '1.25rem' }}>
                          {'⭐'.repeat(review.rating)}
                        </span>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          {new Date(review.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p style={{ 
                    color: '#374151', 
                    fontSize: '1.125rem', 
                    lineHeight: '1.6',
                    fontStyle: 'italic'
                  }}>
                    &quot;{review.comment}&quot;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Cette page est propulsée par
            </p>
            <Link 
              href="/"
              style={{ 
                color: '#4f46e5', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                fontSize: '1.125rem'
              }}
            >
              AvisPro.com
            </Link>
            <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
              Créez votre page d&apos;avis en 2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}