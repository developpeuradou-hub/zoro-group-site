'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconSearch, IconX, IconChevronLeft, IconChevronRight, IconMapPin, IconRuler2, IconBed, IconBath, IconCertificate, IconCar, IconArmchair, IconDroplet, IconCamera } from '@tabler/icons-react'
import { BienDB } from '@/lib/supabase'

const ITEMS_PER_PAGE = 6

type Filters = {
  type: string
  transaction: string
  ville: string
  budgetMax: number
  superficieMin: number
}

const initialFilters: Filters = {
  type: 'tous', transaction: 'tous', ville: 'tous', budgetMax: 0, superficieMin: 0,
}

const selectStyle: React.CSSProperties = {
  width: '100%', fontSize: 12, padding: '8px 10px',
  border: '0.5px solid #e0e0e0', borderRadius: 4,
  background: 'white', color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif',
}

export default function CatalogueClient({ biens }: { biens: BienDB[] }) {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [applied, setApplied] = useState<Filters>(initialFilters)
  const [tri, setTri] = useState('recent')
  const [page, setPage] = useState(1)

  const set = (k: keyof Filters, v: string | number) => setFilters(f => ({ ...f, [k]: v }))

  const activeFilters = useMemo(() => {
    const tags: { label: string; key: keyof Filters }[] = []
    if (applied.type !== 'tous') tags.push({ label: applied.type, key: 'type' })
    if (applied.transaction !== 'tous') tags.push({ label: applied.transaction, key: 'transaction' })
    if (applied.ville !== 'tous') tags.push({ label: applied.ville, key: 'ville' })
    if (applied.budgetMax > 0) tags.push({ label: `Max ${(applied.budgetMax / 1000000).toFixed(0)}M FCFA`, key: 'budgetMax' })
    if (applied.superficieMin > 0) tags.push({ label: `Min ${applied.superficieMin} m²`, key: 'superficieMin' })
    return tags
  }, [applied])

  const removeFilter = (key: keyof Filters) => {
    const reset = key === 'budgetMax' || key === 'superficieMin' ? 0 : 'tous'
    const updated = { ...applied, [key]: reset }
    setApplied(updated); setFilters(updated); setPage(1)
  }

  const filtered = useMemo(() => {
    let result = [...biens].filter(b => b.statut === 'disponible')
    if (applied.type !== 'tous') result = result.filter(b => b.type === applied.type)
    if (applied.transaction !== 'tous') result = result.filter(b => b.transaction === applied.transaction)
    if (applied.ville !== 'tous') result = result.filter(b => b.ville === applied.ville)
    if (applied.budgetMax > 0) result = result.filter(b => b.prix <= applied.budgetMax)
    if (applied.superficieMin > 0) result = result.filter(b => b.superficie >= applied.superficieMin)
    if (tri === 'prix-asc') result.sort((a, b) => a.prix - b.prix)
    else if (tri === 'prix-desc') result.sort((a, b) => b.prix - a.prix)
    else if (tri === 'surface') result.sort((a, b) => b.superficie - a.superficie)
    return result
  }, [biens, applied, tri])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <>
      {/* Filtres */}
      <div style={{ background: '#F5F5F5', borderBottom: '0.5px solid #e0e0e0', padding: '18px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {[
              { label: 'TYPE DE BIEN', key: 'type', options: [['tous','Tous les biens'],['villa','Villa / Maison'],['appartement','Appartement'],['terrain','Terrain'],['immeuble','Immeuble']] },
              { label: 'TRANSACTION', key: 'transaction', options: [['tous','Vente & Location'],['vente','Vente'],['location','Location']] },
              { label: 'VILLE', key: 'ville', options: [['tous','Toute la CI'],['San Pedro','San Pedro'],['Abidjan','Abidjan']] },
              { label: 'BUDGET MAX (FCFA)', key: 'budgetMax', options: [['0','Sans limite'],['10000000','10 000 000'],['50000000','50 000 000'],['100000000','100 000 000'],['200000000','200 000 000']] },
              { label: 'SUPERFICIE MIN', key: 'superficieMin', options: [['0','Toutes'],['50','50 m²'],['100','100 m²'],['200','200 m²'],['500','500 m²']] },
            ].map(field => (
              <div key={field.key} style={{ flex: 1, minWidth: 130 }}>
                <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 4, fontWeight: 600, letterSpacing: 0.5, fontFamily: 'Montserrat,sans-serif' }}>{field.label}</label>
                <select style={selectStyle} value={String(filters[field.key as keyof Filters])} onChange={e => set(field.key as keyof Filters, field.key === 'budgetMax' || field.key === 'superficieMin' ? Number(e.target.value) : e.target.value)}>
                  {field.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
            <button onClick={() => { setApplied(filters); setPage(1) }} style={{ background: '#8B0000', color: 'white', border: 'none', padding: '9px 20px', borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', fontFamily: 'Montserrat,sans-serif' }}>
              <IconSearch size={14} /> Filtrer
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              {activeFilters.length > 0 && <span style={{ fontSize: 11, color: '#666', fontFamily: 'Montserrat,sans-serif' }}>Filtres actifs :</span>}
              {activeFilters.map(f => (
                <button key={f.key} onClick={() => removeFilter(f.key)} style={{ background: '#fde8e8', color: '#8B0000', border: 'none', fontSize: 11, padding: '3px 10px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', textTransform: 'capitalize' }}>
                  {f.label} <IconX size={10} />
                </button>
              ))}
              {activeFilters.length > 0 && (
                <button onClick={() => { setFilters(initialFilters); setApplied(initialFilters); setPage(1) }} style={{ background: 'none', border: 'none', color: '#8B0000', fontSize: 11, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Montserrat,sans-serif' }}>
                  Tout effacer
                </button>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: '#666', fontFamily: 'Montserrat,sans-serif' }}>{filtered.length} bien{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</span>
              <select style={{ fontSize: 11, padding: '5px 8px', border: '0.5px solid #e0e0e0', borderRadius: 4, background: 'white', fontFamily: 'Montserrat,sans-serif' }} value={tri} onChange={e => { setTri(e.target.value); setPage(1) }}>
                <option value="recent">Plus récent</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
                <option value="surface">Surface</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grille */}
      <div style={{ padding: '28px 24px', maxWidth: 1200, margin: '0 auto' }}>
        {biens.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🏠</div>
            <p style={{ fontSize: 15, fontWeight: 500, color: '#666', fontFamily: 'Montserrat,sans-serif' }}>Aucun bien disponible pour le moment</p>
            <p style={{ fontSize: 13, color: '#999', marginTop: 8, fontFamily: 'Montserrat,sans-serif' }}>Revenez bientôt ou contactez-nous directement</p>
          </div>
        ) : paginated.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 15, fontWeight: 500, color: '#666', fontFamily: 'Montserrat,sans-serif' }}>Aucun bien ne correspond à vos critères</p>
            <button onClick={() => { setFilters(initialFilters); setApplied(initialFilters); setPage(1) }} style={{ marginTop: 16, background: '#8B0000', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 13, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
              {paginated.map(b => (
                <div key={b.id} style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ height: 140, background: b.gradient, position: 'relative', overflow: 'hidden' }}>
                    {b.image && <Image src={b.image} alt={b.titre} fill style={{ objectFit: 'cover' }} />}
                    <div style={{ position: 'absolute', top: 10, left: 10, background: b.transaction === 'vente' ? '#8B0000' : '#B8952A', color: 'white', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontWeight: 700, fontFamily: 'Montserrat,sans-serif', textTransform: 'uppercase' }}>{b.transaction}</div>
                    {b.coup_de_coeur && <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.55)', color: '#B8952A', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontFamily: 'Montserrat,sans-serif' }}>★ Coup de cœur</div>}
                    {b.nouveau && !b.coup_de_coeur && <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.55)', color: '#B8952A', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontFamily: 'Montserrat,sans-serif' }}>Nouveau</div>}
                    {b.photos > 0 && <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 10, padding: '3px 8px', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}><IconCamera size={10} />{b.photos} photos</div>}
                  </div>

                  <div style={{ padding: 14 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Montserrat,sans-serif' }}>{b.titre}</h3>
                    <p style={{ fontSize: 11, color: '#666', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}>
                      <IconMapPin size={11} color="#8B0000" /> {b.localisation}
                    </p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12, paddingBottom: 12, borderBottom: '0.5px solid #f0f0f0' }}>
                      <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconRuler2 size={11} />{b.superficie} m²</span>
                      {b.chambres && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconBed size={11} />{b.chambres} ch.</span>}
                      {b.salles_de_bain && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconBath size={11} />{b.salles_de_bain} sdb.</span>}
                      {b.titre_foncier && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconCertificate size={11} />Titre foncier</span>}
                      {b.garage && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconCar size={11} />Garage</span>}
                      {b.meuble && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconArmchair size={11} />Meublé</span>}
                      {b.piscine && <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}><IconDroplet size={11} />Piscine</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#8B0000', fontFamily: 'Montserrat,sans-serif' }}>{b.prix_label}</span>
                      <Link href={`/catalogue/${b.id}`} style={{ background: '#8B0000', color: 'white', padding: '6px 14px', borderRadius: 4, fontSize: 10, fontWeight: 600, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
                        Voir détails →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 32 }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ background: 'white', color: page === 1 ? '#ccc' : '#1a1a1a', border: '0.5px solid #e0e0e0', width: 34, height: 34, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: page === 1 ? 'default' : 'pointer' }}>
                  <IconChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)} style={{ background: page === n ? '#8B0000' : 'white', color: page === n ? 'white' : '#1a1a1a', border: `0.5px solid ${page === n ? '#8B0000' : '#e0e0e0'}`, width: 34, height: 34, borderRadius: 4, fontSize: 12, fontWeight: page === n ? 600 : 400, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ background: 'white', color: page === totalPages ? '#ccc' : '#1a1a1a', border: '0.5px solid #e0e0e0', width: 34, height: 34, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: page === totalPages ? 'default' : 'pointer' }}>
                  <IconChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
