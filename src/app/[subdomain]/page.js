'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { profiles, reviews } from '../../lib/supabase';
import { getThemeConfig } from '../../data/themes';
import ThemePreview from '../../components/themes/ThemePreview';
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
    comment: '',
    images: []
  });
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert('La photo est trop voluminose (max 5MB)');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setReviewForm(prev => ({
          ...prev,
          images: [...prev.images, event.target.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setReviewForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

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
        images: reviewForm.images,
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
          comment: '',
          images: []
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

  // Utiliser le thème du profil ou le thème par défaut
  const themeId = profile?.theme_id || 'professional';
  
  // Si le profil a un thème personnalisé, utiliser ThemePreview
  if (profile && profile.theme_id && profile.theme_id !== 'default') {
    return (
      <ThemePreview 
        themeId={themeId}
        profile={profile}
        reviews={profileReviews}
      />
    );
  }

  // Sinon, utiliser le design par défaut existant
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header avec bannière/logo */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
          overflow: 'hidden'
        }}>
          {/* Bannière de fond */}
          <div style={{
            height: '200px',
            background: profile.banner_image 
              ? `url(${profile.banner_image}) center/cover`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!profile.banner_image && (
                <div style={{ color: 'white', fontSize: '1.125rem', fontWeight: '600', opacity: 0.8 }}>
                  Espace pour votre bannière
                </div>
              )}
            </div>
          </div>
          
          {/* Profil principal */}
          <div style={{ padding: '2rem', textAlign: 'center', marginTop: '-3rem', position: 'relative' }}>
            {/* Logo/Avatar */}
            <div style={{
              width: '6rem',
              height: '6rem',
              backgroundColor: '#4f46e5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              border: '4px solid white',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              backgroundImage: profile.logo_image ? `url(${profile.logo_image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              {!profile.logo_image && (
                <span style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                  {profile.business_name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {profile.business_name}
            </h1>
            
            {profile.description && (
              <p style={{ 
                color: '#6b7280', 
                marginBottom: '1.5rem', 
                fontSize: '1.125rem',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor"/>
                  </svg>
                  <span style={{ fontWeight: '500' }}>{profile.phone}</span>
                </div>
              )}
              {profile.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontWeight: '500' }}>{profile.email}</span>
                </div>
              )}
              {profile.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                padding: '1rem 2rem',
                borderRadius: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: '0 8px 25px rgba(250, 112, 154, 0.3)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style={{ fontSize: '1.5rem' }}>{averageRating}/5</span>
                <span style={{ opacity: 0.9 }}>({profileReviews.length} avis)</span>
              </div>
            </div>

            <button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 2.5rem',
                borderRadius: '2rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Laisser un avis
            </button>
          </div>
        </div>

        {showReviewForm && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            marginBottom: '2rem',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '2rem',
              color: 'white',
              textAlign: 'center'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1rem' }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Partagez votre expérience
              </h2>
              <p style={{ opacity: 0.9 }}>Votre avis compte et aide d&apos;autres clients</p>
            </div>
            
            <div style={{ padding: '2rem' }}>
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
                <div style={{ 
                  display: 'flex', 
                  gap: '0.25rem', 
                  marginBottom: '0.5rem',
                  justifyContent: 'center',
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '0.75rem'
                }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      <svg 
                        width="32" 
                        height="32" 
                        viewBox="0 0 24 24" 
                        fill={star <= reviewForm.rating ? '#fbbf24' : '#e5e7eb'} 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  ))}
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                  {reviewForm.rating === 1 && 'Très déçu'}
                  {reviewForm.rating === 2 && 'Déçu'}
                  {reviewForm.rating === 3 && 'Moyen'}
                  {reviewForm.rating === 4 && 'Satisfait'}
                  {reviewForm.rating === 5 && 'Très satisfait'}
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

              {/* Section photos */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Ajouter des photos (optionnel)
                </label>
                <div 
                  onClick={() => document.getElementById('photo-upload').click()}
                  style={{
                    border: '2px dashed #d1d5db',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.backgroundColor = '#f0f4ff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.backgroundColor = '#f8fafc';
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto 1rem auto', color: '#9ca3af' }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <p style={{ color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Cliquez pour ajouter des photos
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                    JPG, PNG, WebP - Max 5MB par photo
                  </p>
                  <input 
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    id="photo-upload"
                    onChange={handleImageUpload}
                  />
                </div>
                {reviewForm.images.length > 0 && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {reviewForm.images.map((img, index) => (
                      <div key={index} style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '0.5rem',
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '2px solid #e5e7eb',
                        position: 'relative'
                      }}>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto 1rem auto', color: '#d1d5db' }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < review.rating ? '#fbbf24' : '#e5e7eb'} xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
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
                    fontStyle: 'italic',
                    marginBottom: '1rem'
                  }}>
                    &quot;{review.comment}&quot;
                  </p>

                  {review.images && review.images.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', maxWidth: '500px' }}>
                        {review.images.map((image, imgIndex) => (
                          <div key={imgIndex} style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '0.75rem',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '2px solid #e5e7eb',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
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