export const themes = {
  professional: {
    id: 'professional',
    name: 'Professionnel',
    description: 'Corporate moderne avec glassmorphism',
    config: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        accent: '#3b82f6',
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        card: 'rgba(255, 255, 255, 0.9)',
        text: '#0f172a',
        textSecondary: '#475569',
        border: 'rgba(148, 163, 184, 0.2)',
        overlay: 'rgba(15, 23, 42, 0.05)'
      },
      gradients: {
        header: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #3b82f6 100%)',
        button: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        rating: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        card: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
      },
      typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        titleSize: '3rem',
        titleWeight: '700',
        bodySize: '1.125rem',
        bodyWeight: '400',
        letterSpacing: '-0.025em'
      },
      layout: {
        borderRadius: '1.5rem',
        shadow: '0 25px 50px rgba(15, 23, 42, 0.1)',
        spacing: '3rem',
        maxWidth: '1200px',
        backdropBlur: 'blur(20px)'
      }
    }
  },

  modern: {
    id: 'modern',
    name: 'Moderne',
    description: 'Design minimal avec cartes flottantes',
    config: {
      colors: {
        primary: '#111827',
        secondary: '#374151',
        accent: '#10b981',
        background: '#ffffff',
        card: '#ffffff',
        text: '#111827',
        textSecondary: '#6b7280',
        border: '#f3f4f6',
        highlight: '#ecfdf5'
      },
      gradients: {
        header: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
        button: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        rating: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        accent: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
      },
      typography: {
        fontFamily: "'Manrope', -apple-system, sans-serif",
        titleSize: '2.75rem',
        titleWeight: '800',
        bodySize: '1.125rem',
        bodyWeight: '400',
        letterSpacing: '-0.02em'
      },
      layout: {
        borderRadius: '2rem',
        shadow: '0 10px 40px rgba(17, 24, 39, 0.08)',
        spacing: '2.5rem',
        maxWidth: '1100px',
        cardSpacing: '1.5rem',
        hoverShadow: '0 20px 60px rgba(17, 24, 39, 0.12)'
      }
    }
  },

  artisan: {
    id: 'artisan',
    name: 'Artisan',
    description: 'Design chaleureux avec texture naturelle',
    config: {
      colors: {
        primary: '#7c2d12',
        secondary: '#dc2626',
        accent: '#ea580c',
        background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 20%, #fef7ed 100%)',
        card: 'rgba(255, 255, 255, 0.95)',
        text: '#7c2d12',
        textSecondary: '#a16207',
        border: 'rgba(217, 119, 6, 0.2)',
        warm: '#fef3c7',
        accent2: '#fbbf24'
      },
      gradients: {
        header: 'linear-gradient(135deg, #7c2d12 0%, #dc2626 50%, #ea580c 100%)',
        button: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
        rating: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        card: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,243,199,0.3) 100%)',
        texture: 'linear-gradient(45deg, transparent 25%, rgba(217,119,6,0.05) 25%, rgba(217,119,6,0.05) 50%, transparent 50%)'
      },
      typography: {
        fontFamily: "'Crimson Text', 'Georgia', serif",
        titleSize: '2.5rem',
        titleWeight: '600',
        bodySize: '1.125rem',
        bodyWeight: '400',
        lineHeight: '1.7'
      },
      layout: {
        borderRadius: '1rem',
        shadow: '0 20px 40px rgba(124, 45, 18, 0.15)',
        spacing: '2.5rem',
        maxWidth: '1000px',
        cardShadow: '0 8px 25px rgba(124, 45, 18, 0.1)'
      }
    }
  },

  tech: {
    id: 'tech',
    name: 'Tech',
    description: 'Interface futuriste avec néon et cyber style',
    config: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        card: 'rgba(26, 26, 46, 0.8)',
        text: '#ffffff',
        textSecondary: '#94a3b8',
        border: 'rgba(99, 102, 241, 0.3)',
        neon: '#00ffff',
        glow: 'rgba(6, 182, 212, 0.5)'
      },
      gradients: {
        header: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
        button: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
        rating: 'linear-gradient(135deg, #00ffff 0%, #06b6d4 100%)',
        card: 'linear-gradient(135deg, rgba(26,26,46,0.9) 0%, rgba(22,33,62,0.8) 100%)',
        neon: 'linear-gradient(135deg, #00ffff 0%, #6366f1 100%)'
      },
      typography: {
        fontFamily: "'Space Grotesk', -apple-system, sans-serif",
        titleSize: '2.75rem',
        titleWeight: '700',
        bodySize: '1.125rem',
        bodyWeight: '400',
        letterSpacing: '-0.01em'
      },
      layout: {
        borderRadius: '1.5rem',
        shadow: '0 25px 50px rgba(99, 102, 241, 0.3), 0 0 40px rgba(6, 182, 212, 0.1)',
        spacing: '2.5rem',
        maxWidth: '1100px',
        glowEffect: '0 0 20px rgba(6, 182, 212, 0.3)',
        backdropBlur: 'blur(10px)'
      }
    }
  },

  creative: {
    id: 'creative',
    name: 'Créatif',
    description: 'Design vibrant avec animations et couleurs éclatantes',
    config: {
      colors: {
        primary: '#ec4899',
        secondary: '#f472b6',
        accent: '#8b5cf6',
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #ecfeff 100%)',
        card: 'rgba(255, 255, 255, 0.9)',
        text: '#831843',
        textSecondary: '#be185d',
        border: 'rgba(236, 72, 153, 0.2)',
        vibrant: '#06b6d4',
        highlight: '#fef3c7'
      },
      gradients: {
        header: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 35%, #06b6d4 70%, #10b981 100%)',
        button: 'linear-gradient(135deg, #f472b6 0%, #8b5cf6 50%, #06b6d4 100%)',
        rating: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ec4899 100%)',
        card: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,243,199,0.3) 50%, rgba(236,254,255,0.3) 100%)',
        rainbow: 'linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444)'
      },
      typography: {
        fontFamily: "'Poppins', system-ui, sans-serif",
        titleSize: '3rem',
        titleWeight: '800',
        bodySize: '1.125rem',
        bodyWeight: '500',
        letterSpacing: '-0.02em'
      },
      layout: {
        borderRadius: '2rem',
        shadow: '0 25px 60px rgba(236, 72, 153, 0.2), 0 10px 30px rgba(139, 92, 246, 0.1)',
        spacing: '3rem',
        maxWidth: '1100px',
        hoverTransform: 'translateY(-2px)',
        cardShadow: '0 15px 35px rgba(236, 72, 153, 0.15)'
      }
    }
  },

  // Nouveau thème inspiré des meilleurs sites
  luxury: {
    id: 'luxury',
    name: 'Luxe',
    description: 'Élégance premium avec finitions dorées',
    config: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#2d2d2d',
        accent: '#d4af37',
        background: 'linear-gradient(135deg, #f7f3f0 0%, #f1ece6 100%)',
        card: 'rgba(255, 255, 255, 0.95)',
        text: '#1a1a1a',
        textSecondary: '#6b6b6b',
        border: 'rgba(212, 175, 55, 0.2)',
        gold: '#d4af37',
        platinum: '#e5e5e5'
      },
      gradients: {
        header: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #d4af37 100%)',
        button: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
        rating: 'linear-gradient(135deg, #d4af37 0%, #f7d154 100%)',
        card: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(247,243,240,0.8) 100%)',
        accent: 'linear-gradient(135deg, #d4af37 0%, #f7d154 100%)'
      },
      typography: {
        fontFamily: "'Playfair Display', serif",
        titleSize: '3.5rem',
        titleWeight: '700',
        bodySize: '1.125rem',
        bodyWeight: '400',
        letterSpacing: '-0.03em'
      },
      layout: {
        borderRadius: '1.25rem',
        shadow: '0 30px 60px rgba(26, 26, 26, 0.1), 0 0 30px rgba(212, 175, 55, 0.1)',
        spacing: '3.5rem',
        maxWidth: '1200px',
        cardShadow: '0 15px 40px rgba(26, 26, 26, 0.08)'
      }
    }
  }
};

export const getThemeConfig = (themeId) => {
  return themes[themeId] || themes.professional;
};