import Link from 'next/link'
import Image from 'next/image'
import { IconMapPin, IconRuler2, IconBed, IconBath, IconCertificate, IconCar, IconArmchair, IconDroplet } from '@tabler/icons-react'
import { supabase } from '@/lib/supabase'

export default async function FeaturedPropertiesServer() {
  const { data: biens } = await supabase
    .from('biens')
    .select('*')
    .eq('statut', 'disponible')
    .order('created_at', { ascending: false })
    .limit(3)

  if (!biens || biens.length === 0) return null

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {biens.map(b => (
            <div key={b.id} style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 130, background: b.gradient, position: 'relative', overflow: 'hidden' }}>
                {b.image && <Image src={b.image} alt={b.titre} fill style={{ objectFit: 'cover' }} />}
                <div style={{ position: 'absolute', top: 10, left: 10, background: b.transaction === 'vente' ? '#8B0000' : '#B8952A', color: 'white', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontWeight: 600, fontFamily: 'Montserrat,sans-serif', textTransform: 'uppercase' }}>{b.transaction}</div>
                {b.coup_de_coeur && <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', color: '#B8952A', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontFamily: 'Montserrat,sans-serif' }}>★ Coup de cœur</div>}
              </div>
              <div style={{ padding: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Montserrat,sans-serif' }}>{b.titre}</h3>
                <p style={{ fontSize: 11, color: '#666', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}>
                  <IconMapPin size={11} color="#8B0000" /> {b.localisation}
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10, paddingBottom: 10, borderBottom: '0.5px solid #f0f0f0' }}>
                  <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconRuler2 size={11} />{b.superficie} m²</span>
                  {b.chambres && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconBed size={11} />{b.chambres} ch.</span>}
                  {b.salles_de_bain && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconBath size={11} />{b.salles_de_bain} sdb.</span>}
                  {b.titre_foncier && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconCertificate size={11} />TF</span>}
                  {b.garage && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconCar size={11} />Garage</span>}
                  {b.meuble && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconArmchair size={11} />Meublé</span>}
                  {b.piscine && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconDroplet size={11} />Piscine</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#8B0000', fontFamily: 'Montserrat,sans-serif' }}>{b.prix_label}</span>
                  <Link href={`/catalogue/${b.id}`} style={{ background: '#8B0000', color: 'white', padding: '6px 12px', borderRadius: 4, fontSize: 10, fontWeight: 600, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
                    Détails →
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
