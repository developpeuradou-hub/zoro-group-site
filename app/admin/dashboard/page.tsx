'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { IconBuilding, IconHome, IconNews, IconMail, IconTrendingUp, IconClock, IconEye } from '@tabler/icons-react'

type Stats = { realisations: number; biens: number; articles: number; messages: number; messages_non_lus: number }

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ realisations: 0, biens: 0, articles: 0, messages: 0, messages_non_lus: 0 })
  const [derniers_messages, setDerniersMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const [r, b, a, m, mnl, msgs] = await Promise.all([
      supabase.from('realisations').select('id', { count: 'exact', head: true }),
      supabase.from('biens').select('id', { count: 'exact', head: true }),
      supabase.from('articles').select('id', { count: 'exact', head: true }),
      supabase.from('messages').select('id', { count: 'exact', head: true }),
      supabase.from('messages').select('id', { count: 'exact', head: true }).eq('lu', false),
      supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(5),
    ])
    setStats({
      realisations: r.count ?? 0,
      biens: b.count ?? 0,
      articles: a.count ?? 0,
      messages: m.count ?? 0,
      messages_non_lus: mnl.count ?? 0,
    })
    setDerniersMessages(msgs.data ?? [])
    setLoading(false)
  }

  const cards = [
    { label: 'Réalisations', value: stats.realisations, icon: IconBuilding, href: '/admin/realisations', color: '#8B0000', bg: '#fde8e8' },
    { label: 'Biens immobiliers', value: stats.biens, icon: IconHome, href: '/admin/biens', color: '#B8952A', bg: '#fdf3de' },
    { label: 'Articles blog', value: stats.articles, icon: IconNews, href: '/admin/articles', color: '#1a3a5c', bg: '#e8f0fa' },
    { label: 'Messages reçus', value: stats.messages, icon: IconMail, href: '/admin/messages', color: '#1a6b3a', bg: '#e8f5e9', badge: stats.messages_non_lus > 0 ? stats.messages_non_lus : undefined },
  ]

  return (
    <AdminLayout>
      <div style={{ padding: '28px 32px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>Tableau de bord</h1>
          <p style={{ fontSize: 12, color: '#666' }}>Bienvenue dans l'espace d'administration Zoro Group SARL</p>
        </div>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {cards.map((c, i) => (
            <Link key={i} href={c.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, padding: '20px 20px', position: 'relative', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                {c.badge && (
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#C0392B', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
                    {c.badge}
                  </div>
                )}
                <div style={{ width: 40, height: 40, background: c.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <c.icon size={20} color={c.color} />
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{loading ? '—' : c.value}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{c.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Derniers messages */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
          <div style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '0.5px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconMail size={16} color="#8B0000" /> Derniers messages
              </div>
              <Link href="/admin/messages" style={{ fontSize: 11, color: '#8B0000', textDecoration: 'none', fontWeight: 500 }}>Voir tout →</Link>
            </div>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: 12 }}>Chargement...</div>
            ) : derniers_messages.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: 12 }}>Aucun message pour l'instant</div>
            ) : (
              derniers_messages.map((msg, i) => (
                <div key={msg.id} style={{ padding: '14px 20px', borderBottom: i < derniers_messages.length - 1 ? '0.5px solid #f8f8f8' : 'none', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: msg.lu ? '#f0f0f0' : '#fde8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: msg.lu ? '#999' : '#8B0000', flexShrink: 0 }}>
                    {msg.nom.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>{msg.nom}</span>
                      {!msg.lu && <span style={{ background: '#C0392B', color: 'white', fontSize: 9, padding: '1px 6px', borderRadius: 10, fontWeight: 600 }}>Nouveau</span>}
                    </div>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.sujet}</div>
                    <div style={{ fontSize: 10, color: '#999', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <IconClock size={9} /> {new Date(msg.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Accès rapides */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                <IconTrendingUp size={15} color="#8B0000" /> Accès rapides
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { href: '/admin/realisations', label: '+ Ajouter une réalisation', color: '#8B0000' },
                  { href: '/admin/biens', label: '+ Ajouter un bien immobilier', color: '#B8952A' },
                  { href: '/admin/articles', label: '+ Rédiger un article', color: '#1a3a5c' },
                  { href: '/admin/messages', label: '📬 Consulter les messages', color: '#1a6b3a' },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{ display: 'block', padding: '9px 14px', background: '#F5F5F5', borderRadius: 6, fontSize: 12, fontWeight: 500, color: item.color, textDecoration: 'none', border: '0.5px solid #e8e8e8' }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ background: '#8B0000', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Site en ligne</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, marginBottom: 14, lineHeight: 1.6 }}>Toutes vos modifications sont visibles sur le site en temps réel.</div>
              <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#B8952A', color: 'white', padding: '9px', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
                <IconEye size={13} style={{ marginRight: 6 }} />
                Voir le site
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
