import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#3a0000' }}>
      <div className='footer-grid' style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #B8952A' }}>
              <Image src="/images/logo.png" alt="Zoro Group SARL" width={36} height={36} style={{ objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1, fontFamily: 'Montserrat,sans-serif' }}>ZORO GROUP</div>
              <div style={{ color: '#B8952A', fontSize: 9, letterSpacing: 2, fontFamily: 'Montserrat,sans-serif' }}>SARL</div>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.7, fontFamily: 'Montserrat,sans-serif' }}>
            Bâtir l'avenir des leaders.<br />San Pedro, Côte d'Ivoire.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#B8952A', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, marginBottom: 14, fontFamily: 'Montserrat,sans-serif' }}>SERVICES</h4>
          {['Construction', 'Vente & Location', 'Gestion Immobilière', 'Aménagement & Rénovation'].map(s => (
            <Link key={s} href="/services" style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 8, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>{s}</Link>
          ))}
        </div>

        <div>
          <h4 style={{ color: '#B8952A', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, marginBottom: 14, fontFamily: 'Montserrat,sans-serif' }}>NAVIGATION</h4>
          {[['/', 'Accueil'], ['/catalogue', 'Catalogue'], ['/realisations', 'Réalisations'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 8, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>{label}</Link>
          ))}
        </div>

        <div>
          <h4 style={{ color: '#B8952A', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, marginBottom: 14, fontFamily: 'Montserrat,sans-serif' }}>CONTACT</h4>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.8, fontFamily: 'Montserrat,sans-serif' }}>
            San Pedro 01 BP 2383<br />Quartier Lac, Côte d'Ivoire<br /><br />
            <a href="tel:+2250505020556" style={{ color: '#B8952A', textDecoration: 'none' }}>+225 0505020556</a><br />
            <a href="mailto:groupzorosarl01@gmail.com" style={{ color: '#B8952A', textDecoration: 'none' }}>groupzorosarl01@gmail.com</a>
          </p>
        </div>
      </div>

      <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, maxWidth: 1200, margin: '0 auto' }}>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Montserrat,sans-serif' }}>© 2026 Zoro Group SARL. Tous droits réservés.</span>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Mentions légales', 'Confidentialité'].map(l => (
            <Link key={l} href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
