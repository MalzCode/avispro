export const themes = {
  professional: {
    id: 'professional',
    name: 'Professionnel',
    description: 'Élégant et corporate',
    config: {
      colors: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#60a5fa',
        background: '#f8fafc',
        card: '#ffffff',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb'
      },
      gradients: {
        header: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        button: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        rating: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
      },
      typography: {
        fontFamily: "'Inter', system-ui, sans-serif",
        titleSize: '2.5rem',
        titleWeight: '700',
        bodySize: '1rem',
        bodyWeight: '400'
      },
      layout: {
        borderRadius: '0.75rem',
        shadow: '0 10px 25px rgba(30, 64, 175, 0.15)',
        spacing: '2rem',
        maxWidth: '1000px'
      }
    }
  },

  modern: {
    id: 'modern',
    name: 'Moderne',
    description: 'Design épuré et minimaliste',
    config: {
      colors: {
        primary: '#0f172a',
        secondary: '#334155',
        accent: '#f59e0b',
        background: '#ffffff',
        card: '#f8fafc',
        text: '#0f172a',
        textSecondary: '#64748b',
        border: '#e2e8f0'
      },
      gradients: {
        header: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
        button: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        rating: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
      },
      typography: {
        fontFamily: "'Poppins', system-ui, sans-serif",
        titleSize: '3rem',
        titleWeight: '600',
        bodySize: '1.125rem',
        bodyWeight: '400'
      },
      layout: {
        borderRadius: '1rem',
        shadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        spacing: '3rem',
        maxWidth: '1200px'
      }
    }
  },

  artisan: {
    id: 'artisan',
    name: 'Artisan',
    description: 'Chaleureux et authentique',
    config: {
      colors: {
        primary: '#92400e',
        secondary: '#d97706',
        accent: '#f59e0b',
        background: '#fefbf3',
        card: '#ffffff',
        text: '#451a03',
        textSecondary: '#78716c',
        border: '#d6d3d1'
      },
      gradients: {
        header: 'linear-gradient(135deg, #92400e 0%, #d97706 100%)',
        button: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
        rating: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
      },
      typography: {
        fontFamily: "'Merriweather', serif",
        titleSize: '2.25rem',
        titleWeight: '700',
        bodySize: '1rem',
        bodyWeight: '400'
      },
      layout: {
        borderRadius: '0.5rem',
        shadow: '0 8px 20px rgba(146, 64, 14, 0.2)',
        spacing: '2rem',
        maxWidth: '900px'
      }
    }
  },

  tech: {
    id: 'tech',
    name: 'Tech',
    description: 'Futuriste et innovant',
    config: {
      colors: {
        primary: '#7c3aed',
        secondary: '#a855f7',
        accent: '#06b6d4',
        background: '#0f0f23',
        card: '#1a1a2e',
        text: '#ffffff',
        textSecondary: '#a8a8a8',
        border: '#374151'
      },
      gradients: {
        header: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #06b6d4 100%)',
        button: 'linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%)',
        rating: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
      },
      typography: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        titleSize: '2.5rem',
        titleWeight: '600',
        bodySize: '1rem',
        bodyWeight: '400'
      },
      layout: {
        borderRadius: '1.5rem',
        shadow: '0 25px 50px rgba(124, 58, 237, 0.3)',
        spacing: '2.5rem',
        maxWidth: '1100px'
      }
    }
  },

  creative: {
    id: 'creative',
    name: 'Créatif',
    description: 'Coloré et expressif',
    config: {
      colors: {
        primary: '#ec4899',
        secondary: '#f472b6',
        accent: '#8b5cf6',
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%)',
        card: '#ffffff',
        text: '#831843',
        textSecondary: '#a21caf',
        border: '#f3e8ff'
      },
      gradients: {
        header: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)',
        button: 'linear-gradient(135deg, #f472b6 0%, #8b5cf6 100%)',
        rating: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)'
      },
      typography: {
        fontFamily: "'Nunito', system-ui, sans-serif",
        titleSize: '2.75rem',
        titleWeight: '800',
        bodySize: '1.125rem',
        bodyWeight: '500'
      },
      layout: {
        borderRadius: '2rem',
        shadow: '0 20px 60px rgba(236, 72, 153, 0.2)',
        spacing: '2.5rem',
        maxWidth: '1000px'
      }
    }
  }
};

export const getThemeConfig = (themeId) => {
  return themes[themeId] || themes.professional;
};