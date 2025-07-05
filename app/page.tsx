import { RestaurantProvider } from "@/contexts/restaurant-context"
import { FloatingElements } from "@/components/floating-elements"
import { Header } from "@/components/header"
import { Hero } from "@/components/page-sections/hero"
import { Menu } from "@/components/page-sections/menu"
import { Promotions } from "../components/page-sections/promotions"
import { PaymentMethod } from "@/components/page-sections/payment"
import { Location } from "@/components/page-sections/location"
import { Contact } from "@/components/page-sections/contact"
// import { Reviews } from "@/components/page-sections/reviews"
import { Footer } from "@/components/footer"
// import { Questions } from "@/components/page-sections/questions"



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
          <PaymentMethod />
          <Location />
          <Contact />
          {/* <Reviews /> */}
          {/* <Questions /> */}
        </main>
        <Footer /> 
      </div> 
    </RestaurantProvider>
  )
}
