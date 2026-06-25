'use client'
import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { IconUpload, IconX, IconPhoto, IconStar, IconStarFilled } from '@tabler/icons-react'

type Props = {
  mainImage: string
  secondaryImages: string[]
  onMainChange: (url: string) => void
  onSecondaryChange: (urls: string[]) => void
  folder?: string
}

export default function MultiImageUpload({ mainImage, secondaryImages, onMainChange, onSecondaryChange, folder = 'biens' }: Props) {
  const [uploading, setUploading] = useState<'main' | number | null>(null)
  const [error, setError] = useState('')
  const mainRef = useRef<HTMLInputElement>(null)
  const secRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!file.type.startsWith('image/')) { setError('Image uniquement'); return null }
    if (file.size > 5 * 1024 * 1024) { setError('Max 5 Mo'); return null }
    const ext = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const { error: err } = await supabase.storage.from('images').upload(fileName, file, { upsert: true })
    if (err) { setError('Erreur upload : ' + err.message); return null }
    const { data } = supabase.storage.from('images').getPublicUrl(fileName)
    return data.publicUrl
  }

  const handleMain = async (file: File) => {
    setUploading('main'); setError('')
    const url = await uploadFile(file)
    if (url) onMainChange(url)
    setUploading(null)
  }

  const handleSecondary = async (files: FileList) => {
    setError('')
    for (let i = 0; i < files.length; i++) {
      setUploading(secondaryImages.length + i)
      const url = await uploadFile(files[i])
      if (url) onSecondaryChange([...secondaryImages, url])
    }
    setUploading(null)
  }

  const removeMain = async () => {
    if (!mainImage) return
    const path = mainImage.split('/images/')[1]
    if (path) await supabase.storage.from('images').remove([path])
    onMainChange('')
  }

  const removeSecondary = async (index: number) => {
    const url = secondaryImages[index]
    const path = url.split('/images/')[1]
    if (path) await supabase.storage.from('images').remove([path])
    onSecondaryChange(secondaryImages.filter((_, i) => i !== index))
  }

  const setAsMain = (index: number) => {
    const newMain = secondaryImages[index]
    const newSecondary = secondaryImages.filter((_, i) => i !== index)
    if (mainImage) onSecondaryChange([...newSecondary, mainImage])
    else onSecondaryChange(newSecondary)
    onMainChange(newMain)
  }

  const zone = (label: string, onFile: () => void, loading: boolean) => (
    <div
      onClick={onFile}
      onDrop={e => { e.preventDefault() }}
      onDragOver={e => e.preventDefault()}
      style={{ border: `2px dashed ${loading ? '#B8952A' : '#e0e0e0'}`, borderRadius: 8, padding: '20px', textAlign: 'center', cursor: loading ? 'default' : 'pointer', background: loading ? '#fffaf0' : '#fafafa' }}
    >
      {loading ? (
        <>
          <div style={{ width: 30, height: 30, border: '3px solid #e0e0e0', borderTop: '3px solid #B8952A', borderRadius: '50%', margin: '0 auto 8px', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ fontSize: 11, color: '#B8952A', fontFamily: 'Montserrat,sans-serif' }}>Chargement...</p>
        </>
      ) : (
        <>
          <IconUpload size={20} color="#8B0000" style={{ margin: '0 auto 6px' }} />
          <p style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>{label}</p>
          <p style={{ fontSize: 10, color: '#999', fontFamily: 'Montserrat,sans-serif' }}>JPG, PNG — max 5 Mo</p>
        </>
      )}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      {/* Image principale */}
      <div>
        <label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>
          <IconStarFilled size={13} color="#B8952A" /> Image principale
        </label>
        {mainImage ? (
          <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '2px solid #B8952A' }}>
            <div style={{ height: 180, position: 'relative' }}>
              <Image src={mainImage} alt="Image principale" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', top: 8, right: 8 }}>
              <button onClick={removeMain} style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconX size={14} />
              </button>
            </div>
            <div style={{ padding: '6px 10px', background: '#fff8e8', borderTop: '0.5px solid #B8952A', display: 'flex', alignItems: 'center', gap: 5 }}>
              <IconStarFilled size={11} color="#B8952A" />
              <span style={{ fontSize: 10, color: '#B8952A', fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>Image principale — affichée en premier</span>
            </div>
          </div>
        ) : (
          <>
            <input ref={mainRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleMain(f) }} />
            {zone('Cliquez pour ajouter l\'image principale', () => mainRef.current?.click(), uploading === 'main')}
          </>
        )}
      </div>

      {/* Images secondaires */}
      <div>
        <label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>
          <IconPhoto size={13} color="#666" /> Images secondaires ({secondaryImages.length})
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {secondaryImages.map((url, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '0.5px solid #e0e0e0' }}>
              <div style={{ height: 90, position: 'relative' }}>
                <Image src={url} alt={`Image ${i + 1}`} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', top: 4, right: 4, display: 'flex', gap: 3 }}>
                <button onClick={() => setAsMain(i)} title="Définir comme principale" style={{ background: 'rgba(184,149,42,0.85)', color: 'white', border: 'none', width: 22, height: 22, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconStar size={11} />
                </button>
                <button onClick={() => removeSecondary(i)} style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', width: 22, height: 22, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconX size={11} />
                </button>
              </div>
            </div>
          ))}

          {/* Zone ajout */}
          <div>
            <input ref={secRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => { if (e.target.files) handleSecondary(e.target.files) }} />
            <div onClick={() => secRef.current?.click()} style={{ height: 90, border: '2px dashed #e0e0e0', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: typeof uploading === 'number' ? 'default' : 'pointer', background: '#fafafa', gap: 4 }}>
              {typeof uploading === 'number' ? (
                <div style={{ width: 24, height: 24, border: '3px solid #e0e0e0', borderTop: '3px solid #B8952A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              ) : (
                <>
                  <IconUpload size={16} color="#8B0000" />
                  <span style={{ fontSize: 10, color: '#666', fontFamily: 'Montserrat,sans-serif' }}>Ajouter</span>
                </>
              )}
            </div>
          </div>
        </div>

        {secondaryImages.length > 0 && (
          <p style={{ fontSize: 10, color: '#999', marginTop: 6, fontFamily: 'Montserrat,sans-serif' }}>
            ★ = définir comme image principale
          </p>
        )}
      </div>

      {error && <p style={{ fontSize: 11, color: '#C0392B', fontFamily: 'Montserrat,sans-serif' }}>{error}</p>}
    </div>
  )
}
