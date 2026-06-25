import Link from 'next/link'
import Image from 'next/image'

const stats = [
  { value: '50+', label: 'Projets livrés' },
  { value: '5+', label: "Ans d'expérience" },
  { value: '100%', label: 'Satisfaction client' },
]

export default function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: 480 }}>
      {/* Image de fond */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src="/images/hero-chantier.jpg"
          alt="Chantier Zoro Group SARL"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        {/* Overlay gradient bordeaux */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(139,0,0,0.88) 0%, rgba(107,0,0,0.82) 50%, rgba(58,0,0,0.75) 100%)' }} />
      </div>

      {/* Panneau doré à droite */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', background: 'rgba(184,149,42,0.08)', clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }} aria-hidden="true" />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 24px', position: 'relative' }}>
        <div style={{ maxWidth: '55%' }}>
          <div style={{ display: 'inline-block', background: 'rgba(184,149,42,0.2)', color: '#B8952A', fontSize: 10, fontWeight: 500, padding: '4px 12px', borderRadius: 2, letterSpacing: 1, marginBottom: 14, border: '0.5px solid rgba(184,149,42,0.4)', fontFamily: 'Montserrat,sans-serif' }}>
            ★ BÂTIR L'AVENIR DES LEADERS
          </div>

          <h1 style={{ color: 'white', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 600, lineHeight: 1.3, marginBottom: 14, fontFamily: 'Montserrat,sans-serif' }}>
            Votre Partenaire<br />
            <span style={{ color: '#B8952A' }}>Immobilier de Confiance</span><br />
            en Côte d'Ivoire
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.7, marginBottom: 24, maxWidth: 400, fontFamily: 'Montserrat,sans-serif' }}>
            Construction, vente, location et gestion de biens immobiliers à San Pedro et au-delà. Qualité, expertise et engagement.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/catalogue" style={{ background: '#B8952A', color: 'white', padding: '11px 24px', borderRadius: 4, fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif', display: 'inline-block' }}>
              Voir nos biens →
            </Link>
            <Link href="/services" style={{ background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.5)', padding: '10px 20px', borderRadius: 4, fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif', display: 'inline-block' }}>
              Nos services
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 24, marginTop: 32, paddingTop: 24, borderTop: '0.5px solid rgba(255,255,255,0.15)' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#B8952A', fontSize: 22, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>{s.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 2, fontFamily: 'Montserrat,sans-serif' }}>{s.label}</div>
                </div>
                {i < stats.length - 1 && <div style={{ width: 0.5, height: 36, background: 'rgba(255,255,255,0.2)' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}