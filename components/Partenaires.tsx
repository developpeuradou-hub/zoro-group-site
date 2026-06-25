import Image from 'next/image'

const partenaires = [
  { nom: 'Quincaillerie Victoire', logo: '/images/partenaires/quincaillerie-victoire.jpg' },
  { nom: 'Séna Immobilier', logo: '/images/partenaires/sena-immobilier.jpg' },
  { nom: 'GBTP', logo: '/images/partenaires/gbtp.jpg' },
  { nom: 'Koira BTP SA', logo: '/images/partenaires/koira-btp.png' },
  { nom: 'Colas', logo: '/images/partenaires/colas.png' },
  { nom: 'BNETD', logo: '/images/partenaires/bnetd.jpg' },
  { nom: 'AGEROUTE', logo: '/images/partenaires/ageroute.jpg' },
  { nom: "CCI Côte d'Ivoire", logo: '/images/partenaires/cci-cote-ivoire.png' },
  { nom: 'Eden Roc Ivoire', logo: '/images/partenaires/eden-roc-ivoire.png' },
]

export default function Partenaires() {
  return (
    <section style={{ padding: '36px 16px', background: '#F5F5F5', borderTop: '0.5px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 20, height: 1, background: '#C0392B' }} />
            <span style={{ color: '#C0392B', fontSize: 10, fontWeight: 600, letterSpacing: 2, fontFamily: 'Montserrat,sans-serif' }}>ILS NOUS FONT CONFIANCE</span>
            <div style={{ width: 20, height: 1, background: '#C0392B' }} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>Nos Partenaires</h2>
        </div>

        {/* Grille responsive */}
        <div className="partenaires-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
          {partenaires.map((p, i) => (
            <div key={i} style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 130, height: 72, position: 'relative' }} title={p.nom}>
              <Image src={p.logo} alt={p.nom} fill style={{ objectFit: 'contain', padding: '8px 12px' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
