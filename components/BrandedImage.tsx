import Image from 'next/image'

type Props = {
  src?: string
  alt: string
  height?: number
  gradient?: string
  showBrand?: boolean
  icon?: string
  children?: React.ReactNode
}

export default function BrandedImage({
  src, alt, height = 280,
  gradient = 'linear-gradient(135deg, #8B0000, #6b0000)',
  showBrand = true, icon = '🏗️', children
}: Props) {
  return (
    <div style={{ position: 'relative', height, borderRadius: 10, overflow: 'hidden' }}>
      {/* Fond / image */}
      {src ? (
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: gradient }} />
      )}

      {/* Overlay sombre si image */}
      {src && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />}

      {/* Icône déco si pas d'image */}
      {!src && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: height * 0.25, opacity: 0.15 }}>
          {icon}
        </div>
      )}

      {/* Contenu custom */}
      {children && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </div>
      )}

      {/* Overlay brand Zoro Group */}
      {showBrand && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)', padding: '20px 16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #B8952A', flexShrink: 0 }}>
            <Image src="/images/logo.png" alt="Zoro Group" width={24} height={24} style={{ objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: 1, fontFamily: 'Montserrat,sans-serif' }}>ZORO GROUP SARL</div>
            <div style={{ color: '#B8952A', fontSize: 8, letterSpacing: 0.5, fontFamily: 'Montserrat,sans-serif' }}>BÂTIR L'AVENIR DES LEADERS</div>
          </div>
        </div>
      )}
    </div>
  )
}
