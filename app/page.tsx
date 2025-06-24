import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MenuSection } from "@/components/menu-section"
import { PromotionsCarousel } from "@/components/promotions-carousel"
import { LocationSection } from "@/components/location-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingElements } from "@/components/floating-elements"
// import { AdminAccessButton } from "@/components/admin-access-button"
import { RestaurantProvider } from "@/contexts/restaurant-context"
// import { PaymentMethod } from "@/components/payment-session"

export default function HomePage() {
  return (
    <RestaurantProvider>
      <div className="min-h-screen bg-black relative">
        <FloatingElements />
         <Header />
        <main>
          <HeroSection />
          <MenuSection />
          <PromotionsCarousel />
          {/* <PaymentMethod/> */}
          <LocationSection />
          <ContactSection />
        </main>
        <Footer /> 
        {/* <AdminAccessButton />  */}
      </div>
    </RestaurantProvider>
  )
}
