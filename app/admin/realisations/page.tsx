'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { supabase, RealisationDB } from '@/lib/supabase'
import { IconPlus, IconEdit, IconTrash, IconCheck, IconX } from '@tabler/icons-react'
import ImageUpload from '@/components/ImageUpload'

const categories = [
  { key: 'construction', label: 'Construction' },
  { key: 'renovation', label: 'Rénovation' },
  { key: 'amenagement', label: 'Aménagement' },
  { key: 'genie-civil', label: 'Génie civil' },
]

const emptyForm = { titre: '', categorie: 'construction', ville: 'San Pedro', annee: new Date().getFullYear(), superficie: '', duree: '', description: '', details: '', gradient: 'linear-gradient(135deg, #8B0000, #C0392B)', image: '', photos: 0, tags: '' }
const inp: React.CSSProperties = { width: '100%', fontSize: 12, padding: '9px 12px', border: '0.5px solid #ddd', borderRadius: 4, fontFamily: 'Montserrat,sans-serif', outline: 'none' }

export default function AdminRealisationsPage() {
  const [items, setItems] = useState<RealisationDB[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<any>(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  useEffect(() => { fetch() }, [])

  const fetch = async () => {
    setLoading(true)
    const { data } = await supabase.from('realisations').select('*').order('annee', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }

  const showToast = (msg: string, ok: boolean) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000) }
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const handleSave = async () => {
    if (!form.titre || !form.description || !form.duree) return
    setSaving(true)
    const payload = { titre: form.titre, categorie: form.categorie, ville: form.ville, annee: Number(form.annee), superficie: form.superficie ? Number(form.superficie) : null, duree: form.duree, description: form.description, details: form.details, gradient: form.gradient, image: form.image || null, photos: Number(form.photos), tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) }
    const { error } = editId ? await supabase.from('realisations').update(payload).eq('id', editId) : await supabase.from('realisations').insert(payload)
    showToast(error ? 'Erreur lors de l\'enregistrement' : editId ? 'Réalisation modifiée !' : 'Réalisation ajoutée !', !error)
    setSaving(false); setShowForm(false); setEditId(null); setForm(emptyForm); fetch()
  }

  const handleEdit = (r: RealisationDB) => { setForm({ titre: r.titre, categorie: r.categorie, ville: r.ville, annee: r.annee, superficie: r.superficie?.toString() ?? '', duree: r.duree, description: r.description, details: r.details, gradient: r.gradient, image: r.image ?? '', photos: r.photos, tags: r.tags?.join(', ') ?? '' }); setEditId(r.id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('realisations').delete().eq('id', id)
    showToast(error ? 'Erreur lors de la suppression' : 'Réalisation supprimée', !error)
    setDeleteId(null); fetch()
  }

  return (
    <AdminLayout>
      {toast && <div style={{ position: 'fixed', top: 20, right: 20, background: toast.ok ? '#1a6b3a' : '#C0392B', color: 'white', padding: '12px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>{toast.ok ? <IconCheck size={16} /> : <IconX size={16} />}{toast.msg}</div>}
      <div style={{ padding: '28px 32px' }}>

        {showForm && (
          <div style={{ background: 'white', borderRadius: 10, padding: 24, marginBottom: 24, border: '0.5px solid #e0e0e0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a' }}>{editId ? 'Modifier' : 'Nouvelle réalisation'}</h2>
              <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}><IconX size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Titre *</label><input style={inp} placeholder="Titre du projet" value={form.titre} onChange={e => set('titre', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Catégorie</label><select style={{ ...inp, cursor: 'pointer' }} value={form.categorie} onChange={e => set('categorie', e.target.value)}>{categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}</select></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Ville</label><input style={inp} value={form.ville} onChange={e => set('ville', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Année</label><input style={inp} type="number" value={form.annee} onChange={e => set('annee', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Durée *</label><input style={inp} placeholder="Ex : 6 mois" value={form.duree} onChange={e => set('duree', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Superficie (m²)</label><input style={inp} type="number" value={form.superficie} onChange={e => set('superficie', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Nb photos</label><input style={inp} type="number" value={form.photos} onChange={e => set('photos', e.target.value)} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Description *</label><textarea style={{ ...inp, resize: 'vertical' }} rows={2} value={form.description} onChange={e => set('description', e.target.value)} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Détails des travaux</label><textarea style={{ ...inp, resize: 'vertical' }} rows={3} value={form.details} onChange={e => set('details', e.target.value)} /></div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Image du projet</label>
                <ImageUpload value={form.image} onChange={url => set('image', url)} folder="realisations" />
              </div>
              <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Tags (séparés par virgules)</label><input style={inp} placeholder="Villa, Résidentiel, Piscine" value={form.tags} onChange={e => set('tags', e.target.value)} /></div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} style={{ background: 'white', color: '#666', border: '0.5px solid #ddd', padding: '10px 20px', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleSave} disabled={saving} style={{ background: saving ? '#aaa' : '#8B0000', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: saving ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}><IconCheck size={14} />{saving ? 'Enregistrement...' : editId ? 'Modifier' : 'Ajouter'}</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div><h1 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}>Réalisations</h1><p style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{items.length} projet{items.length > 1 ? 's' : ''}</p></div>
          {!showForm && <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm) }} style={{ background: '#8B0000', color: 'white', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}><IconPlus size={15} />Ajouter</button>}
        </div>

        <div style={{ background: 'white', borderRadius: 10, border: '0.5px solid #e0e0e0', overflow: 'hidden' }}>
          {loading ? <div style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: 13 }}>Chargement...</div> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#F5F5F5', borderBottom: '0.5px solid #e0e0e0' }}>{['Titre', 'Catégorie', 'Ville', 'Année', 'Durée', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#666' }}>{h}</th>)}</tr></thead>
              <tbody>
                {items.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: i < items.length - 1 ? '0.5px solid #f0f0f0' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{r.titre}</div>
                      <div style={{ marginTop: 3 }}>{r.tags?.slice(0, 2).map(t => <span key={t} style={{ background: '#fde8e8', color: '#8B0000', fontSize: 10, padding: '1px 6px', borderRadius: 10, marginRight: 4 }}>{t}</span>)}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: '#fde8e8', color: '#8B0000', fontSize: 11, padding: '3px 8px', borderRadius: 3, fontWeight: 500, textTransform: 'capitalize' }}>{r.categorie.replace('-', ' ')}</span></td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#555' }}>{r.ville}</td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#555' }}>{r.annee}</td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#555' }}>{r.duree}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => handleEdit(r)} style={{ background: '#fdf3de', color: '#B8952A', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500 }}><IconEdit size={13} />Modifier</button>
                        {deleteId === r.id ? (
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button onClick={() => handleDelete(r.id)} style={{ background: '#C0392B', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>Confirmer</button>
                            <button onClick={() => setDeleteId(null)} style={{ background: '#f0f0f0', color: '#666', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 11 }}>Annuler</button>
                          </div>
                        ) : <button onClick={() => setDeleteId(r.id)} style={{ background: '#fde8e8', color: '#C0392B', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500 }}><IconTrash size={13} />Supprimer</button>}
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
