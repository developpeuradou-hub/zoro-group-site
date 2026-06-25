import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ContactBanner from '@/components/ContactBanner'
import { articles } from '@/lib/data'
import { IconClock, IconCalendar, IconArrowLeft, IconTag, IconBrandWhatsapp, IconMail } from '@tabler/icons-react'

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find(a => a.slug === slug)
  if (!article) notFound()

  const autres = articles.filter(a => a.slug !== slug).slice(0, 3)

  const paragraphes = article.contenu.split('\n\n').filter(Boolean)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #8B0000, #6b0000)', padding: '24px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>
              ACCUEIL / BLOG
            </div>
            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 12, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
              <IconArrowLeft size={14} /> Retour au blog
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>

            {/* Article */}
            <article>
              {/* Cover */}
              <div style={{ height: 280, background: article.gradient, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 72, opacity: 0.15, color: 'white' }}>📰</div>
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ background: '#fde8e8', color: '#8B0000', fontSize: 10, padding: '3px 10px', borderRadius: 20, fontWeight: 600, fontFamily: 'Montserrat,sans-serif', textTransform: 'capitalize' }}>
                  {article.categorie}
                </span>
                <span style={{ fontSize: 11, color: '#999', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}>
                  <IconCalendar size={11} /> {formatDate(article.date)}
                </span>
                <span style={{ fontSize: 11, color: '#999', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}>
                  <IconClock size={11} /> {article.tempsLecture} min de lecture
                </span>
                <span style={{ fontSize: 11, color: '#999', fontFamily: 'Montserrat,sans-serif' }}>Par {article.auteur}</span>
              </div>

              <h1 style={{ fontSize: 24, fontWeight: 600, color: '#1a1a1a', marginBottom: 20, lineHeight: 1.3, fontFamily: 'Montserrat,sans-serif' }}>{article.titre}</h1>

              {/* Contenu */}
              <div style={{ fontSize: 14, color: '#444', lineHeight: 1.9, fontFamily: 'Montserrat,sans-serif' }}>
                {paragraphes.map((p, i) => {
                  if (p.startsWith('**') && p.endsWith('**')) {
                    return <h3 key={i} style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', margin: '20px 0 8px', fontFamily: 'Montserrat,sans-serif' }}>{p.replace(/\*\*/g, '')}</h3>
                  }
                  return <p key={i} style={{ marginBottom: 14 }}>{p}</p>
                })}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 24, paddingTop: 20, borderTop: '0.5px solid #f0f0f0' }}>
                <IconTag size={13} color="#8B0000" />
                {article.tags.map(t => (
                  <span key={t} style={{ background: '#fde8e8', color: '#8B0000', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontFamily: 'Montserrat,sans-serif' }}>{t}</span>
                ))}
              </div>

              {/* Partage */}
              <div style={{ marginTop: 24, padding: 20, background: '#F5F5F5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' }}>Cet article vous a été utile ?</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href={`https://wa.me/2250505020556?text=J'ai lu votre article : ${article.titre}`} target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Montserrat,sans-serif' }}>
                    <IconBrandWhatsapp size={14} /> Partager
                  </a>
                  <Link href="/contact" style={{ background: '#8B0000', color: 'white', padding: '8px 16px', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Montserrat,sans-serif' }}>
                    <IconMail size={14} /> Nous contacter
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* CTA */}
              <div style={{ background: '#8B0000', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 6, fontFamily: 'Montserrat,sans-serif' }}>Votre projet immobilier</div>
                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, marginBottom: 16, lineHeight: 1.6, fontFamily: 'Montserrat,sans-serif' }}>Devis gratuit en 24h, équipe disponible 24h/24</div>
                <Link href="/contact" style={{ display: 'block', background: '#B8952A', color: 'white', padding: '10px', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
                  Nous contacter
                </Link>
              </div>

              {/* Autres articles */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginBottom: 12, fontFamily: 'Montserrat,sans-serif' }}>Autres articles</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {autres.map(a => (
                    <Link key={a.id} href={`/blog/${a.slug}`} style={{ display: 'flex', gap: 10, textDecoration: 'none', background: 'white', border: '0.5px solid #e8e8e8', borderRadius: 8, overflow: 'hidden' }}>
                      <div style={{ width: 60, height: 60, background: a.gradient, flexShrink: 0 }} />
                      <div style={{ padding: '8px 10px 8px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4, marginBottom: 3, fontFamily: 'Montserrat,sans-serif' }}>{a.titre}</div>
                        <div style={{ fontSize: 10, color: '#999', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
                          <IconClock size={9} /> {a.tempsLecture} min
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <ContactBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
