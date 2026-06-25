import Link from 'next/link'
import { IconMail, IconBrandWhatsapp } from '@tabler/icons-react'

export default function ContactBanner() {
  return (
    <section style={{ background: '#8B0000', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <h2 style={{ color: 'white', fontSize: 20, fontWeight: 600, marginBottom: 6, fontFamily: 'Montserrat,sans-serif' }}>Vous avez un projet immobilier ?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'Montserrat,sans-serif' }}>Notre équipe est disponible 24h/24 pour vous accompagner.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/contact" style={{ background: '#B8952A', color: 'white', border: 'none', padding: '11px 22px', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Montserrat,sans-serif' }}>
            <IconMail size={15} />
            Nous écrire
          </Link>
          <a href="https://wa.me/2250505020556" target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: 'white', border: 'none', padding: '11px 22px', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Montserrat,sans-serif' }}>
            <IconBrandWhatsapp size={15} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
