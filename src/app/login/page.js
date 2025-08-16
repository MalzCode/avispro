'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();
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
    if (!formData.email || !formData.password) {
      setError('Tous les champs sont obligatoires');
      setLoading(false);
      return;
    }

    const { data, error } = await signIn(formData.email, formData.password);

    if (error) {
      setError('Email ou mot de passe incorrect');
    } else {
      // Redirection vers le dashboard
      router.push('/dashboard');
    }

    setLoading(false);
  };

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
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5', marginBottom: '0.5rem' }}>
              AvisPro
            </div>
          </Link>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Connexion</h2>
          <p style={{ color: '#6b7280' }}>Accédez à votre dashboard</p>
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
              Email
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
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
              Mot de passe
            </label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
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
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Pas encore de compte ?{' '}
            <Link href="/signup" style={{ color: '#4f46e5', textDecoration: 'underline' }}>
              S&apos;inscrire
            </Link>
          </p>
          <Link href="/" style={{ color: '#6b7280', fontSize: '0.875rem', textDecoration: 'underline' }}>
            ← Retour à l&apos;accueil
          </Link>
        </div>

        {/* Comptes de test pour développement */}
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '0.5rem',
          fontSize: '0.875rem'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>🧪 Test :</p>
          <p style={{ color: '#6b7280' }}>
            Utilisez le compte que vous venez de créer lors de l&apos;inscription
          </p>
        </div>
      </div>
    </div>
  );
}