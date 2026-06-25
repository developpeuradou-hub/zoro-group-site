'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { IconPhone, IconMenu2, IconX } from '@tabler/icons-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À Propos' },
  { href: '/services', label: 'Services' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav style={{ background: '#8B0000', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #B8952A' }}>
            <Image src="/images/logo.png" alt="Zoro Group SARL" width={36} height={36} style={{ objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, fontFamily: 'Montserrat,sans-serif' }}>ZORO GROUP</div>
            <div style={{ color: '#B8952A', fontSize: 9, letterSpacing: 3, fontWeight: 600, fontFamily: 'Montserrat,sans-serif' }}>SARL</div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', listStyle: 'none', gap: 4, flex: 1, justifyContent: 'center' }}>
          {navLinks.map(l => {
            const active = isActive(l.href)
            return (
              <li key={l.href}>
                <Link href={l.href} style={{
                  color: active ? 'white' : 'rgba(255,255,255,0.75)',
                  fontSize: 12,
                  fontWeight: active ? 700 : 500,
                  padding: '6px 12px',
                  borderRadius: 4,
                  textDecoration: 'none',
                  fontFamily: 'Montserrat,sans-serif',
                  background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                  borderBottom: active ? '2px solid #B8952A' : '2px solid transparent',
                  transition: 'all 0.15s',
                  display: 'block',
                }}>
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <Link href="/contact" style={{ display: 'flex', alignItems: 'center', gap: 7, background: isActive('/contact') ? '#D4AC3A' : '#B8952A', color: 'white', padding: '9px 18px', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: 'Montserrat,sans-serif', transition: 'background 0.15s' }}>
          <IconPhone size={14} /> Contact
        </Link>

        {/* Burger */}
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: 8 }} aria-label="Menu">
          {open ? <IconX size={22} /> : <IconMenu2 size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#6b0000', padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navLinks.map(l => {
            const active = isActive(l.href)
            return (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                color: active ? 'white' : 'rgba(255,255,255,0.85)',
                fontSize: 14,
                fontWeight: active ? 700 : 500,
                padding: '10px 12px',
                borderBottom: '0.5px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                fontFamily: 'Montserrat,sans-serif',
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRadius: 4,
                borderLeft: active ? '3px solid #B8952A' : '3px solid transparent',
              }}>
                {l.label}
              </Link>
            )
          })}
          <Link href="/contact" onClick={() => setOpen(false)} style={{ marginTop: 10, background: '#B8952A', color: 'white', textAlign: 'center', padding: 11, borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}
