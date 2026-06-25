'use client'
import { useState } from 'react'
import { IconSearch } from '@tabler/icons-react'

export default function SearchBar() {
  const [form, setForm] = useState({ type: 'Maison / Villa', localisation: 'San Pedro', budget: '50 000 000', transaction: 'Vente' })

  const selectStyle = {
    width: '100%', fontSize: 12, padding: '7px 10px',
    border: '0.5px solid #ddd', borderRadius: 4,
    background: 'white', color: '#1a1a1a',
    fontFamily: 'Montserrat,sans-serif',
  }

  return (
    <div style={{ background: '#F5F5F5', borderBottom: '0.5px solid #e0e0e0', padding: '16px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        {[
          { label: 'Type de bien', key: 'type', options: ['Maison / Villa', 'Appartement', 'Terrain'] },
          { label: 'Localisation', key: 'localisation', options: ['San Pedro', 'Abidjan', 'Toute la CI'] },
          { label: 'Budget max (FCFA)', key: 'budget', options: ['50 000 000', '100 000 000', '200 000 000+'] },
          { label: 'Transaction', key: 'transaction', options: ['Vente', 'Location'] },
        ].map(field => (
          <div key={field.key} style={{ flex: 1, minWidth: 130 }}>
            <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 3, fontFamily: 'Montserrat,sans-serif' }}>{field.label}</label>
            <select style={selectStyle} value={form[field.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}>
              {field.options.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <button style={{ background: '#8B0000', color: 'white', border: 'none', padding: '8px 18px', borderRadius: 4, fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', fontFamily: 'Montserrat,sans-serif' }}>
          <IconSearch size={14} />
          Rechercher
        </button>
      </div>
    </div>
  )
}
