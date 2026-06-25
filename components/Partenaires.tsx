import Image from 'next/image'

const partenaires = [
  { nom: 'Quincaillerie Victoire', logo: '/images/partenaires/quincaillerie-victoire.jpg' },
  { nom: 'Séna Immobilier', logo: '/images/partenaires/sena-immobilier.jpg' },
  { nom: 'GBTP', logo: '/images/partenaires/gbtp.jpg' },
  { nom: 'Koira BTP SA', logo: '/images/partenaires/koira-btp.png' },
  { nom: 'Colas', logo: '/images/partenaires/colas.png' },
  { nom: 'BNETD', logo: '/images/partenaires/bnetd.jpg' },
  { nom: 'AGEROUTE', logo: '/images/partenaires/ageroute.jpg' },
  { nom: 'CCI Côte d\'Ivoire', logo: '/images/partenaires/cci-cote-ivoire.png' },
  { nom: 'Eden Roc Ivoire', logo: '/images/partenaires/eden-roc-ivoire.png' },
]

export default function Partenaires() {
  return (
    <section style={{ padding: '36px 24px', background: '#F5F5F5', borderTop: '0.5px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Titre */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 20, height: 1, background: '#C0392B' }} />
            <span style={{ color: '#C0392B', fontSize: 10, fontWeight: 600, letterSpacing: 2, fontFamily: 'Montserrat,sans-serif' }}>ILS NOUS FONT CONFIANCE</span>
            <div style={{ width: 20, height: 1, background: '#C0392B' }} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>Nos Partenaires</h2>
        </div>

        {/* Logos */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
          {partenaires.map((p, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                border: '0.5px solid #e8e8e8',
                borderRadius: 8,
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 150,
                height: 80,
                position: 'relative',
                transition: 'box-shadow 0.2s',
              }}
              title={p.nom}
            >
              <Image
                src={p.logo}
                alt={p.nom}
                fill
                style={{ objectFit: 'contain', padding: '10px 14px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
