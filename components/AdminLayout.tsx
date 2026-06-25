'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { IconLayoutDashboard, IconBuilding, IconHome, IconNews, IconMail, IconLogout, IconExternalLink } from '@tabler/icons-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: IconLayoutDashboard },
  { href: '/admin/realisations', label: 'Réalisations', icon: IconBuilding },
  { href: '/admin/biens', label: 'Biens immobiliers', icon: IconHome },
  { href: '/admin/articles', label: 'Articles blog', icon: IconNews },
  { href: '/admin/messages', label: 'Messages', icon: IconMail },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('zg_admin') !== 'true') {
      router.push('/admin')
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('zg_admin')
    router.push('/admin')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Montserrat,sans-serif', background: '#F5F5F5' }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: '#1a1a1a', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'fixed', top: 0, bottom: 0, left: 0 }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #B8952A', flexShrink: 0 }}>
              <Image src="/images/logo.png" alt="Zoro Group" width={32} height={32} style={{ objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>ZORO GROUP</div>
              <div style={{ color: '#B8952A', fontSize: 9, letterSpacing: 1 }}>ADMINISTRATION</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {navItems.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', textDecoration: 'none', background: active ? 'rgba(139,0,0,0.6)' : 'transparent', borderLeft: active ? '3px solid #B8952A' : '3px solid transparent', transition: 'all 0.15s' }}>
                <item.icon size={16} color={active ? '#B8952A' : 'rgba(255,255,255,0.5)'} />
                <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? 'white' : 'rgba(255,255,255,0.55)' }}>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer sidebar */}
        <div style={{ padding: '12px 20px 20px', borderTop: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.4)', fontSize: 11, textDecoration: 'none' }}>
            <IconExternalLink size={13} /> Voir le site
          </a>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.4)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Montserrat,sans-serif' }}>
            <IconLogout size={13} /> Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}
