'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconMapPin, IconRuler2, IconClock, IconCamera, IconArrowRight } from '@tabler/icons-react'
import { RealisationDB } from '@/lib/supabase'

const categories = [
  { key: 'tous', label: 'Tous les projets' },
  { key: 'construction', label: 'Construction' },
  { key: 'renovation', label: 'Rénovation' },
  { key: 'amenagement', label: 'Aménagement' },
  { key: 'genie-civil', label: 'Génie civil' },
]

export default function RealisationsClient({ realisations }: { realisations: RealisationDB[] }) {
  const [active, setActive] = useState('tous')
  const filtered = active === 'tous' ? realisations : realisations.filter(r => r.categorie === active)

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {categories.map(c => (
          <button key={c.key} onClick={() => setActive(c.key)} style={{ background: active === c.key ? '#8B0000' : 'white', color: active === c.key ? 'white' : '#1a1a1a', border: `0.5px solid ${active === c.key ? '#8B0000' : '#e0e0e0'}`, padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: active === c.key ? 600 : 400, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', transition: 'all 0.15s' }}>
            {c.label}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#666', alignSelf: 'center', fontFamily: 'Montserrat,sans-serif' }}>
          {filtered.length} projet{filtered.length > 1 ? 's' : ''}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <p style={{ color: '#666', fontFamily: 'Montserrat,sans-serif' }}>Aucune réalisation dans cette catégorie.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
          {filtered.map(r => (
            <div key={r.id} style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ height: 160, background: r.gradient, position: 'relative', overflow: 'hidden' }}>
                {r.image && (
                  <>
                    <Image src={r.image} alt={r.titre} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
                  </>
                )}
                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                  <span style={{ background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: 10, padding: '3px 9px', borderRadius: 2, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>{r.annee}</span>
                </div>
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: 10, padding: '3px 8px', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}>
                  <IconCamera size={10} /> {r.photos} photos
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <span style={{ background: '#8B0000', color: 'white', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontWeight: 600, fontFamily: 'Montserrat,sans-serif', textTransform: 'capitalize' }}>
                    {r.categorie.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <div style={{ padding: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 6, lineHeight: 1.4, fontFamily: 'Montserrat,sans-serif' }}>{r.titre}</h3>
                <p style={{ fontSize: 11, color: '#666', lineHeight: 1.6, marginBottom: 12, fontFamily: 'Montserrat,sans-serif' }}>{r.description}</p>
                <div style={{ display: 'flex', gap: 14, marginBottom: 12, paddingBottom: 12, borderBottom: '0.5px solid #f0f0f0' }}>
                  <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconMapPin size={11} color="#8B0000" /> {r.ville}</span>
                  {r.superficie && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconRuler2 size={11} /> {r.superficie.toLocaleString()} m²</span>}
                  <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconClock size={11} /> {r.duree}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                  {r.tags?.map(t => <span key={t} style={{ background: '#fde8e8', color: '#8B0000', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontFamily: 'Montserrat,sans-serif' }}>{t}</span>)}
                </div>
                <Link href={`/realisations/${r.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#8B0000', fontSize: 12, fontWeight: 600, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
                  Voir le projet <IconArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
