'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { supabase, ArticleDB } from '@/lib/supabase'
import { IconPlus, IconEdit, IconTrash, IconCheck, IconX, IconEye, IconEyeOff } from '@tabler/icons-react'

const cats = [{ key: 'immobilier', l: 'Immobilier' }, { key: 'construction', l: 'Construction' }, { key: 'conseils', l: 'Conseils' }, { key: 'actualites', l: 'Actualités' }]
const emptyForm = { titre: '', slug: '', categorie: 'conseils', auteur: 'Zoro Group SARL', date: new Date().toISOString().slice(0, 10), resume: '', contenu: '', temps_lecture: 3, gradient: 'linear-gradient(135deg, #8B0000, #C0392B)', tags: '', publie: true }
const inp: React.CSSProperties = { width: '100%', fontSize: 12, padding: '9px 12px', border: '0.5px solid #ddd', borderRadius: 4, fontFamily: 'Montserrat,sans-serif', outline: 'none' }

const slugify = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')

export default function AdminArticlesPage() {
  const [items, setItems] = useState<ArticleDB[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<any>(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => { setLoading(true); const { data } = await supabase.from('articles').select('*').order('date', { ascending: false }); setItems(data ?? []); setLoading(false) }
  const showToast = (msg: string, ok: boolean) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000) }
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const handleSave = async () => {
    if (!form.titre || !form.resume || !form.contenu) return
    setSaving(true)
    const payload = { titre: form.titre, slug: form.slug || slugify(form.titre), categorie: form.categorie, auteur: form.auteur, date: form.date, resume: form.resume, contenu: form.contenu, temps_lecture: Number(form.temps_lecture), gradient: form.gradient, tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean), publie: form.publie }
    const { error } = editId ? await supabase.from('articles').update(payload).eq('id', editId) : await supabase.from('articles').insert(payload)
    showToast(error ? 'Erreur : ' + error.message : editId ? 'Article modifié !' : 'Article publié !', !error)
    setSaving(false); setShowForm(false); setEditId(null); setForm(emptyForm); fetchItems()
  }

  const handleEdit = (a: ArticleDB) => { setForm({ titre: a.titre, slug: a.slug, categorie: a.categorie, auteur: a.auteur, date: a.date, resume: a.resume, contenu: a.contenu, temps_lecture: a.temps_lecture, gradient: a.gradient, tags: a.tags?.join(', ') ?? '', publie: a.publie }); setEditId(a.id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const handleDelete = async (id: string) => { const { error } = await supabase.from('articles').delete().eq('id', id); showToast(error ? 'Erreur' : 'Article supprimé', !error); setDeleteId(null); fetchItems() }
  const togglePublie = async (a: ArticleDB) => { await supabase.from('articles').update({ publie: !a.publie }).eq('id', a.id); fetchItems() }

  const catColor: Record<string, string> = { immobilier: '#8B0000', construction: '#1a3a5c', conseils: '#B8952A', actualites: '#1a6b3a' }

  return (
    <AdminLayout>
      {toast && <div style={{ position: 'fixed', top: 20, right: 20, background: toast.ok ? '#1a6b3a' : '#C0392B', color: 'white', padding: '12px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>{toast.ok ? <IconCheck size={16} /> : <IconX size={16} />}{toast.msg}</div>}
      <div style={{ padding: '28px 32px' }}>

        {showForm && (
          <div style={{ background: 'white', borderRadius: 10, padding: 24, marginBottom: 24, border: '0.5px solid #e0e0e0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a' }}>{editId ? 'Modifier l\'article' : 'Nouvel article'}</h2>
              <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}><IconX size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Titre *</label><input style={inp} placeholder="Titre de l'article" value={form.titre} onChange={e => { set('titre', e.target.value); if (!editId) set('slug', slugify(e.target.value)) }} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Catégorie</label><select style={{ ...inp, cursor: 'pointer' }} value={form.categorie} onChange={e => set('categorie', e.target.value)}>{cats.map(c => <option key={c.key} value={c.key}>{c.l}</option>)}</select></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Date</label><input style={inp} type="date" value={form.date} onChange={e => set('date', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Temps de lecture (min)</label><input style={inp} type="number" value={form.temps_lecture} onChange={e => set('temps_lecture', e.target.value)} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Auteur</label><input style={inp} value={form.auteur} onChange={e => set('auteur', e.target.value)} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Résumé *</label><textarea style={{ ...inp, resize: 'vertical' }} rows={2} placeholder="Résumé affiché sur la liste des articles..." value={form.resume} onChange={e => set('resume', e.target.value)} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Contenu *</label><textarea style={{ ...inp, resize: 'vertical' }} rows={8} placeholder="Contenu complet de l'article..." value={form.contenu} onChange={e => set('contenu', e.target.value)} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>Tags (séparés par virgules)</label><input style={inp} placeholder="Immobilier, San Pedro, Investissement" value={form.tags} onChange={e => set('tags', e.target.value)} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, color: '#444' }}><input type="checkbox" style={{ accentColor: '#8B0000', width: 14, height: 14 }} checked={form.publie} onChange={e => set('publie', e.target.checked)} />Publier immédiatement</label></div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} style={{ background: 'white', color: '#666', border: '0.5px solid #ddd', padding: '10px 20px', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleSave} disabled={saving} style={{ background: saving ? '#aaa' : '#8B0000', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: saving ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}><IconCheck size={14} />{saving ? 'Enregistrement...' : editId ? 'Modifier' : 'Publier'}</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div><h1 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}>Articles blog</h1><p style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{items.length} article{items.length > 1 ? 's' : ''}</p></div>
          {!showForm && <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm) }} style={{ background: '#8B0000', color: 'white', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}><IconPlus size={15} />Rédiger</button>}
        </div>

        <div style={{ background: 'white', borderRadius: 10, border: '0.5px solid #e0e0e0', overflow: 'hidden' }}>
          {loading ? <div style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: 13 }}>Chargement...</div> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#F5F5F5', borderBottom: '0.5px solid #e0e0e0' }}>{['Titre', 'Catégorie', 'Date', 'Lecture', 'Statut', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#666' }}>{h}</th>)}</tr></thead>
              <tbody>
                {items.map((a, i) => (
                  <tr key={a.id} style={{ borderBottom: i < items.length - 1 ? '0.5px solid #f0f0f0' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}><div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.titre}</div></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: catColor[a.categorie] + '22', color: catColor[a.categorie], fontSize: 11, padding: '3px 8px', borderRadius: 3, fontWeight: 500, textTransform: 'capitalize' }}>{a.categorie}</span></td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#555' }}>{new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#555' }}>{a.temps_lecture} min</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: a.publie ? '#e8f5e9' : '#f5f5f5', color: a.publie ? '#1a6b3a' : '#999', fontSize: 11, padding: '3px 8px', borderRadius: 3, fontWeight: 500 }}>{a.publie ? 'Publié' : 'Brouillon'}</span></td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => togglePublie(a)} title={a.publie ? 'Dépublier' : 'Publier'} style={{ background: '#f0f0f0', color: '#666', border: 'none', padding: '6px 8px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>{a.publie ? <IconEyeOff size={13} /> : <IconEye size={13} />}</button>
                        <button onClick={() => handleEdit(a)} style={{ background: '#fdf3de', color: '#B8952A', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500 }}><IconEdit size={13} />Modifier</button>
                        {deleteId === a.id ? <div style={{ display: 'flex', gap: 4 }}><button onClick={() => handleDelete(a.id)} style={{ background: '#C0392B', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>Confirmer</button><button onClick={() => setDeleteId(null)} style={{ background: '#f0f0f0', color: '#666', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 11 }}>Annuler</button></div>
                        : <button onClick={() => setDeleteId(a.id)} style={{ background: '#fde8e8', color: '#C0392B', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500 }}><IconTrash size={13} />Supprimer</button>}
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
