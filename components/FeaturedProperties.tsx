import Link from 'next/link'
import { IconMapPin, IconRuler2, IconBed, IconBath, IconCertificate } from '@tabler/icons-react'

const properties = [
  {
    id: 1,
    badge: 'VENTE',
    badgeColor: '#8B0000',
    featured: true,
    title: 'Villa Moderne F5',
    location: 'Quartier Lac, San Pedro',
    surface: '250 m²',
    bedrooms: '4 ch.',
    bathrooms: '3 sdb.',
    price: '85 000 000 FCFA',
    gradient: 'linear-gradient(135deg, #8B0000, #C0392B)',
  },
  {
    id: 2,
    badge: 'LOCATION',
    badgeColor: '#B8952A',
    featured: false,
    title: 'Appartement F3 Meublé',
    location: 'Centre-ville, San Pedro',
    surface: '80 m²',
    bedrooms: '2 ch.',
    bathrooms: '2 sdb.',
    price: '350 000 FCFA/mois',
    gradient: 'linear-gradient(135deg, #B8952A, #8B6914)',
  },
  {
    id: 3,
    badge: 'TERRAIN',
    badgeColor: '#5a3e28',
    featured: false,
    title: 'Terrain Viabilisé',
    location: 'Zone Résidentielle, SP',
    surface: '500 m²',
    terrain: true,
    price: '12 500 000 FCFA',
    gradient: 'linear-gradient(135deg, #5a3e28, #8B5e3c)',
  },
]

export default function FeaturedProperties() {
  return (
    <section style={{ padding: '0 24px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <span style={{ display: 'inline-block', background: '#fde8e8', color: '#8B0000', fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 3, marginBottom: 6, fontFamily: 'Montserrat,sans-serif' }}>CATALOGUE</span>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>Biens en Vedette</h2>
            <div style={{ width: 40, height: 3, background: '#C0392B', marginTop: 6, borderRadius: 2 }} />
          </div>
          <Link href="/catalogue" style={{ background: 'transparent', color: '#C0392B', border: '1.5px solid #C0392B', padding: '9px 20px', borderRadius: 4, fontSize: 11, fontWeight: 500, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
            Voir tout →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {properties.map(p => (
            <div key={p.id} style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
              {/* Image area */}
              <div style={{ height: 130, background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ fontSize: 44, opacity: 0.3, color: 'white' }}>🏠</div>
                <div style={{ position: 'absolute', top: 10, left: 10, background: p.badgeColor, color: 'white', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontWeight: 600, letterSpacing: 0.5, fontFamily: 'Montserrat,sans-serif' }}>{p.badge}</div>
                {p.featured && (
                  <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', color: '#B8952A', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontFamily: 'Montserrat,sans-serif' }}>★ Coup de cœur</div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Montserrat,sans-serif' }}>{p.title}</h3>
                <p style={{ fontSize: 11, color: '#666', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}>
                  <IconMapPin size={11} /> {p.location}
                </p>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: '0.5px solid #f0f0f0' }}>
                  <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconRuler2 size={11} /> {p.surface}</span>
                  {p.bedrooms && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconBed size={11} /> {p.bedrooms}</span>}
                  {p.bathrooms && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconBath size={11} /> {p.bathrooms}</span>}
                  {p.terrain && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconCertificate size={11} /> Titre foncier</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#8B0000', fontFamily: 'Montserrat,sans-serif' }}>{p.price}</span>
                  <Link href={`/catalogue/${p.id}`} style={{ background: '#8B0000', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 4, fontSize: 10, fontWeight: 600, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
                    Détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
