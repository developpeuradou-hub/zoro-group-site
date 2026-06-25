import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import GalerieClient from './GalerieClient'
import { supabase } from '@/lib/supabase'
import { IconMapPin, IconRuler2, IconBed, IconBath, IconCertificate, IconCar, IconArmchair, IconDroplet, IconArrowLeft, IconPhone, IconMail, IconBrandWhatsapp } from '@tabler/icons-react'

export const dynamic = 'force-dynamic'

export default async function BienPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: bien } = await supabase.from('biens').select('*').eq('id', id).single()
  if (!bien) notFound()

  const { data: similaires } = await supabase
    .from('biens')
    .select('id, titre, localisation, prix_label, gradient, image, type, transaction')
    .neq('id', id)
    .eq('statut', 'disponible')
    .limit(3)

  const specs = [
    bien.superficie && { icon: IconRuler2, label: 'Superficie', value: `${bien.superficie} m²` },
    bien.chambres && { icon: IconBed, label: 'Chambres', value: `${bien.chambres} chambres` },
    bien.salles_de_bain && { icon: IconBath, label: 'Salles de bain', value: `${bien.salles_de_bain} salles de bain` },
    bien.titre_foncier && { icon: IconCertificate, label: 'Titre foncier', value: 'Oui' },
    bien.garage && { icon: IconCar, label: 'Garage', value: 'Inclus' },
    bien.meuble && { icon: IconArmchair, label: 'Meublé', value: 'Oui' },
    bien.piscine && { icon: IconDroplet, label: 'Piscine', value: 'Oui' },
  ].filter(Boolean) as any[]

  return (
    <>
      <Navbar />
      <main>
        <div style={{ background: 'linear-gradient(135deg, #8B0000, #6b0000)', padding: '24px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>
              ACCUEIL / CATALOGUE / {bien.titre.toUpperCase()}
            </div>
            <Link href="/catalogue" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 12, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
              <IconArrowLeft size={14} /> Retour au catalogue
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>

            {/* Gauche */}
            <div>
              <GalerieClient
                mainImage={bien.image}
                images={bien.images ?? []}
                titre={bien.titre}
                gradient={bien.gradient}
              />

              <div style={{ marginBottom: 8 }}>
                <span style={{ background: bien.transaction === 'vente' ? '#8B0000' : '#B8952A', color: 'white', fontSize: 11, padding: '4px 12px', borderRadius: 3, fontWeight: 700, fontFamily: 'Montserrat,sans-serif', textTransform: 'uppercase' }}>
                  {bien.transaction}
                </span>
                {bien.coup_de_coeur && <span style={{ background: '#fdf3de', color: '#B8952A', fontSize: 11, padding: '4px 10px', borderRadius: 3, fontWeight: 500, fontFamily: 'Montserrat,sans-serif', marginLeft: 8 }}>★ Coup de cœur</span>}
              </div>

              <h1 style={{ fontSize: 22, fontWeight: 600, color: '#1a1a1a', marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>{bien.titre}</h1>
              <p style={{ fontSize: 13, color: '#666', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, fontFamily: 'Montserrat,sans-serif' }}>
                <IconMapPin size={14} color="#8B0000" /> {bien.localisation}
              </p>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#8B0000', marginBottom: 20, fontFamily: 'Montserrat,sans-serif' }}>{bien.prix_label}</div>

              <div style={{ background: '#F5F5F5', borderRadius: 10, padding: 20, marginBottom: 20 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 10, fontFamily: 'Montserrat,sans-serif' }}>Description</h2>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.8, fontFamily: 'Montserrat,sans-serif' }}>{bien.description}</p>
              </div>

              {specs.length > 0 && (
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 14, fontFamily: 'Montserrat,sans-serif' }}>Caractéristiques</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                    {specs.map((s: any, i: number) => (
                      <div key={i} style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 8, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <s.icon size={18} color="#8B0000" />
                        <div>
                          <div style={{ fontSize: 10, color: '#999', fontFamily: 'Montserrat,sans-serif' }}>{s.label}</div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>{s.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Similaires */}
              {similaires && similaires.length > 0 && (
                <div style={{ marginTop: 28 }}>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 14, fontFamily: 'Montserrat,sans-serif' }}>Biens similaires</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                    {similaires.map((s: any) => (
                      <Link key={s.id} href={`/catalogue/${s.id}`} style={{ textDecoration: 'none', background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 8, overflow: 'hidden', display: 'block' }}>
                        <div style={{ height: 80, background: s.gradient, position: 'relative', overflow: 'hidden' }}>
                          {s.image && <Image src={s.image} alt={s.titre} fill style={{ objectFit: 'cover' }} unoptimized />}
                          <div style={{ position: 'absolute', top: 6, left: 6, background: s.transaction === 'vente' ? '#8B0000' : '#B8952A', color: 'white', fontSize: 8, padding: '2px 6px', borderRadius: 2, fontFamily: 'Montserrat,sans-serif', fontWeight: 600 }}>{s.transaction.toUpperCase()}</div>
                        </div>
                        <div style={{ padding: '10px 12px' }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a', marginBottom: 3, fontFamily: 'Montserrat,sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.titre}</div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#8B0000', fontFamily: 'Montserrat,sans-serif' }}>{s.prix_label}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Droite — Contact */}
            <div style={{ position: 'sticky', top: 80 }}>
              <div style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <div style={{ background: '#8B0000', padding: '16px 20px' }}>
                  <div style={{ color: 'white', fontSize: 14, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>Intéressé par ce bien ?</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 4, fontFamily: 'Montserrat,sans-serif' }}>Contactez-nous dès maintenant</div>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                    <input placeholder="Votre nom complet" style={{ fontSize: 12, padding: '9px 12px', border: '0.5px solid #e0e0e0', borderRadius: 4, fontFamily: 'Montserrat,sans-serif', outline: 'none' }} />
                    <input placeholder="Votre téléphone" style={{ fontSize: 12, padding: '9px 12px', border: '0.5px solid #e0e0e0', borderRadius: 4, fontFamily: 'Montserrat,sans-serif', outline: 'none' }} />
                    <input placeholder="Votre email" style={{ fontSize: 12, padding: '9px 12px', border: '0.5px solid #e0e0e0', borderRadius: 4, fontFamily: 'Montserrat,sans-serif', outline: 'none' }} />
                    <textarea placeholder="Votre message..." rows={3} style={{ fontSize: 12, padding: '9px 12px', border: '0.5px solid #e0e0e0', borderRadius: 4, fontFamily: 'Montserrat,sans-serif', resize: 'vertical', outline: 'none' }} />
                  </div>
                  <button style={{ width: '100%', background: '#8B0000', color: 'white', border: 'none', padding: '11px 0', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
                    <IconMail size={15} /> Envoyer ma demande
                  </button>
                  <a href={`https://wa.me/2250505020556?text=Bonjour, je suis intéressé par : ${bien.titre}`} target="_blank" rel="noopener noreferrer" style={{ width: '100%', background: '#25D366', color: 'white', padding: '11px 0', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', marginBottom: 16 }}>
                    <IconBrandWhatsapp size={15} /> Contacter via WhatsApp
                  </a>
                  <div style={{ borderTop: '0.5px solid #f0f0f0', paddingTop: 14, textAlign: 'center' }}>
                    <a href="tel:+2250505020556" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#8B0000', textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>
                      <IconPhone size={15} /> +225 0505020556
                    </a>
                    <div style={{ fontSize: 10, color: '#999', marginTop: 4, fontFamily: 'Montserrat,sans-serif' }}>Disponible 24h/24</div>
                  </div>
                </div>
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
