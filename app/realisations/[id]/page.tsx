import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ContactBanner from '@/components/ContactBanner'
import { supabase } from '@/lib/supabase'
import { IconMapPin, IconRuler2, IconClock, IconCalendar, IconArrowLeft, IconTag } from '@tabler/icons-react'

export const dynamic = 'force-dynamic'

export default async function RealisationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: r } = await supabase.from('realisations').select('*').eq('id', id).single()
  if (!r) notFound()

  const { data: autres } = await supabase.from('realisations').select('id, titre, annee, ville, gradient, image').neq('id', id).limit(3)

  return (
    <>
      <Navbar />
      <main>
        <div style={{ background: 'linear-gradient(135deg, #8B0000, #6b0000)', padding: '24px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>ACCUEIL / RÉALISATIONS</div>
            <Link href="/realisations" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 12, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
              <IconArrowLeft size={14} /> Retour aux réalisations
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, alignItems: 'start' }}>
            <div>
              <div style={{ height: 300, background: r.gradient, borderRadius: 10, position: 'relative', overflow: 'hidden', marginBottom: 16 }}>
                {r.image && <Image src={r.image} alt={r.titre} fill style={{ objectFit: 'cover' }} />}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
              </div>

              <div style={{ marginBottom: 6 }}>
                <span style={{ background: '#8B0000', color: 'white', fontSize: 10, padding: '3px 10px', borderRadius: 2, fontWeight: 600, fontFamily: 'Montserrat,sans-serif', textTransform: 'capitalize' }}>
                  {r.categorie.replace('-', ' ')}
                </span>
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 600, color: '#1a1a1a', marginBottom: 16, lineHeight: 1.3, fontFamily: 'Montserrat,sans-serif' }}>{r.titre}</h1>

              <div style={{ display: 'flex', gap: 20, marginBottom: 24, padding: '16px 0', borderTop: '0.5px solid #f0f0f0', borderBottom: '0.5px solid #f0f0f0', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IconMapPin size={14} color="#8B0000" /><span style={{ fontSize: 12, color: '#555', fontFamily: 'Montserrat,sans-serif' }}>{r.ville}</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IconCalendar size={14} color="#8B0000" /><span style={{ fontSize: 12, color: '#555', fontFamily: 'Montserrat,sans-serif' }}>{r.annee}</span></div>
                {r.superficie && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IconRuler2 size={14} color="#8B0000" /><span style={{ fontSize: 12, color: '#555', fontFamily: 'Montserrat,sans-serif' }}>{r.superficie.toLocaleString()} m²</span></div>}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IconClock size={14} color="#8B0000" /><span style={{ fontSize: 12, color: '#555', fontFamily: 'Montserrat,sans-serif' }}>Durée : {r.duree}</span></div>
              </div>

              <div style={{ background: '#F5F5F5', borderRadius: 10, padding: 20, marginBottom: 20 }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 10, fontFamily: 'Montserrat,sans-serif' }}>Présentation du projet</h2>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.85, fontFamily: 'Montserrat,sans-serif' }}>{r.description}</p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 10, fontFamily: 'Montserrat,sans-serif' }}>Détails des travaux</h2>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.85, fontFamily: 'Montserrat,sans-serif' }}>{r.details}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <IconTag size={13} color="#8B0000" />
                {r.tags?.map((t: string) => <span key={t} style={{ background: '#fde8e8', color: '#8B0000', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontFamily: 'Montserrat,sans-serif' }}>{t}</span>)}
              </div>
            </div>

            <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <div style={{ background: '#8B0000', padding: '16px 20px' }}>
                  <div style={{ color: 'white', fontSize: 13, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>Un projet similaire ?</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, marginTop: 3, fontFamily: 'Montserrat,sans-serif' }}>Obtenez un devis gratuit en 24h</div>
                </div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Link href="/contact" style={{ background: '#8B0000', color: 'white', padding: '11px', borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'block', textAlign: 'center', fontFamily: 'Montserrat,sans-serif' }}>Demander un devis</Link>
                  <a href="https://wa.me/2250505020556" target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: 'white', padding: '11px', borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'block', textAlign: 'center', fontFamily: 'Montserrat,sans-serif' }}>WhatsApp</a>
                </div>
              </div>

              {autres && autres.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginBottom: 12, fontFamily: 'Montserrat,sans-serif' }}>Autres réalisations</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {autres.map((a: any) => (
                      <Link key={a.id} href={`/realisations/${a.id}`} style={{ display: 'flex', gap: 10, textDecoration: 'none', background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ width: 60, height: 60, background: a.gradient, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                          {a.image && <Image src={a.image} alt={a.titre} fill style={{ objectFit: 'cover' }} />}
                        </div>
                        <div style={{ padding: '8px 10px 8px 0' }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4, marginBottom: 2, fontFamily: 'Montserrat,sans-serif' }}>{a.titre}</div>
                          <div style={{ fontSize: 10, color: '#999', fontFamily: 'Montserrat,sans-serif' }}>{a.annee} · {a.ville}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
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
