'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function PricingPage() {
  const { user } = useAuth();

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
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
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#4f46e5'
            }}>
              AvisPro
            </div>
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {user ? (
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

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Tarifs simples et transparents
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Choisissez le plan qui convient le mieux à votre activité
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: '2px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Gratuit</h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Parfait pour découvrir AvisPro</p>
            
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1f2937' }}>0€</span>
              <span style={{ fontSize: '1.125rem', color: '#6b7280' }}>/mois</span>
            </div>

            <Link 
              href="/signup"
              style={{
                display: 'block',
                width: '100%',
                border: '2px solid #4f46e5',
                color: '#4f46e5',
                backgroundColor: 'transparent',
                padding: '1rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
                fontSize: '1.125rem',
                boxSizing: 'border-box'
              }}
            >
              Commencer gratuitement
            </Link>
          </div>

          <div style={{
            backgroundColor: '#4f46e5',
            color: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 8px 25px rgba(79, 70, 229, 0.3)',
            position: 'relative',
            transform: 'scale(1.05)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-0.75rem',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#fbbf24',
              color: '#1f2937',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}>
              POPULAIRE
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Premium</h3>
            <p style={{ color: '#c7d2fe', marginBottom: '1.5rem' }}>Mensuel</p>
            
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>5€</span>
              <span style={{ fontSize: '1.125rem', opacity: 0.8 }}>/mois</span>
            </div>

            <button 
              style={{
                width: '100%',
                backgroundColor: 'white',
                color: '#4f46e5',
                border: 'none',
                padding: '1rem',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.125rem'
              }}
            >
              Choisir Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}