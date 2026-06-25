import Link from 'next/link'
import { IconMapPin, IconRuler2, IconBed, IconBath, IconCertificate, IconCar, IconArmchair, IconDroplet, IconCamera } from '@tabler/icons-react'
import { Bien } from '@/lib/data'

export default function BienCard({ bien }: { bien: Bien }) {
  const badgeColor = bien.transaction === 'vente' ? '#8B0000' : '#B8952A'

  return (
    <div style={{
      background: 'white',
      border: '0.5px solid #e8e8e8',
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Image */}
      <div style={{ height: 140, background: bien.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ fontSize: 44, opacity: 0.2, color: 'white' }}>
          {bien.type === 'terrain' ? '🌿' : bien.type === 'immeuble' ? '🏢' : '🏠'}
        </div>
        <div style={{ position: 'absolute', top: 10, left: 10, background: badgeColor, color: 'white', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontWeight: 700, letterSpacing: 0.5, fontFamily: 'Montserrat,sans-serif', textTransform: 'uppercase' }}>
          {bien.transaction}
        </div>
        {bien.coupDeCoeur && (
          <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.55)', color: '#B8952A', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontFamily: 'Montserrat,sans-serif' }}>
            ★ Coup de cœur
          </div>
        )}
        {bien.nouveau && !bien.coupDeCoeur && (
          <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.55)', color: '#B8952A', fontSize: 9, padding: '3px 8px', borderRadius: 2, fontFamily: 'Montserrat,sans-serif' }}>
            Nouveau
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 10, padding: '3px 8px', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}>
          <IconCamera size={11} />
          {bien.photos} photos
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Montserrat,sans-serif' }}>{bien.titre}</h3>
        <p style={{ fontSize: 11, color: '#666', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Montserrat,sans-serif' }}>
          <IconMapPin size={11} color="#8B0000" /> {bien.localisation}
        </p>

        {/* Specs */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12, paddingBottom: 12, borderBottom: '0.5px solid #f0f0f0' }}>
          <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
            <IconRuler2 size={11} /> {bien.superficie} m²
          </span>
          {bien.chambres && (
            <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
              <IconBed size={11} /> {bien.chambres} ch.
            </span>
          )}
          {bien.sallesDeBain && (
            <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
              <IconBath size={11} /> {bien.sallesDeBain} sdb.
            </span>
          )}
          {bien.titreFoncier && (
            <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
              <IconCertificate size={11} /> Titre foncier
            </span>
          )}
          {bien.garage && (
            <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
              <IconCar size={11} /> Garage
            </span>
          )}
          {bien.meuble && (
            <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
              <IconArmchair size={11} /> Meublé
            </span>
          )}
          {bien.piscine && (
            <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Montserrat,sans-serif' }}>
              <IconDroplet size={11} /> Piscine
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#8B0000', fontFamily: 'Montserrat,sans-serif' }}>{bien.prixLabel}</span>
          <Link href={`/catalogue/${bien.id}`} style={{ background: '#8B0000', color: 'white', border: 'none', padding: '6px 14px', borderRadius: 4, fontSize: 10, fontWeight: 600, textDecoration: 'none', fontFamily: 'Montserrat,sans-serif' }}>
            Voir détails →
          </Link>
        </div>
      </div>
    </div>
  )
}
