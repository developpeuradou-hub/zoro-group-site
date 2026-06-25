import Image from 'next/image'
import BrandedImage from '@/components/BrandedImage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ContactForm from './ContactForm'
import { IconMapPin, IconPhone, IconMail, IconBrandWhatsapp, IconClock, IconExternalLink } from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Zoro Group SARL',
  description: "Contactez Zoro Group SARL pour tous vos projets immobiliers à San Pedro. Disponible 24h/24 par téléphone, email ou WhatsApp.",
}

const coordonnees = [
  {
    icon: IconMapPin,
    titre: 'Adresse',
    contenu: 'San Pedro 01 BP 2383\nQuartier Lac, Côte d\'Ivoire',
    lien: null,
    color: '#8B0000',
    bg: '#fde8e8',
  },
  {
    icon: IconPhone,
    titre: 'Téléphone',
    contenu: '+225 05 05 02 05 56',
    lien: 'tel:+2250505020556',
    color: '#8B0000',
    bg: '#fde8e8',
  },
  {
    icon: IconMail,
    titre: 'Email',
    contenu: 'groupzorosarl01@gmail.com',
    lien: 'mailto:groupzorosarl01@gmail.com',
    color: '#8B0000',
    bg: '#fde8e8',
  },
  {
    icon: IconBrandWhatsapp,
    titre: 'WhatsApp',
    contenu: '+225 05 05 02 05 56',
    lien: 'https://wa.me/2250505020556',
    color: '#25D366',
    bg: '#e8f5e9',
  },
]

const horaires = [
  { jour: 'Lundi — Vendredi', heures: '08h00 — 18h00' },
  { jour: 'Samedi', heures: '08h00 — 14h00' },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <div style={{ background: 'linear-gradient(135deg, #8B0000, #6b0000)', padding: '36px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'rgba(184,149,42,0.07)', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
          {/* Logo watermark */}
          <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.4)', padding: '6px 12px', borderRadius: 6, backdropFilter: 'blur(4px)' }}>
            <Image src="/images/logo.png" alt="Zoro Group" width={28} height={28} style={{ objectFit: 'contain', borderRadius: '50%', background: 'white', padding: 2 }} />
            <div>
              <div style={{ color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: 1, fontFamily: 'Montserrat,sans-serif' }}>ZORO GROUP SARL</div>
              <div style={{ color: '#B8952A', fontSize: 8, letterSpacing: 0.5, fontFamily: 'Montserrat,sans-serif' }}>BÂTIR L'AVENIR DES LEADERS</div>
            </div>
          </div>
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>ACCUEIL / CONTACT</div>
            <h1 style={{ color: 'white', fontSize: 24, fontWeight: 600, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>Contactez-nous</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.7, fontFamily: 'Montserrat,sans-serif' }}>
              Notre équipe est disponible 24h/24 pour répondre à vos questions et vous accompagner dans vos projets.
            </p>
          </div>
        </div>

        {/* CONTENU */}
        <div style={{ padding: '36px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28, alignItems: 'start' }}>

            {/* FORMULAIRE (client component) */}
            <ContactForm />

            {/* INFOS DROITE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Coordonnées */}
              <div style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ background: '#8B0000', padding: '16px 20px' }}>
                  <div style={{ color: 'white', fontSize: 13, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>Nos coordonnées</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2, fontFamily: 'Montserrat,sans-serif' }}>Disponible 24h/24, 7j/7</div>
                </div>
                <div style={{ padding: '4px 20px 8px' }}>
                  {coordonnees.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 0', borderBottom: i < coordonnees.length - 1 ? '0.5px solid #f0f0f0' : 'none' }}>
                      <div style={{ width: 34, height: 34, background: c.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <c.icon size={16} color={c.color} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a', marginBottom: 2, fontFamily: 'Montserrat,sans-serif' }}>{c.titre}</div>
                        {c.lien ? (
                          <a href={c.lien} target={c.lien.startsWith('http') ? '_blank' : undefined} rel={c.lien.startsWith('http') ? 'noopener noreferrer' : undefined}
                            style={{ fontSize: 11, color: c.color, textDecoration: 'none', fontWeight: 500, fontFamily: 'Montserrat,sans-serif' }}>
                            {c.contenu}
                          </a>
                        ) : (
                          <div style={{ fontSize: 11, color: '#666', lineHeight: 1.6, fontFamily: 'Montserrat,sans-serif', whiteSpace: 'pre-line' }}>{c.contenu}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Horaires */}
              <div style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, padding: '18px 20px' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Montserrat,sans-serif' }}>
                  <IconClock size={15} color="#8B0000" />
                  Horaires d'ouverture
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {horaires.map((h, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#666', fontFamily: 'Montserrat,sans-serif' }}>{h.jour}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>{h.heures}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '0.5px solid #f0f0f0' }}>
                    <span style={{ fontSize: 11, color: '#666', fontFamily: 'Montserrat,sans-serif' }}>Urgences</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#25D366', fontFamily: 'Montserrat,sans-serif' }}>24h/24 via WhatsApp</span>
                  </div>
                </div>
              </div>

              {/* Google Maps placeholder */}
              <div style={{ background: '#f0f0f0', borderRadius: 10, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, border: '0.5px solid #e8e8e8' }}>
                <IconMapPin size={28} color="#aaa" />
                <span style={{ fontSize: 11, color: '#999', fontWeight: 500, fontFamily: 'Montserrat,sans-serif' }}>Quartier Lac, San Pedro</span>
                <a
                  href="https://maps.google.com/?q=San+Pedro+Côte+d'Ivoire"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 11, color: '#8B0000', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}
                >
                  <IconExternalLink size={12} /> Voir sur Google Maps
                </a>
              </div>

            </div>
          </div>
        </div>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}