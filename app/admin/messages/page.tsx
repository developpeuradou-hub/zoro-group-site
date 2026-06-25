'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { supabase, MessageDB } from '@/lib/supabase'
import { IconMail, IconMailOpened, IconTrash, IconCheck, IconX, IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'

export default function AdminMessagesPage() {
  const [items, setItems] = useState<MessageDB[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<MessageDB | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const [filtre, setFiltre] = useState<'tous' | 'non_lus' | 'lus'>('tous')

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => { setLoading(true); const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false }); setItems(data ?? []); setLoading(false) }
  const showToast = (msg: string, ok: boolean) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000) }

  const markAsRead = async (id: string) => { await supabase.from('messages').update({ lu: true }).eq('id', id); fetchItems(); if (selected?.id === id) setSelected(s => s ? { ...s, lu: true } : null) }
  const handleDelete = async (id: string) => { const { error } = await supabase.from('messages').delete().eq('id', id); showToast(error ? 'Erreur' : 'Message supprimé', !error); setDeleteId(null); if (selected?.id === id) setSelected(null); fetchItems() }

  const filtered = items.filter(m => filtre === 'tous' ? true : filtre === 'non_lus' ? !m.lu : m.lu)
  const nonLus = items.filter(m => !m.lu).length

  return (
    <AdminLayout>
      {toast && <div style={{ position: 'fixed', top: 20, right: 20, background: toast.ok ? '#1a6b3a' : '#C0392B', color: 'white', padding: '12px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>{toast.ok ? <IconCheck size={16} /> : <IconX size={16} />}{toast.msg}</div>}
      <div style={{ padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 8 }}>
              Messages
              {nonLus > 0 && <span style={{ background: '#C0392B', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>{nonLus} nouveau{nonLus > 1 ? 'x' : ''}</span>}
            </h1>
            <p style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{items.length} message{items.length > 1 ? 's' : ''} au total</p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[{ k: 'tous', l: 'Tous' }, { k: 'non_lus', l: `Non lus (${nonLus})` }, { k: 'lus', l: 'Lus' }].map(f => (
              <button key={f.k} onClick={() => setFiltre(f.k as any)} style={{ background: filtre === f.k ? '#8B0000' : 'white', color: filtre === f.k ? 'white' : '#666', border: `0.5px solid ${filtre === f.k ? '#8B0000' : '#e0e0e0'}`, padding: '7px 14px', borderRadius: 20, fontSize: 11, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', fontWeight: filtre === f.k ? 600 : 400 }}>{f.l}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 16 }}>
          {/* Liste */}
          <div style={{ background: 'white', borderRadius: 10, border: '0.5px solid #e0e0e0', overflow: 'hidden' }}>
            {loading ? <div style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: 13 }}>Chargement...</div>
              : filtered.length === 0 ? <div style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: 13 }}>Aucun message</div>
              : filtered.map((msg, i) => (
                <div key={msg.id} onClick={() => { setSelected(msg); if (!msg.lu) markAsRead(msg.id) }}
                  style={{ padding: '14px 20px', borderBottom: i < filtered.length - 1 ? '0.5px solid #f0f0f0' : 'none', display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', background: selected?.id === msg.id ? '#fde8e8' : msg.lu ? 'white' : '#fffaf8', transition: 'background 0.15s' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: msg.lu ? '#f0f0f0' : '#fde8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: msg.lu ? '#999' : '#8B0000', flexShrink: 0 }}>
                    {msg.nom.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: msg.lu ? 500 : 700, color: '#1a1a1a' }}>{msg.nom}</span>
                      <span style={{ fontSize: 10, color: '#999' }}>{new Date(msg.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#444', marginBottom: 2, fontWeight: msg.lu ? 400 : 600 }}>{msg.sujet}</div>
                    <div style={{ fontSize: 11, color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</div>
                  </div>
                  {!msg.lu && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C0392B', flexShrink: 0, marginTop: 4 }} />}
                </div>
              ))}
          </div>

          {/* Détail */}
          {selected && (
            <div style={{ background: 'white', borderRadius: 10, border: '0.5px solid #e0e0e0', overflow: 'hidden', position: 'sticky', top: 20, alignSelf: 'flex-start' }}>
              <div style={{ background: '#8B0000', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>Détail du message</div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}><IconX size={16} /></button>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '0.5px solid #f0f0f0' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fde8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#8B0000' }}>
                    {selected.nom.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>{selected.nom}</div>
                    <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{new Date(selected.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <IconPhone size={13} color="#8B0000" />
                    <a href={`tel:${selected.telephone}`} style={{ fontSize: 12, color: '#8B0000', textDecoration: 'none', fontWeight: 500 }}>{selected.telephone}</a>
                    {selected.whatsapp && <span style={{ background: '#e8f5e9', color: '#25D366', fontSize: 10, padding: '2px 6px', borderRadius: 3, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3 }}><IconBrandWhatsapp size={10} />WhatsApp</span>}
                  </div>
                  {selected.email && <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><IconMail size={13} color="#8B0000" /><a href={`mailto:${selected.email}`} style={{ fontSize: 12, color: '#8B0000', textDecoration: 'none' }}>{selected.email}</a></div>}
                </div>

                <div style={{ background: '#fde8e8', color: '#8B0000', fontSize: 12, fontWeight: 600, padding: '6px 10px', borderRadius: 4, marginBottom: 12 }}>{selected.sujet}</div>

                <div style={{ background: '#F5F5F5', borderRadius: 8, padding: 14, marginBottom: 16 }}>
                  <p style={{ fontSize: 13, color: '#444', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <a href={`tel:${selected.telephone}`} style={{ flex: 1, background: '#8B0000', color: 'white', padding: '10px', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><IconPhone size={13} />Appeler</a>
                  <a href={`https://wa.me/${selected.telephone.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: '#25D366', color: 'white', padding: '10px', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><IconBrandWhatsapp size={13} />WhatsApp</a>
                </div>

                <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                  {!selected.lu && <button onClick={() => markAsRead(selected.id)} style={{ flex: 1, background: '#f0f0f0', color: '#666', border: 'none', padding: '9px', borderRadius: 4, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}><IconMailOpened size={13} />Marquer lu</button>}
                  {deleteId === selected.id
                    ? <div style={{ flex: 1, display: 'flex', gap: 6 }}><button onClick={() => handleDelete(selected.id)} style={{ flex: 1, background: '#C0392B', color: 'white', border: 'none', padding: '9px', borderRadius: 4, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>Confirmer</button><button onClick={() => setDeleteId(null)} style={{ flex: 1, background: '#f0f0f0', color: '#666', border: 'none', padding: '9px', borderRadius: 4, fontSize: 11, cursor: 'pointer' }}>Annuler</button></div>
                    : <button onClick={() => setDeleteId(selected.id)} style={{ flex: 1, background: '#fde8e8', color: '#C0392B', border: 'none', padding: '9px', borderRadius: 4, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontWeight: 500 }}><IconTrash size={13} />Supprimer</button>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
