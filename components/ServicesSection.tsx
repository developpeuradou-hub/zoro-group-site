import Link from 'next/link'
import Image from 'next/image'
import { IconArrowRight } from '@tabler/icons-react'

const services = [
  {
    num: '01',
    titre: 'Construction',
    desc: 'Bâtiments résidentiels, commerciaux et industriels de qualité.',
    image: '/images/generated/service-construction.jpg',
    href: '/services',
    accent: '#8B0000',
    bg: '#fde8e8',
  },
  {
    num: '02',
    titre: 'Vente & Location',
    desc: 'Maisons, appartements et terrains viabilisés à San Pedro.',
    image: '/images/generated/service-vente.jpg',
    href: '/catalogue',
    accent: '#B8952A',
    bg: '#fdf3de',
  },
  {
    num: '03',
    titre: 'Gestion Immobilière',
    desc: 'Suivi, entretien et valorisation de votre patrimoine.',
    image: '/images/generated/service-gestion.jpg',
    href: '/services',
    accent: '#8B0000',
    bg: '#fde8e8',
  },
  {
    num: '04',
    titre: 'Rénovation',
    desc: 'Aménagement intérieur et réhabilitation de qualité.',
    image: '/images/generated/service-renovation.jpg',
    href: '/services',
    accent: '#B8952A',
    bg: '#fdf3de',
  },
]

export default function ServicesSection() {
  return (
    <section style={{ padding: '56px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Titre */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 24, height: 2, background: '#8B0000' }} />
            <span style={{ color: '#8B0000', fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', fontFamily: 'Montserrat,sans-serif' }}>Nos Expertises</span>
            <div style={{ width: 24, height: 2, background: '#8B0000' }} />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: -0.5, fontFamily: 'Montserrat,sans-serif' }}>Nos Domaines d'Activité</h2>
        </div>

        {/* Grille 4 cartes */}
        <div className='grid-auto' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {services.map((s, i) => (
            <div key={i} style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, overflow: 'hidden', borderLeft: `3px solid ${s.accent}` }}>
              {/* Image */}
              <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
                <Image src={s.image} alt={s.titre} fill style={{ objectFit: 'cover' }} unoptimized />
                {/* Overlay avec numéro */}
                <div style={{ position: 'absolute', top: 12, left: 12, background: s.accent, color: 'white', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 4, fontFamily: 'Montserrat,sans-serif' }}>
                  {s.num}
                </div>
              </div>
              {/* Contenu */}
              <div style={{ padding: '18px 16px' }}>
                <div style={{ width: 36, height: 36, background: s.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: s.accent, fontFamily: 'Montserrat,sans-serif' }}>{s.num}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>{s.titre}</h3>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: 14, fontFamily: 'Montserrat,sans-serif' }}>{s.desc}</p>
                <Link href={s.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: s.accent, fontSize: 12, fontWeight: 700, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
                  En savoir plus <IconArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
