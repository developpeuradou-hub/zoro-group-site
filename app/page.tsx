import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Partenaires from '@/components/Partenaires'
import ContactBanner from '@/components/ContactBanner'
import Testimonials from '@/components/Testimonials'
import FeaturedPropertiesServer from '@/components/FeaturedPropertiesServer'
import HeroSection, { ServiceBar } from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServiceBar />
        <SearchBar />
        <ServicesSection />
        <FeaturedPropertiesServer />
        <Testimonials />
        <Partenaires />
        <ContactBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
