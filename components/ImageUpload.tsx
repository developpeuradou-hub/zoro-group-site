'use client'
import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react'
import Image from 'next/image'

type Props = {
  value: string
  onChange: (url: string) => void
  folder?: string
}

export default function ImageUpload({ value, onChange, folder = 'general' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('Fichier non valide — image uniquement'); return }
    if (file.size > 5 * 1024 * 1024) { setError('Image trop lourde — max 5 Mo'); return }

    setUploading(true)
    setError('')

    const ext = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, file, { upsert: true })

    if (uploadError) {
      setError('Erreur upload : ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('images').getPublicUrl(fileName)
    onChange(data.publicUrl)
    setUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleRemove = async () => {
    if (!value) return
    // Extraire le path du fichier depuis l'URL publique
    const path = value.split('/images/')[1]
    if (path) await supabase.storage.from('images').remove([path])
    onChange('')
  }

  return (
    <div>
      {value ? (
        <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '0.5px solid #e0e0e0' }}>
          <div style={{ height: 160, position: 'relative' }}>
            <Image src={value} alt="Aperçu" fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', top: 8, right: 8 }}>
            <button
              onClick={handleRemove}
              style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Supprimer l'image"
            >
              <IconX size={14} />
            </button>
          </div>
          <div style={{ padding: '8px 12px', background: '#F5F5F5', borderTop: '0.5px solid #e0e0e0' }}>
            <p style={{ fontSize: 10, color: '#666', fontFamily: 'Montserrat,sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</p>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          style={{ border: `2px dashed ${uploading ? '#B8952A' : '#e0e0e0'}`, borderRadius: 8, padding: '28px 20px', textAlign: 'center', cursor: uploading ? 'default' : 'pointer', background: uploading ? '#fffaf0' : '#fafafa', transition: 'all 0.2s' }}
        >
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
          {uploading ? (
            <>
              <div style={{ width: 36, height: 36, border: '3px solid #e0e0e0', borderTop: '3px solid #B8952A', borderRadius: '50%', margin: '0 auto 10px', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ fontSize: 12, color: '#B8952A', fontFamily: 'Montserrat,sans-serif', fontWeight: 500 }}>Chargement en cours...</p>
            </>
          ) : (
            <>
              <div style={{ width: 40, height: 40, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <IconUpload size={18} color="#8B0000" />
              </div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Montserrat,sans-serif' }}>Cliquez ou glissez une image</p>
              <p style={{ fontSize: 11, color: '#999', fontFamily: 'Montserrat,sans-serif' }}>JPG, PNG, WebP — max 5 Mo</p>
            </>
          )}
        </div>
      )}
      {error && <p style={{ fontSize: 11, color: '#C0392B', marginTop: 6, fontFamily: 'Montserrat,sans-serif' }}>{error}</p>}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
