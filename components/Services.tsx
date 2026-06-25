import { IconBuilding, IconHome, IconClipboardList, IconPaint } from '@tabler/icons-react'

const services = [
  { icon: IconBuilding, title: 'Construction', desc: 'Bâtiments modernes et durables', accent: '#8B0000', bg: '#fde8e8' },
  { icon: IconHome, title: 'Vente & Location', desc: 'Maisons, appartements, terrains', accent: '#B8952A', bg: '#fdf3de' },
  { icon: IconClipboardList, title: 'Gestion Immobilière', desc: 'Suivi, entretien, valorisation', accent: '#8B0000', bg: '#fde8e8' },
  { icon: IconPaint, title: 'Aménagement & Rénovation', desc: 'Travaux de qualité', accent: '#B8952A', bg: '#fdf3de' },
]

export default function Services() {
  return (
    <section style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ display: 'inline-block', background: '#fde8e8', color: '#8B0000', fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 3, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>NOS EXPERTISES</span>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>Nos Domaines d'Activité</h2>
          <div style={{ width: 40, height: 3, background: '#C0392B', margin: '10px auto 0', borderRadius: 2 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          {services.map((s, i) => (
            <div key={i} style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, padding: '20px 16px', textAlign: 'center', borderTop: `3px solid ${s.accent}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
              <div style={{ width: 44, height: 44, background: s.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <s.icon size={20} color={s.accent} />
              </div>
              <h3 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', marginBottom: 6, fontFamily: 'Montserrat,sans-serif' }}>{s.title}</h3>
              <p style={{ fontSize: 11, color: '#666', lineHeight: 1.5, fontFamily: 'Montserrat,sans-serif' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
