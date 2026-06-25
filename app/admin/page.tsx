'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 500))
    if (password === 'zoro2026admin') {
      localStorage.setItem('zg_admin', 'true')
      router.push('/admin/realisations')
    } else {
      setError('Mot de passe incorrect')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #8B0000, #3a0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'white', borderRadius: 12, padding: '40px 36px', width: '100%', maxWidth: 400, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'white', border: '2px solid #B8952A', overflow: 'hidden', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/images/logo.png" alt="Zoro Group" width={58} height={58} style={{ objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#8B0000', fontFamily: 'Montserrat,sans-serif', marginBottom: 4 }}>Espace Administration</h1>
          <p style={{ fontSize: 12, color: '#666', fontFamily: 'Montserrat,sans-serif' }}>Zoro Group SARL</p>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a', display: 'block', marginBottom: 6, fontFamily: 'Montserrat,sans-serif' }}>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', fontSize: 13, padding: '10px 12px', border: `1px solid ${error ? '#C0392B' : '#ddd'}`, borderRadius: 6, fontFamily: 'Montserrat,sans-serif', outline: 'none' }}
          />
          {error && <p style={{ fontSize: 11, color: '#C0392B', marginTop: 4, fontFamily: 'Montserrat,sans-serif' }}>{error}</p>}
        </div>

        <button
          onClick={handleLogin}
          disabled={loading || !password}
          style={{ width: '100%', background: loading || !password ? '#ccc' : '#8B0000', color: 'white', border: 'none', padding: '12px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: loading || !password ? 'default' : 'pointer', fontFamily: 'Montserrat,sans-serif' }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </div>
    </div>
  )
}
