import Link from 'next/link'
import Image from 'next/image'
import { IconBuilding, IconAward, IconUsers } from '@tabler/icons-react'

export default function HeroSection() {
  return (
    <section style={{ background: 'white', padding: '48px 24px 60px', position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.025, fontSize: 200, fontWeight: 800, color: '#8B0000', pointerEvents: 'none', fontFamily: 'Montserrat,sans-serif', userSelect: 'none' }}>BTP</div>

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 480px', gap: 40, alignItems: 'center', position: 'relative' }}>

        {/* ===== GAUCHE ===== */}
        <div style={{ paddingRight: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 28, height: 2, background: '#8B0000' }} />
            <span style={{ color: '#8B0000', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Montserrat,sans-serif' }}>BTP & Immobilier — San Pedro</span>
          </div>

          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.12, marginBottom: 18, letterSpacing: -1.5, fontFamily: 'Montserrat,sans-serif' }}>
            Ensemble,<br />
            bâtissons<br />
            <span style={{ color: '#8B0000' }}>l'avenir des</span><br />
            leaders.
          </h1>

          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.85, marginBottom: 28, maxWidth: 420, fontFamily: 'Montserrat,sans-serif' }}>
            ZORO GROUP SARL, votre partenaire BTP et immobilier à San Pedro. Construction, rénovation, vente et gestion de biens — qualité et engagement sans compromis.
          </p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#8B0000', color: 'white', padding: '13px 28px', borderRadius: 4, fontSize: 13, fontWeight: 700, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif', letterSpacing: 0.5, display: 'inline-block' }}>
              Demander un devis
            </Link>
            <Link href="/realisations" style={{ background: 'transparent', color: '#1a1a1a', border: '1.5px solid #ddd', padding: '12px 24px', borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif', display: 'inline-block' }}>
              Nos réalisations
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 28, paddingTop: 24, borderTop: '0.5px solid #eee', flexWrap: 'wrap' }}>
            {[
              { icon: IconBuilding, value: '50+', label: 'Projets livrés' },
              { icon: IconAward, value: '5+', label: "Ans d'expérience" },
              { icon: IconUsers, value: '100%', label: 'Satisfaction' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 40, height: 40, background: '#fde8e8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <s.icon size={20} color="#8B0000" />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#8B0000', fontFamily: 'Montserrat,sans-serif' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: '#777', fontWeight: 500, fontFamily: 'Montserrat,sans-serif' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== DROITE ===== */}
        <div style={{ position: 'relative', height: 420 }}>

          {/* Image principale */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: 12, overflow: 'hidden' }}>
            <Image
              src="/images/generated/about-hero.jpg"
              alt="Agent Zoro Group SARL devant chantier"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
              unoptimized
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
          </div>

          {/* Badge Zoro Group */}
          <div style={{ position: 'absolute', bottom: 16, left: 16, background: '#B8952A', padding: '10px 14px', borderRadius: 6, zIndex: 10 }}>
            <div style={{ color: 'white', fontSize: 11, fontWeight: 800, letterSpacing: 0.5, fontFamily: 'Montserrat,sans-serif' }}>ZORO GROUP SARL</div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 9, fontWeight: 500, marginTop: 2, fontFamily: 'Montserrat,sans-serif' }}>Votre partenaire de confiance</div>
          </div>


        </div>
      </div>
    </section>
  )
}

export function ServiceBar() {
  const items = [
    { icon: '🏗️', titre: 'Construction', sub: 'Bâtiments modernes' },
    { icon: '🏠', titre: 'Vente & Location', sub: 'Maisons, terrains' },
    { icon: '📋', titre: 'Gestion', sub: 'Suivi & valorisation' },
    { icon: '🔨', titre: 'Rénovation', sub: 'Travaux de qualité' },
  ]
  return (
    <div style={{ background: '#8B0000' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '0 24px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderRight: i < 3 ? '0.5px solid rgba(255,255,255,0.15)' : 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <div>
              <div style={{ color: 'white', fontSize: 12, fontWeight: 700, fontFamily: 'Montserrat,sans-serif' }}>{item.titre}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, fontFamily: 'Montserrat,sans-serif' }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}