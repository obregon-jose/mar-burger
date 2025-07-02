import { RestaurantProvider } from "@/contexts/restaurant-context"
import { FloatingElements } from "@/components/floating-elements"
import { Header } from "@/components/header"
import { Hero } from "@/components/page-sections/hero"
import { Menu } from "@/components/page-sections/menu"
import { Promotions } from "../components/page-sections/promotions"
// import { PromotionsCarousel } from "@/components/page-sections/promotions-carousel"

import { PaymentMethod } from "@/components/page-sections/payment-session"
import { LocationSection } from "@/components/page-sections/location-section"
import { ContactSection } from "@/components/page-sections/contact-section"
import { Footer } from "@/components/footer"


// import { AdminAccessButton } from "@/components/admin-access-button"
// import { PaymentMethod } from "@/components/payment-session"

export default function HomePage() {
  return (
    <RestaurantProvider>
       <div className="min-h-screen bg-black relative">
        <FloatingElements />
        <Header />
        <main>
          <Hero />
          <Menu />
          <Promotions />
          {/* <PaymentMethod /> */}
          {/* <LocationSection /> */}
          {/* <ContactSection /> */}
          {/* reseñas */}
          {/* preguntas frecuentes */}
        </main>
        {/* <Footer />  */}
        {/* <AdminAccessButton /> */}
      </div> 
    </RestaurantProvider>
  )
}
