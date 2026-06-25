'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { supabase, BienDB } from '@/lib/supabase'
import { IconPlus, IconEdit, IconTrash, IconCheck, IconX } from '@tabler/icons-react'
import MultiImageUpload from '@/components/MultiImageUpload'

const emptyForm = { titre: '', type: 'villa', transaction: 'vente', prix: '', prix_label: '', superficie: '', chambres: '', salles_de_bain: '', localisation: '', quartier: '', ville: 'San Pedro', description: '', titre_foncier: false, meuble: false, piscine: false, garage: false, statut: 'disponible', coup_de_coeur: false, nouveau: false, gradient: 'linear-gradient(135deg, #8B0000, #C0392B)', image: '', images: [] as string[], photos: 0 }
const inp: React.CSSProperties = { width: '100%', fontSize: 12, padding: '9px 12px', border: '0.5px solid #ddd', borderRadius: 4, fontFamily: 'Montserrat,sans-serif', outline: 'none' }

const statutColor: Record<string, string> = { disponible: '#1a6b3a', vendu: '#8B0000', loue: '#B8952A' }
const typeBadge: Record<string, string> = { villa: '#8B0000', appartement: '#1a3a5c', terrain: '#1a6b3a', immeuble: '#4a1942' }

export default function AdminBiensPage() {
  const [items, setItems] = useState<BienDB[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<any>(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => { setLoading(true); const { data } = await supabase.from('biens').select('*').order('created_at', { ascending: false }); setItems(data ?? []); setLoading(false) }
  const showToast = (msg: string, ok: boolean) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000) }
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const handleSave = async () => {
    if (!form.titre || !form.description || !form.prix) return
    setSaving(true)
    const payload = { titre: form.titre, type: form.type, transaction: form.transaction, prix: Number(form.prix), prix_label: form.prix_label || `${Number(form.prix).toLocaleString()} FCFA${form.transaction === 'location' ? '/mois' : ''}`, superficie: Number(form.superficie), chambres: form.chambres ? Number(form.chambres) : null, salles_de_bain: form.salles_de_bain ? Number(form.salles_de_bain) : null, localisation: form.localisation, quartier: form.quartier, ville: form.ville, description: form.description, titre_foncier: form.titre_foncier, meuble: form.meuble, piscine: form.piscine, garage: form.garage, statut: form.statut, coup_de_coeur: form.coup_de_coeur, nouveau: form.nouveau, gradient: form.gradient, image: form.image || null, images: form.images || [], photos: form.images ? form.images.length + (form.image ? 1 : 0) : Number(form.photos) }
    const { error } = editId ? await supabase.from('biens').update(payload).eq('id', editId) : await supabase.from('biens').insert(payload)
    showToast(error ? 'Erreur lors de l\'enregistrement' : editId ? 'Bien modifié !' : 'Bien ajouté !', !error)
    setSaving(false); setShowForm(false); setEditId(null); setForm(emptyForm); fetchItems()
  }

  const handleEdit = (b: BienDB) => { setForm({ titre: b.titre, type: b.type, transaction: b.transaction, prix: b.prix.toString(), prix_label: b.prix_label, superficie: b.superficie.toString(), chambres: b.chambres?.toString() ?? '', salles_de_bain: b.salles_de_bain?.toString() ?? '', localisation: b.localisation, quartier: b.quartier, ville: b.ville, description: b.description, titre_foncier: b.titre_foncier ?? false, meuble: b.meuble ?? false, piscine: b.piscine ?? false, garage: b.garage ?? false, statut: b.statut, coup_de_coeur: b.coup_de_coeur ?? false, nouveau: b.nouveau ?? false, gradient: b.gradient, image: b.image ?? '', images: b.images ?? [], photos: b.photos }); setEditId(b.id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const handleDelete = async (id: string) => { const { error } = await supabase.from('biens').delete().eq('id', id); showToast(error ? 'Erreur' : 'Bien supprimé', !error); setDeleteId(null); fetchItems() }

  const checkStyle = { accentColor: '#8B0000', width: 14, height: 14 }

  return (
    <AdminLayout>
      {toast && <div style={{ position: 'fixed', top: 20, right: 20, background: toast.ok ? '#1a6b3a' : '#C0392B', color: 'white', padding: '12px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>{toast.ok ? <IconCheck size={16} /> : <IconX size={16} />}{toast.msg}</div>}
      <div style={{ padding: '28px 32px' }}>

        {showForm && (
          <div style={{ background: 'white', borderRadius: 10, padding: 24, marginBottom: 24, border: '0.5px solid #e0e0e0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a' }}>{editId ? 'Modifier le bien' : 'Nouveau bien immobilier'}</h2>
              <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}><IconX size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Titre *</label><input style={inp} placeholder="Ex : Villa Moderne F5" value={form.titre} onChange={e => set('titre', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Type</label><select style={{ ...inp, cursor: 'pointer' }} value={form.type} onChange={e => set('type', e.target.value)}><option value="villa">Villa / Maison</option><option value="appartement">Appartement</option><option value="terrain">Terrain</option><option value="immeuble">Immeuble</option></select></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Transaction</label><select style={{ ...inp, cursor: 'pointer' }} value={form.transaction} onChange={e => set('transaction', e.target.value)}><option value="vente">Vente</option><option value="location">Location</option></select></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Prix (FCFA) *</label><input style={inp} type="number" placeholder="85000000" value={form.prix} onChange={e => set('prix', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Superficie (m²) *</label><input style={inp} type="number" value={form.superficie} onChange={e => set('superficie', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Chambres</label><input style={inp} type="number" value={form.chambres} onChange={e => set('chambres', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Salles de bain</label><input style={inp} type="number" value={form.salles_de_bain} onChange={e => set('salles_de_bain', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Localisation</label><input style={inp} placeholder="Quartier Lac, San Pedro" value={form.localisation} onChange={e => set('localisation', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Quartier</label><input style={inp} value={form.quartier} onChange={e => set('quartier', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Statut</label><select style={{ ...inp, cursor: 'pointer' }} value={form.statut} onChange={e => set('statut', e.target.value)}><option value="disponible">Disponible</option><option value="vendu">Vendu</option><option value="loue">Loué</option></select></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Nb photos</label><input style={inp} type="number" value={form.photos} onChange={e => set('photos', e.target.value)} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Description *</label><textarea style={{ ...inp, resize: 'vertical' }} rows={3} value={form.description} onChange={e => set('description', e.target.value)} /></div>
              <div style={{ gridColumn: '1/-1' }}>
                <MultiImageUpload
                  mainImage={form.image}
                  secondaryImages={form.images}
                  onMainChange={url => set('image', url)}
                  onSecondaryChange={urls => set('images', urls)}
                  folder="biens"
                />
              </div>
              <div style={{ gridColumn: '1/-1', display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                {[['titre_foncier', 'Titre foncier'], ['meuble', 'Meublé'], ['piscine', 'Piscine'], ['garage', 'Garage'], ['coup_de_coeur', '★ Coup de cœur'], ['nouveau', 'Nouveau']].map(([k, l]) => (
                  <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12, color: '#444' }}>
                    <input type="checkbox" style={checkStyle} checked={form[k]} onChange={e => set(k, e.target.checked)} />{l}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} style={{ background: 'white', color: '#666', border: '0.5px solid #ddd', padding: '10px 20px', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleSave} disabled={saving} style={{ background: saving ? '#aaa' : '#8B0000', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: saving ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}><IconCheck size={14} />{saving ? 'Enregistrement...' : editId ? 'Modifier' : 'Ajouter'}</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div><h1 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}>Biens immobiliers</h1><p style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{items.length} bien{items.length > 1 ? 's' : ''}</p></div>
          {!showForm && <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm) }} style={{ background: '#8B0000', color: 'white', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}><IconPlus size={15} />Ajouter</button>}
        </div>

        <div style={{ background: 'white', borderRadius: 10, border: '0.5px solid #e0e0e0', overflow: 'hidden' }}>
          {loading ? <div style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: 13 }}>Chargement...</div> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#F5F5F5', borderBottom: '0.5px solid #e0e0e0' }}>{['Titre', 'Type', 'Transaction', 'Prix', 'Statut', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#666' }}>{h}</th>)}</tr></thead>
              <tbody>
                {items.map((b, i) => (
                  <tr key={b.id} style={{ borderBottom: i < items.length - 1 ? '0.5px solid #f0f0f0' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}><div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{b.titre}</div><div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{b.localisation}</div></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: typeBadge[b.type] + '22', color: typeBadge[b.type], fontSize: 11, padding: '3px 8px', borderRadius: 3, fontWeight: 500, textTransform: 'capitalize' }}>{b.type}</span></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: b.transaction === 'vente' ? '#fde8e8' : '#fdf3de', color: b.transaction === 'vente' ? '#8B0000' : '#B8952A', fontSize: 11, padding: '3px 8px', borderRadius: 3, fontWeight: 500, textTransform: 'capitalize' }}>{b.transaction}</span></td>
                    <td style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>{b.prix_label}</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: statutColor[b.statut] + '22', color: statutColor[b.statut], fontSize: 11, padding: '3px 8px', borderRadius: 3, fontWeight: 500, textTransform: 'capitalize' }}>{b.statut}</span></td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => handleEdit(b)} style={{ background: '#fdf3de', color: '#B8952A', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500 }}><IconEdit size={13} />Modifier</button>
                        {deleteId === b.id ? <div style={{ display: 'flex', gap: 4 }}><button onClick={() => handleDelete(b.id)} style={{ background: '#C0392B', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>Confirmer</button><button onClick={() => setDeleteId(null)} style={{ background: '#f0f0f0', color: '#666', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 11 }}>Annuler</button></div>
                        : <button onClick={() => setDeleteId(b.id)} style={{ background: '#fde8e8', color: '#C0392B', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500 }}><IconTrash size={13} />Supprimer</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
