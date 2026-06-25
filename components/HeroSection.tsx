import { IconBuilding, IconAward, IconUsers, IconHome, IconClipboardList, IconPaint } from '@tabler/icons-react'
import Link from 'next/link'
import Image from 'next/image'


export default function HeroSection() {
  return (
    <section style={{ background: 'white', padding: '36px 16px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.025, fontSize: 200, fontWeight: 800, color: '#8B0000', pointerEvents: 'none', fontFamily: 'Montserrat,sans-serif', userSelect: 'none' }}>BTP</div>

      <div className="hero-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 460px', gap: 40, alignItems: 'center', position: 'relative' }}>

        {/* Gauche */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: '#8B0000', flexShrink: 0 }} />
            <span style={{ color: '#8B0000', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'Montserrat,sans-serif' }}>BTP & Immobilier — San Pedro</span>
          </div>

          <h1 className="hero-title" style={{ fontSize: 38, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.12, marginBottom: 16, letterSpacing: -1.5, fontFamily: 'Montserrat,sans-serif' }}>
            Ensemble,<br />
            bâtissons<br />
            <span style={{ color: '#8B0000' }}>l'avenir des</span><br />
            leaders.
          </h1>

          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.85, marginBottom: 24, fontFamily: 'Montserrat,sans-serif' }}>
            ZORO GROUP SARL, votre partenaire BTP et immobilier à San Pedro. Construction, rénovation, vente et gestion de biens — qualité et engagement sans compromis.
          </p>

          <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#8B0000', color: 'white', padding: '12px 24px', borderRadius: 4, fontSize: 13, fontWeight: 700, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif', display: 'inline-block' }}>
              Demander un devis
            </Link>
            <Link href="/realisations" style={{ background: 'transparent', color: '#1a1a1a', border: '1.5px solid #ddd', padding: '11px 20px', borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif', display: 'inline-block' }}>
              Nos réalisations
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: 'flex', gap: 20, paddingTop: 20, borderTop: '0.5px solid #eee', flexWrap: 'wrap' }}>
            {[
              { icon: IconBuilding, value: '50+', label: 'Projets livrés' },
              { icon: IconAward, value: '5+', label: "Ans d'expérience" },
              { icon: IconUsers, value: '100%', label: 'Satisfaction' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 36, height: 36, background: '#fde8e8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <s.icon size={18} color="#8B0000" />
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#8B0000', fontFamily: 'Montserrat,sans-serif' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: '#777', fontWeight: 500, fontFamily: 'Montserrat,sans-serif' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Droite */}
        <div className="hero-image-col" style={{ position: 'relative', height: 420 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', height: '100%', position: 'relative' }}>
            <Image src="/images/generated/about-hero.jpg" alt="Agent Zoro Group SARL devant chantier" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} priority unoptimized />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 16, left: 16, background: '#B8952A', padding: '10px 14px', borderRadius: 6, zIndex: 10 }}>
              <div style={{ color: 'white', fontSize: 11, fontWeight: 800, letterSpacing: 0.5, fontFamily: 'Montserrat,sans-serif' }}>ZORO GROUP SARL</div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 9, fontWeight: 500, marginTop: 2, fontFamily: 'Montserrat,sans-serif' }}>Votre partenaire de confiance</div>
            </div>
          </div>

          <div style={{ position: 'absolute', top: 24, left: -16, background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, padding: '12px 16px', textAlign: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.1)', zIndex: 20 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#8B0000', fontFamily: 'Montserrat,sans-serif' }}>50+</div>
            <div style={{ fontSize: 9, color: '#777', fontWeight: 500, lineHeight: 1.4, fontFamily: 'Montserrat,sans-serif' }}>Projets<br />livrés</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServiceBar() {
  const items = [
    { Icon: IconBuilding, titre: 'Construction', sub: 'Bâtiments modernes' },
    { Icon: IconHome, titre: 'Vente & Location', sub: 'Maisons, terrains' },
    { Icon: IconClipboardList, titre: 'Gestion', sub: 'Suivi & valorisation' },
    { Icon: IconPaint, titre: 'Rénovation', sub: 'Travaux de qualité' },
  ]
  return (
    <div style={{ background: '#8B0000' }}>
      <div className="service-bar-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '0 16px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '14px 12px', display: 'flex', alignItems: 'center', gap: 10, borderRight: i < 3 ? '0.5px solid rgba(255,255,255,0.15)' : 'none', cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <item.Icon size={18} color="#B8952A" />
            </div>
            <div>
              <div style={{ color: 'white', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat,sans-serif' }}>{item.titre}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 9, fontFamily: 'Montserrat,sans-serif' }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
