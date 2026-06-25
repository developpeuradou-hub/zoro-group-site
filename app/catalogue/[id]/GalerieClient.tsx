'use client'
import { useState } from 'react'
import Image from 'next/image'
import { IconX, IconChevronLeft, IconChevronRight, IconCamera } from '@tabler/icons-react'

type Props = {
  mainImage?: string
  images?: string[]
  titre: string
  gradient: string
}

export default function GalerieClient({ mainImage, images = [], titre, gradient }: Props) {
  const allImages = [mainImage, ...images].filter(Boolean) as string[]
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (allImages.length === 0) {
    return (
      <div style={{ height: 320, background: gradient, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 80, opacity: 0.15, color: 'white' }}>🏠</div>
      </div>
    )
  }

  const prev = () => setActive(a => (a - 1 + allImages.length) % allImages.length)
  const next = () => setActive(a => (a + 1) % allImages.length)

  return (
    <>
      {/* Photo principale */}
      <div style={{ height: 320, background: gradient, borderRadius: 10, overflow: 'hidden', marginBottom: 12, position: 'relative', cursor: 'zoom-in' }} onClick={() => setLightbox(true)}>
        <Image src={allImages[active]} alt={titre} fill style={{ objectFit: 'cover' }} />
        {allImages.length > 1 && (
          <>
            <button onClick={e => { e.stopPropagation(); prev() }} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconChevronLeft size={18} />
            </button>
            <button onClick={e => { e.stopPropagation(); next() }} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconChevronRight size={18} />
            </button>
          </>
        )}
        <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 11, padding: '4px 10px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Montserrat,sans-serif' }}>
          <IconCamera size={12} /> {active + 1} / {allImages.length}
        </div>
      </div>

      {/* Miniatures */}
      {allImages.length > 1 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }}>
          {allImages.map((img, i) => (
            <div key={i} onClick={() => setActive(i)} style={{ width: 72, height: 56, flexShrink: 0, borderRadius: 6, overflow: 'hidden', position: 'relative', cursor: 'pointer', border: active === i ? '2px solid #8B0000' : '2px solid transparent', opacity: active === i ? 1 : 0.65, transition: 'all 0.15s' }}>
              <Image src={img} alt={`${titre} ${i + 1}`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconX size={20} />
          </button>
          {allImages.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); prev() }} style={{ position: 'absolute', left: 20, background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconChevronLeft size={24} />
              </button>
              <button onClick={e => { e.stopPropagation(); next() }} style={{ position: 'absolute', right: 20, background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconChevronRight size={24} />
              </button>
            </>
          )}
          <div style={{ position: 'relative', width: '80vw', height: '80vh', maxWidth: 900 }} onClick={e => e.stopPropagation()}>
            <Image src={allImages[active]} alt={titre} fill style={{ objectFit: 'contain' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 20, color: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: 'Montserrat,sans-serif' }}>
            {active + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  )
}
