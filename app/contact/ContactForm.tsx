'use client'
import { useState } from 'react'
import { IconSend, IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { supabase } from '@/lib/supabase'

type FormData = {
  nom: string
  telephone: string
  email: string
  sujet: string
  message: string
  whatsapp: boolean
  consentement: boolean
}

const initialForm: FormData = {
  nom: '', telephone: '', email: '', sujet: '', message: '',
  whatsapp: false, consentement: true,
}

const sujets = [
  'Demande de devis — Construction',
  "Achat d'un bien immobilier",
  "Location d'un bien",
  'Gestion immobilière',
  'Rénovation / Aménagement',
  'Autre demande',
]

const inp: React.CSSProperties = {
  width: '100%', fontSize: 12, padding: '10px 12px',
  border: '0.5px solid #ddd', borderRadius: 4,
  fontFamily: 'Montserrat,sans-serif', color: '#1a1a1a',
  background: 'white', outline: 'none',
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const set = (k: keyof FormData, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.nom.trim()) e.nom = 'Nom requis'
    if (!form.telephone.trim()) e.telephone = 'Téléphone requis'
    if (!form.sujet) e.sujet = 'Sujet requis'
    if (!form.message.trim()) e.message = 'Message requis'
    if (!form.consentement) e.consentement = 'Consentement requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    await supabase.from('messages').insert({
      nom: form.nom, telephone: form.telephone,
      email: form.email || null, sujet: form.sujet,
      message: form.message, whatsapp: form.whatsapp,
    })
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 24px' }}>
        <div style={{ width: 60, height: 60, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <IconCheck size={28} color="#8B0000" />
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>Message envoyé !</h2>
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, marginBottom: 24, fontFamily: 'Montserrat,sans-serif' }}>
          Merci {form.nom.split(' ')[0]}, nous avons bien reçu votre message.<br />Notre équipe vous répondra dans les 24 heures.
        </p>
        <button onClick={() => { setSent(false); setForm(initialForm) }} style={{ background: '#8B0000', color: 'white', border: 'none', padding: '11px 24px', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 20, height: 1, background: '#C0392B' }} />
        <span style={{ color: '#C0392B', fontSize: 10, fontWeight: 600, letterSpacing: 2, fontFamily: 'Montserrat,sans-serif' }}>FORMULAIRE</span>
      </div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Montserrat,sans-serif' }}>Envoyez-nous un message</h2>
      <p style={{ fontSize: 12, color: '#666', marginBottom: 22, fontFamily: 'Montserrat,sans-serif' }}>Nous vous répondrons dans les 24 heures.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 500, color: '#1a1a1a', display: 'block', marginBottom: 5, fontFamily: 'Montserrat,sans-serif' }}>Nom complet <span style={{ color: '#C0392B' }}>*</span></label>
          <input style={{ ...inp, borderColor: errors.nom ? '#C0392B' : '#ddd' }} placeholder="Ex : Koné Arouna" type="text" value={form.nom} onChange={e => set('nom', e.target.value)} />
          {errors.nom && <span style={{ fontSize: 10, color: '#C0392B', fontFamily: 'Montserrat,sans-serif' }}>{errors.nom}</span>}
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 500, color: '#1a1a1a', display: 'block', marginBottom: 5, fontFamily: 'Montserrat,sans-serif' }}>Téléphone <span style={{ color: '#C0392B' }}>*</span></label>
          <input style={{ ...inp, borderColor: errors.telephone ? '#C0392B' : '#ddd' }} placeholder="+225 XX XX XX XX XX" type="tel" value={form.telephone} onChange={e => set('telephone', e.target.value)} />
          {errors.telephone && <span style={{ fontSize: 10, color: '#C0392B', fontFamily: 'Montserrat,sans-serif' }}>{errors.telephone}</span>}
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 11, fontWeight: 500, color: '#1a1a1a', display: 'block', marginBottom: 5, fontFamily: 'Montserrat,sans-serif' }}>Adresse email</label>
        <input style={inp} placeholder="exemple@email.com" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 11, fontWeight: 500, color: '#1a1a1a', display: 'block', marginBottom: 5, fontFamily: 'Montserrat,sans-serif' }}>Sujet <span style={{ color: '#C0392B' }}>*</span></label>
        <select style={{ ...inp, borderColor: errors.sujet ? '#C0392B' : '#ddd', cursor: 'pointer' }} value={form.sujet} onChange={e => set('sujet', e.target.value)}>
          <option value="">Sélectionnez un sujet</option>
          {sujets.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.sujet && <span style={{ fontSize: 10, color: '#C0392B', fontFamily: 'Montserrat,sans-serif' }}>{errors.sujet}</span>}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 11, fontWeight: 500, color: '#1a1a1a', display: 'block', marginBottom: 5, fontFamily: 'Montserrat,sans-serif' }}>Message <span style={{ color: '#C0392B' }}>*</span></label>
        <textarea style={{ ...inp, borderColor: errors.message ? '#C0392B' : '#ddd', resize: 'vertical' }} rows={5} placeholder="Décrivez votre projet ou votre demande en détail..." value={form.message} onChange={e => set('message', e.target.value)} />
        {errors.message && <span style={{ fontSize: 10, color: '#C0392B', fontFamily: 'Montserrat,sans-serif' }}>{errors.message}</span>}
      </div>

      <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" style={{ accentColor: '#8B0000', width: 14, height: 14 }} checked={form.whatsapp} onChange={e => set('whatsapp', e.target.checked)} />
          <span style={{ fontSize: 11, color: '#666', fontFamily: 'Montserrat,sans-serif' }}>Je souhaite être recontacté par WhatsApp</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" style={{ accentColor: '#8B0000', width: 14, height: 14 }} checked={form.consentement} onChange={e => set('consentement', e.target.checked)} />
          <span style={{ fontSize: 11, color: '#666', fontFamily: 'Montserrat,sans-serif' }}>J'accepte d'être contacté par Zoro Group SARL <span style={{ color: '#C0392B' }}>*</span></span>
        </label>
        {errors.consentement && <span style={{ fontSize: 10, color: '#C0392B', fontFamily: 'Montserrat,sans-serif' }}>Veuillez accepter pour continuer</span>}
      </div>

      <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: loading ? '#aaa' : '#8B0000', color: 'white', border: 'none', padding: 13, borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: loading ? 'default' : 'pointer', fontFamily: 'Montserrat,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <IconSend size={15} />{loading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
        <div style={{ flex: 1, height: 0.5, background: '#e0e0e0' }} />
        <span style={{ fontSize: 11, color: '#999', fontFamily: 'Montserrat,sans-serif' }}>ou directement via</span>
        <div style={{ flex: 1, height: 0.5, background: '#e0e0e0' }} />
      </div>

      <a href="https://wa.me/2250505020556" target="_blank" rel="noopener noreferrer" style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: 12, borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}>
        <IconBrandWhatsapp size={16} />Discuter sur WhatsApp
      </a>
    </div>
  )
}
