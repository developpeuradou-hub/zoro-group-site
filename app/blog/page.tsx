import Image from 'next/image'
import BrandedImage from '@/components/BrandedImage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import BlogClient from './BlogClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Actualités — Zoro Group SARL',
  description: "Conseils immobiliers, actualités construction et guides pratiques par Zoro Group SARL à San Pedro, Côte d'Ivoire.",
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ background: 'linear-gradient(135deg, #8B0000, #6b0000)', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image src="/images/generated/blog-hero.jpg" alt="Blog Zoro Group" fill style={{ objectFit: 'cover', opacity: 0.4 }} unoptimized />
          </div>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'rgba(184,149,42,0.07)', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
          {/* Logo watermark */}
          <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.4)', padding: '6px 12px', borderRadius: 6, backdropFilter: 'blur(4px)' }}>
            <Image src="/images/logo.png" alt="Zoro Group" width={28} height={28} style={{ objectFit: 'contain', borderRadius: '50%', background: 'white', padding: 2 }} />
            <div>
              <div style={{ color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: 1, fontFamily: 'Montserrat,sans-serif' }}>ZORO GROUP SARL</div>
              <div style={{ color: '#B8952A', fontSize: 8, letterSpacing: 0.5, fontFamily: 'Montserrat,sans-serif' }}>BÂTIR L'AVENIR DES LEADERS</div>
            </div>
          </div>
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>ACCUEIL / BLOG</div>
            <h1 style={{ color: 'white', fontSize: 26, fontWeight: 600, marginBottom: 10, fontFamily: 'Montserrat,sans-serif' }}>Blog & Actualités</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, maxWidth: 520, lineHeight: 1.7, fontFamily: 'Montserrat,sans-serif' }}>
              Conseils immobiliers, actualités construction et guides pratiques par l'équipe Zoro Group.
            </p>
          </div>
        </div>
        <BlogClient />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
