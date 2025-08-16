import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AvisPro - Votre page d\'avis clients en 2 minutes',
  description: 'Créez votre page personnalisée pour collecter et afficher les avis de vos clients. Parfait pour artisans, consultants, freelances et petites entreprises.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}