'use client'
import { useState } from 'react'
import Link from 'next/link'
import { IconClock, IconCalendar, IconArrowRight, IconTag } from '@tabler/icons-react'
import { articles } from '@/lib/data'

const categories = [
  { key: 'tous', label: 'Tous les articles' },
  { key: 'immobilier', label: 'Immobilier' },
  { key: 'construction', label: 'Construction' },
  { key: 'conseils', label: 'Conseils' },
  { key: 'actualites', label: 'Actualités' },
]

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogClient() {
  const [active, setActive] = useState('tous')
  const filtered = active === 'tous' ? articles : articles.filter(a => a.categorie === active)
  const [featured, ...rest] = filtered

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {categories.map(c => (
          <button key={c.key} onClick={() => setActive(c.key)} style={{ background: active === c.key ? '#8B0000' : 'white', color: active === c.key ? 'white' : '#1a1a1a', border: `0.5px solid ${active === c.key ? '#8B0000' : '#e0e0e0'}`, padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: active === c.key ? 600 : 400, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', transition: 'all 0.15s' }}>
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
          <p style={{ fontFamily: 'Montserrat,sans-serif' }}>Aucun article dans cette catégorie.</p>
        </div>
      ) : (
        <>
          {/* Article à la une */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', background: 'white' }}>
                <div style={{ height: '100%', minHeight: 240, background: featured.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ fontSize: 60, opacity: 0.15, color: 'white' }}>📰</div>
                  <div style={{ position: 'absolute', top: 14, left: 14 }}>
                    <span style={{ background: '#B8952A', color: 'white', fontSize: 10, padding: '3px 10px', borderRadius: 2, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>À LA UNE</span>
                  </div>
                </div>
                <div style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ background: '#fde8e8', color: '#8B0000', fontSize: 10, padding: '3px 10px', borderRadius: 20, fontWeight: 500, fontFamily: 'Montserrat,sans-serif', textTransform: 'capitalize' }}>
                      {featured.categorie}
                    </span>
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', margin: '12px 0 10px', lineHeight: 1.3, fontFamily: 'Montserrat,sans-serif' }}>{featured.titre}</h2>
                    <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, fontFamily: 'Montserrat,sans-serif' }}>{featured.resume}</p>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                      <span style={{ fontSize: 11, color: '#999', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}>
                        <IconCalendar size={11} /> {formatDate(featured.date)}
                      </span>
                      <span style={{ fontSize: 11, color: '#999', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}>
                        <IconClock size={11} /> {featured.tempsLecture} min de lecture
                      </span>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#8B0000', fontSize: 12, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>
                      Lire l'article <IconArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grille articles */}
          {rest.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {rest.map(a => (
                <Link key={a.id} href={`/blog/${a.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: 130, background: a.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ fontSize: 44, opacity: 0.2, color: 'white' }}>📰</div>
                      <div style={{ position: 'absolute', top: 10, left: 10 }}>
                        <span style={{ background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 9, padding: '2px 8px', borderRadius: 2, fontFamily: 'Montserrat,sans-serif', textTransform: 'capitalize' }}>{a.categorie}</span>
                      </div>
                    </div>
                    <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 8, lineHeight: 1.4, fontFamily: 'Montserrat,sans-serif' }}>{a.titre}</h3>
                      <p style={{ fontSize: 11, color: '#666', lineHeight: 1.6, marginBottom: 12, flex: 1, fontFamily: 'Montserrat,sans-serif' }}>{a.resume}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '0.5px solid #f0f0f0' }}>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <span style={{ fontSize: 10, color: '#999', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
                            <IconClock size={10} /> {a.tempsLecture} min
                          </span>
                          <span style={{ fontSize: 10, color: '#999', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
                            <IconCalendar size={10} /> {new Date(a.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <span style={{ color: '#8B0000', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
                          Lire <IconArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
