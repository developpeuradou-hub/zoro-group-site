import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ContactBanner from '@/components/ContactBanner'
import Image from 'next/image'
import BrandedImage from '@/components/BrandedImage'
import { IconBuilding, IconTool, IconRoad, IconHome, IconMap2, IconClipboardText, IconEye, IconTarget, IconQuote, IconCheck, IconMapPin, IconPhone } from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À Propos — Zoro Group SARL',
  description: "Zoro Group SARL, entreprise BTP et immobilier implantée à San Pedro, Côte d'Ivoire. Construction, rénovation, vente, gestion et aménagement foncier.",
}

const stats = [
  { value: '50+', label: 'Projets livrés' },
  { value: '5+', label: "Ans d'expérience" },
  { value: '100%', label: 'Satisfaction client' },
  { value: '24h/24', label: 'Disponibilité' },
]

const domaines = [
  { icon: IconBuilding, titre: 'Construction de bâtiments', desc: 'Résidentiels, commerciaux et industriels', gold: false },
  { icon: IconTool, titre: 'Réhabilitation & rénovation', desc: "Remise à neuf d'ouvrages existants", gold: false },
  { icon: IconRoad, titre: 'Travaux de génie civil', desc: 'Aménagements divers et infrastructures', gold: false },
  { icon: IconHome, titre: 'Vente & gestion immobilière', desc: 'Biens résidentiels, commerciaux, fonciers', gold: true },
  { icon: IconMap2, titre: 'Lotissement & aménagement foncier', desc: 'Viabilisation et division parcellaire', gold: true },
  { icon: IconClipboardText, titre: 'Conseil & assistance technique', desc: 'Suivi, études et accompagnement projet', gold: true },
]

const engagements = ['Qualité', 'Sécurité', 'Respect des délais', 'Satisfaction client']

const f = (s: React.CSSProperties) => s

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <div style={{ background: 'linear-gradient(135deg, #8B0000, #6b0000)', padding: '44px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'rgba(184,149,42,0.07)', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>ACCUEIL / À PROPOS</div>
            <h1 style={{ color: 'white', fontSize: 26, fontWeight: 600, marginBottom: 10, fontFamily: 'Montserrat,sans-serif' }}>À Propos de Zoro Group</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, maxWidth: 520, lineHeight: 1.8, marginBottom: 28, fontStyle: 'italic', fontFamily: 'Montserrat,sans-serif' }}>
              "Ensemble, bâtissons l'avenir des leaders."
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              {stats.map((s, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#B8952A', fontSize: 20, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>{s.value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, marginTop: 2, fontFamily: 'Montserrat,sans-serif' }}>{s.label}</div>
                  </div>
                  {i < arr.length - 1 && <div style={{ width: 0.5, height: 32, background: 'rgba(255,255,255,0.15)' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QUI SOMMES-NOUS */}
        <div style={{ padding: '44px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 20, height: 1, background: '#C0392B' }} />
                <span style={{ color: '#C0392B', fontSize: 10, fontWeight: 600, letterSpacing: 2, fontFamily: 'Montserrat,sans-serif' }}>QUI SOMMES-NOUS</span>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a', marginBottom: 16, lineHeight: 1.3, fontFamily: 'Montserrat,sans-serif' }}>
                Une entreprise BTP & immobilier implantée à San Pedro
              </h2>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.9, marginBottom: 14, fontFamily: 'Montserrat,sans-serif' }}>
                ZORO GROUP SARL est une entreprise dynamique spécialisée dans le Bâtiment et Travaux Publics (BTP), l'immobilier, la construction, la rénovation, l'aménagement foncier et les prestations techniques associées.
              </p>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.9, marginBottom: 22, fontFamily: 'Montserrat,sans-serif' }}>
                Implantée à San Pedro, notre société met son expertise, son professionnalisme et son savoir-faire au service des particuliers, des entreprises et des collectivités. Grâce à une équipe qualifiée et engagée, nous accompagnons nos clients de l'étude à l'exécution, en garantissant qualité, sécurité, respect des délais et satisfaction.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['BTP', 'Immobilier', 'Construction', 'Rénovation', 'Génie civil', 'Aménagement foncier'].map((tag, i) => (
                  <span key={i} style={{ background: i < 4 ? '#fde8e8' : '#fdf3de', color: i < 4 ? '#8B0000' : '#7a6010', fontSize: 11, fontWeight: 500, padding: '5px 12px', borderRadius: 20, fontFamily: 'Montserrat,sans-serif' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Visuel équipe */}
            <BrandedImage
              src="/images/generated/about-hero.jpg"
              alt="Équipe Zoro Group sur chantier"
              height={280}
              showBrand={true}
            />
          </div>
        </div>

        {/* VISION / MISSION / SLOGAN */}
        <div style={{ background: '#F5F5F5', padding: '36px 24px', borderTop: '0.5px solid #e8e8e8', borderBottom: '0.5px solid #e8e8e8' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>

            <div style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, padding: 24, borderTop: '3px solid #8B0000' }}>
              <div style={{ width: 40, height: 40, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <IconEye size={18} color="#8B0000" />
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#8B0000', letterSpacing: 1.5, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>NOTRE VISION</div>
              <p style={{ fontSize: 12, color: '#555', lineHeight: 1.85, fontFamily: 'Montserrat,sans-serif' }}>
                Être une référence incontournable dans les secteurs du BTP et de l'immobilier en Côte d'Ivoire, en offrant des solutions innovantes et durables.
              </p>
            </div>

            <div style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, padding: 24, borderTop: '3px solid #B8952A' }}>
              <div style={{ width: 40, height: 40, background: '#fdf3de', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <IconTarget size={18} color="#B8952A" />
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#B8952A', letterSpacing: 1.5, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>NOTRE MISSION</div>
              <p style={{ fontSize: 12, color: '#555', lineHeight: 1.85, fontFamily: 'Montserrat,sans-serif' }}>
                Concevoir et réaliser des projets de qualité qui répondent aux attentes de nos clients tout en participant au développement économique et social.
              </p>
            </div>

            <div style={{ background: '#8B0000', borderRadius: 10, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <IconQuote size={18} color="#B8952A" />
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, marginBottom: 10, fontFamily: 'Montserrat,sans-serif' }}>NOTRE SLOGAN</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'white', lineHeight: 1.6, fontStyle: 'italic', fontFamily: 'Montserrat,sans-serif' }}>
                "Ensemble, bâtissons l'avenir des leaders."
              </p>
            </div>

          </div>
        </div>

        {/* DOMAINES D'INTERVENTION */}
        <div style={{ padding: '36px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 20, height: 1, background: '#C0392B' }} />
              <span style={{ color: '#C0392B', fontSize: 10, fontWeight: 600, letterSpacing: 2, fontFamily: 'Montserrat,sans-serif' }}>EXPERTISES</span>
              <div style={{ width: 20, height: 1, background: '#C0392B' }} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>Nos Domaines d'Intervention</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {domaines.map((d, i) => (
              <div key={i} style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, padding: 18, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 36, height: 36, background: d.gold ? '#fdf3de' : '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <d.icon size={16} color={d.gold ? '#B8952A' : '#8B0000'} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginBottom: 3, fontFamily: 'Montserrat,sans-serif' }}>{d.titre}</div>
                  <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5, fontFamily: 'Montserrat,sans-serif' }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ENGAGEMENT */}
        <div style={{ background: '#8B0000', padding: '36px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, marginBottom: 10, fontFamily: 'Montserrat,sans-serif' }}>NOTRE ENGAGEMENT</div>
            <p style={{ color: 'white', fontSize: 14, lineHeight: 1.85, maxWidth: 640, margin: '0 auto 24px', fontFamily: 'Montserrat,sans-serif' }}>
              Chez ZORO GROUP SARL, nous croyons que chaque projet est une opportunité de créer de la valeur et de contribuer au développement durable de notre communauté.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
              {engagements.map((e, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.1)', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '10px 18px', color: 'white', fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Montserrat,sans-serif' }}>
                  <IconCheck size={13} color="#B8952A" /> {e}
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 20, borderTop: '0.5px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'Montserrat,sans-serif' }}>
                <IconMapPin size={14} color="#B8952A" /> San Pedro 01 BP 2383, Quartier Lac
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'Montserrat,sans-serif' }}>
                <IconPhone size={14} color="#B8952A" /> +225 05 05 02 05 56
              </div>
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
