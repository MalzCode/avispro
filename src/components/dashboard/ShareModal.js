'use client';

import { useState } from 'react';

export default function ShareModal({ profile, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const profileUrl = `${profile.username}.avispro.com`;
  const fullUrl = `https://${profileUrl}`;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback pour les navigateurs qui ne supportent pas l'API clipboard
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Donnez votre avis sur ${profile.business_name}`);
    const body = encodeURIComponent(`Bonjour,

J&apos;aimerais avoir votre retour sur votre expérience avec ${profile.business_name}.

Vous pouvez laisser votre avis en quelques clics sur : ${fullUrl}

Merci pour votre temps !

${profile.business_name}`);
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaSMS = () => {
    const message = encodeURIComponent(`Bonjour ! Pouvez-vous laisser un avis sur votre expérience avec ${profile.business_name} ? ${fullUrl} Merci !`);
    window.open(`sms:?body=${message}`);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Partagez votre lien</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
            Votre lien de page d&apos;avis :
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text"
              value={fullUrl}
              readOnly
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                backgroundColor: '#f9fafb',
                fontSize: '0.875rem'
              }}
            />
            <button 
              onClick={() => copyToClipboard(fullUrl)}
              style={{
                backgroundColor: copied ? '#10b981' : '#4f46e5',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}
            >
              {copied ? '✓ Copié' : 'Copier'}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Moyens de partage :
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              onClick={shareViaEmail}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              📧 Partager par email
            </button>
            
            <button 
              onClick={shareViaSMS}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              💬 Partager par SMS
            </button>
          </div>
        </div>

        <div style={{
          backgroundColor: '#f0f9ff',
          padding: '1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          color: '#0369a1'
        }}>
          <strong>💡 Conseil :</strong> Envoyez ce lien à vos clients après une prestation réussie. Plus vous avez d&apos;avis positifs, plus vous gagnez en crédibilité !
        </div>
      </div>
    </div>
  );
}