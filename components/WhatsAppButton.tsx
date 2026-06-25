import { IconBrandWhatsapp } from '@tabler/icons-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2250505020556"
      target="_blank"
      rel="noopener noreferrer"
      title="Contacter via WhatsApp"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
        zIndex: 999,
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      aria-label="Nous contacter sur WhatsApp"
    >
      <IconBrandWhatsapp size={26} color="white" />
    </a>
  )
}
