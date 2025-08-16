'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    business_name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { signUp } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation basique
    if (!formData.email || !formData.password || !formData.username || !formData.business_name) {
      setError('Tous les champs obligatoires doivent être remplis');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    // Nettoyer le username (enlever espaces, caractères spéciaux)
    const cleanUsername = formData.username.toLowerCase().replace(/[^a-z0-9-]/g, '');
    
    const { data, error } = await signUp(formData.email, formData.password, {
      username: cleanUsername,
      business_name: formData.business_name,
      phone: formData.phone
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      // Rediriger vers le dashboard après 2 secondes
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }

    setLoading(false);
  };

  if (success) {
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
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#16a34a' }}>
            Compte créé avec succès !
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Vérifiez votre email pour confirmer votre compte, puis vous serez redirigé vers votre dashboard.
          </p>
          <div style={{
            background: 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            color: '#4f46e5'
          }}>
            Votre page sera disponible sur :<br/>
            <strong>{formData.username}.avispro.com</strong>
          </div>
        </div>
      </div>
    );
  }

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
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5', marginBottom: '0.5rem' }}>
              AvisPro
            </div>
          </Link>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Créez votre compte</h2>
          <p style={{ color: '#6b7280' }}>Et lancez votre page d&apos;avis en 2 minutes !</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              Email *
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jean.paul@email.com"
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
              Mot de passe *
            </label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 caractères"
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
              Nom de votre entreprise *
            </label>
            <input 
              type="text" 
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              placeholder="Maçonnerie JP"
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
              Votre lien personnalisé *
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="jean-paul"
                required
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem 0 0 0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <span style={{
                padding: '0.75rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderLeft: 'none',
                borderRadius: '0 0.5rem 0.5rem 0',
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                .avispro.com
              </span>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              Téléphone (optionnel)
            </label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#9ca3af' : '#4f46e5',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            {loading ? 'Création en cours...' : 'Créer mon compte'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Déjà un compte ?{' '}
            <Link href="/login" style={{ color: '#4f46e5', textDecoration: 'underline' }}>
              Se connecter
            </Link>
          </p>
          <Link href="/" style={{ color: '#6b7280', fontSize: '0.875rem', textDecoration: 'underline' }}>
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}