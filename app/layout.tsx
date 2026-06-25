import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Zoro Group SARL — Bâtir l'Avenir des Leaders",
  description: "Société immobilière à San Pedro, Côte d'Ivoire. Construction, vente, location et gestion de biens immobiliers.",
  keywords: "immobilier, San Pedro, Côte d'Ivoire, construction, location, vente, terrain",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Zoro Group SARL',
    description: "Votre partenaire immobilier de confiance en Côte d'Ivoire",
    type: 'website',
    locale: 'fr_CI',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'Zoro Group SARL' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
