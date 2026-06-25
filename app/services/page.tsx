import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ContactBanner from '@/components/ContactBanner'
import Link from 'next/link'
import { IconBuilding, IconHome, IconClipboardList, IconPaint, IconCheck, IconArrowRight, IconClock24, IconMedal, IconShieldCheck, IconUsers } from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Services — Zoro Group SARL',
  description: 'Construction, vente & location, gestion immobilière et rénovation. Zoro Group SARL vous accompagne sur tous vos projets immobiliers à San Pedro.',
}

const services = [
  {
    id: 'construction',
    num: '01',
    icon: IconBuilding,
    titre: 'Construction de Bâtiments',
    label: 'CONSTRUCTION',
    desc: 'Nous concevons et réalisons des bâtiments modernes et durables, adaptés à vos besoins résidentiels ou commerciaux.',
    gradient: 'linear-gradient(135deg, #8B0000, #6b0000)',
    image: '/images/generated/service-construction.jpg',
    accentColor: '#B8952A',
    checkColor: '#8B0000',
    checkBg: '#fde8e8',
    prestations: [
      { titre: 'Construction clé en main', desc: 'Villas, immeubles, bureaux, entrepôts' },
      { titre: 'Plans architecturaux 2D/3D', desc: 'Conception, rendu et visualisation' },
      { titre: 'Suivi de chantier', desc: 'Coordination et contrôle qualité' },
      { titre: 'Électricité & plomberie', desc: 'Installation et mise aux normes' },
    ],
    cta: 'Demander un devis',
    ctaHref: '/contact',
    layout: 'left',
  },
  {
    id: 'vente-location',
    num: '02',
    icon: IconHome,
    titre: 'Vente & Location Immobilière',
    label: 'VENTE & LOCATION',
    desc: 'Trouvez le bien idéal parmi notre catalogue ou confiez-nous votre bien à vendre ou à louer. Nous gérons tout.',
    gradient: 'linear-gradient(135deg, #6b4a00, #B8952A)',
    image: '/images/generated/service-vente.jpg',
    accentColor: '#ffffff',
    checkColor: '#B8952A',
    checkBg: '#fdf3de',
    prestations: [
      { titre: 'Vente de villas et appartements', desc: 'Biens résidentiels toutes gammes' },
      { titre: 'Vente de terrains', desc: 'Viabilisés, titre foncier garanti' },
      { titre: 'Location meublée & non meublée', desc: 'Courte et longue durée' },
      { titre: 'Accompagnement juridique', desc: 'Rédaction contrats, actes notariés' },
    ],
    cta: 'Voir le catalogue',
    ctaHref: '/catalogue',
    layout: 'right',
  },
]

const smallServices = [
  {
    id: 'gestion',
    num: '03',
    icon: IconClipboardList,
    titre: 'Gestion Immobilière',
    label: 'GESTION',
    desc: 'Confiez-nous la gestion de votre patrimoine immobilier. Nous maximisons vos revenus locatifs.',
    gradient: 'linear-gradient(135deg, #1a3a5c, #2c5f8a)',
    image: '/images/generated/service-gestion.jpg',
    prestations: ['Encaissement des loyers', 'Entretien et maintenance', 'Gestion des locataires', 'Rapport mensuel propriétaire'],
  },
  {
    id: 'renovation',
    num: '04',
    icon: IconPaint,
    titre: 'Aménagement & Rénovation',
    label: 'RÉNOVATION',
    desc: 'Transformez votre espace avec nos équipes spécialisées. Qualité des matériaux et respect des délais.',
    gradient: 'linear-gradient(135deg, #2d5a27, #4a8f42)',
    image: '/images/generated/service-renovation.jpg',
    prestations: ['Rénovation complète intérieure', 'Pose de placoplatre (placo)', 'Sol résine époxy', 'Sécurité électronique'],
  },
]

const atouts = [
  { icon: IconClock24, titre: 'Disponible 24h/24', desc: 'Toujours joignable pour vos urgences' },
  { icon: IconMedal, titre: 'Expertise locale', desc: "5+ ans d'expérience à San Pedro" },
  { icon: IconShieldCheck, titre: 'Transparence totale', desc: 'Devis détaillés, pas de frais cachés' },
  { icon: IconUsers, titre: 'Équipe dédiée', desc: 'Architectes, ingénieurs, agents certifiés' },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <div style={{ background: 'linear-gradient(135deg, #8B0000, #6b0000)', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'rgba(184,149,42,0.07)', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
          <Image src="/images/generated/service-construction.jpg" alt="Services Zoro Group" fill style={{ objectFit: 'cover', opacity: 0.15, position: 'absolute' }} unoptimized />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>ACCUEIL / NOS SERVICES</div>
            <h1 style={{ color: 'white', fontSize: 26, fontWeight: 700, marginBottom: 10, fontFamily: 'Montserrat,sans-serif' }}>Nos Services</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, maxWidth: 500, lineHeight: 1.7, marginBottom: 28, fontFamily: 'Montserrat,sans-serif' }}>
              Zoro Group SARL vous accompagne sur l'ensemble de vos projets immobiliers, de la conception à la livraison, avec expertise et engagement.
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              {[{ v: '50+', l: 'Projets livrés' }, { v: '24h/24', l: 'Disponibilité' }, { v: '5+', l: "Ans d'expérience" }].map((s, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#B8952A', fontSize: 20, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>{s.v}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, marginTop: 2, fontFamily: 'Montserrat,sans-serif' }}>{s.l}</div>
                  </div>
                  {i < arr.length - 1 && <div style={{ width: 0.5, height: 32, background: 'rgba(255,255,255,0.15)' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INTRO */}
        <div style={{ padding: '36px 24px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 20, height: 1, background: '#C0392B' }} />
            <span style={{ color: '#C0392B', fontSize: 10, fontWeight: 600, letterSpacing: 2, fontFamily: 'Montserrat,sans-serif' }}>NOS EXPERTISES</span>
            <div style={{ width: 20, height: 1, background: '#C0392B' }} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 10, fontFamily: 'Montserrat,sans-serif' }}>4 Domaines d'Activité</h2>
          <p style={{ fontSize: 13, color: '#666', maxWidth: 560, margin: '0 auto', lineHeight: 1.7, fontFamily: 'Montserrat,sans-serif' }}>
            De la construction neuve à la rénovation, en passant par la vente, la location et la gestion immobilière — une offre complète pour tous vos besoins.
          </p>
        </div>

        {/* GRANDS SERVICES */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {services.map((s) => (
            <div key={s.id} style={{ border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

                {s.layout === 'left' && (
                  <div style={{ background: s.gradient, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', minHeight: 260 }}>
                    {/* Image en fond */}
                    <Image src={s.image} alt={s.titre} fill style={{ objectFit: 'cover', opacity: 0.25 }} unoptimized />
                    {/* Contenu par-dessus */}
                    <div style={{ position: 'relative', zIndex: 1, padding: 32, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                          <s.icon size={22} color="white" />
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, marginBottom: 6, fontFamily: 'Montserrat,sans-serif' }}>{s.num} — {s.label}</div>
                        <h3 style={{ color: 'white', fontSize: 18, fontWeight: 700, marginBottom: 12, lineHeight: 1.3, fontFamily: 'Montserrat,sans-serif' }}>{s.titre}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, lineHeight: 1.8, fontFamily: 'Montserrat,sans-serif' }}>{s.desc}</p>
                      </div>
                      <Link href={s.ctaHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: s.accentColor, fontSize: 12, fontWeight: 600, textDecoration: 'none', marginTop: 20, fontFamily: 'Montserrat,sans-serif' }}>
                        {s.cta} <IconArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Prestations */}
                <div style={{ padding: 28, background: 'white' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginBottom: 14, fontFamily: 'Montserrat,sans-serif' }}>Ce que nous proposons :</div>
                  {s.prestations.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: i < s.prestations.length - 1 ? '0.5px solid #f0f0f0' : 'none' }}>
                      <div style={{ width: 20, height: 20, background: s.checkBg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <IconCheck size={11} color={s.checkColor} />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>{p.titre}</div>
                        <div style={{ fontSize: 11, color: '#666', marginTop: 2, fontFamily: 'Montserrat,sans-serif' }}>{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {s.layout === 'right' && (
                  <div style={{ background: s.gradient, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', minHeight: 260 }}>
                    <Image src={s.image} alt={s.titre} fill style={{ objectFit: 'cover', opacity: 0.3 }} unoptimized />
                    <div style={{ position: 'relative', zIndex: 1, padding: 32, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                          <s.icon size={22} color="white" />
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, marginBottom: 6, fontFamily: 'Montserrat,sans-serif' }}>{s.num} — {s.label}</div>
                        <h3 style={{ color: 'white', fontSize: 18, fontWeight: 700, marginBottom: 12, lineHeight: 1.3, fontFamily: 'Montserrat,sans-serif' }}>{s.titre}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, lineHeight: 1.8, fontFamily: 'Montserrat,sans-serif' }}>{s.desc}</p>
                      </div>
                      <Link href={s.ctaHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: s.accentColor, fontSize: 12, fontWeight: 600, textDecoration: 'none', marginTop: 20, fontFamily: 'Montserrat,sans-serif' }}>
                        {s.cta} <IconArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

        {/* PETITS SERVICES (Gestion + Rénovation) */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {smallServices.map((s) => (
            <div key={s.id} style={{ border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden' }}>
              {/* Image header */}
              <div style={{ height: 180, background: s.gradient, position: 'relative', overflow: 'hidden' }}>
                <Image src={s.image} alt={s.titre} fill style={{ objectFit: 'cover', opacity: 0.45 }} unoptimized />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                {/* Contenu sur l'image */}
                <div style={{ position: 'absolute', inset: 0, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={20} color="white" />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, marginBottom: 4, fontFamily: 'Montserrat,sans-serif' }}>{s.num} — {s.label}</div>
                    <h3 style={{ color: 'white', fontSize: 15, fontWeight: 700, fontFamily: 'Montserrat,sans-serif' }}>{s.titre}</h3>
                  </div>
                </div>
              </div>
              {/* Description + prestations */}
              <div style={{ padding: 18, background: 'white' }}>
                <p style={{ fontSize: 12, color: '#666', lineHeight: 1.7, marginBottom: 14, fontFamily: 'Montserrat,sans-serif' }}>{s.desc}</p>
                {s.prestations.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: i < s.prestations.length - 1 ? '0.5px solid #f0f0f0' : 'none' }}>
                    <IconCheck size={12} color="#8B0000" />
                    <span style={{ fontSize: 12, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>{p}</span>
                  </div>
                ))}
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#8B0000', fontSize: 12, fontWeight: 600, textDecoration: 'none', marginTop: 14, fontFamily: 'Montserrat,sans-serif' }}>
                  En savoir plus <IconArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* POURQUOI NOUS */}
        <div style={{ background: '#F5F5F5', padding: '36px 24px', borderTop: '0.5px solid #e8e8e8' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 20, height: 1, background: '#C0392B' }} />
                <span style={{ color: '#C0392B', fontSize: 10, fontWeight: 600, letterSpacing: 2, fontFamily: 'Montserrat,sans-serif' }}>NOTRE VALEUR AJOUTÉE</span>
                <div style={{ width: 20, height: 1, background: '#C0392B' }} />
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>Pourquoi choisir Zoro Group ?</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              {atouts.map((a, i) => (
                <div key={i} style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
                  <div style={{ width: 44, height: 44, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <a.icon size={20} color="#8B0000" />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginBottom: 5, fontFamily: 'Montserrat,sans-serif' }}>{a.titre}</div>
                  <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5, fontFamily: 'Montserrat,sans-serif' }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ContactBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
