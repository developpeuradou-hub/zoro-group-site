const testimonials = [
  {
    initials: 'KA',
    name: 'Koné Arouna',
    role: 'Client – Construction',
    text: '"Équipe très professionnelle, livraison dans les délais. Je recommande vivement Zoro Group pour tout projet de construction."',
  },
  {
    initials: 'DT',
    name: 'Diabaté Tiéba',
    role: 'Client – Achat immobilier',
    text: '"Grâce à Zoro Group, j\'ai trouvé la maison de mes rêves à San Pedro. Service impeccable du début à la fin."',
  },
  {
    initials: 'OB',
    name: 'Ouattara Bakary',
    role: 'Investisseur – Gestion',
    text: '"Partenaire fiable pour la gestion de mon portefeuille immobilier. Réactifs et très à l\'écoute."',
  },
]

export default function Testimonials() {
  return (
    <section style={{ padding: '36px 24px', background: '#F5F5F5', borderTop: '0.5px solid #e8e8e8', borderBottom: '0.5px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{ display: 'inline-block', background: '#fde8e8', color: '#8B0000', fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 3, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>CONFIANCE</span>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>Ce que disent nos clients</h2>
          <div style={{ width: 40, height: 3, background: '#C0392B', margin: '10px auto 0', borderRadius: 2 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, padding: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ color: '#B8952A', fontSize: 16, marginBottom: 10, letterSpacing: 2 }}>★★★★★</div>
              <p style={{ fontSize: 12, color: '#666', lineHeight: 1.7, marginBottom: 14, fontStyle: 'italic', fontFamily: 'Montserrat,sans-serif' }}>{t.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fde8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#8B0000', flexShrink: 0, fontFamily: 'Montserrat,sans-serif' }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>{t.name}</div>
                  <div style={{ fontSize: 10, color: '#999', fontFamily: 'Montserrat,sans-serif' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
