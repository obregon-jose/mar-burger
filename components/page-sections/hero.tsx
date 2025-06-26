"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"

export function Hero() {
  const { data } = useRestaurant()

  // const handleOrderClick = () => {
  //   const message = "¡Hola! Me gustaría hacer un pedido en Mar Burger 🍔"
  //   const whatsappUrl = `https://wa.me/57${data.restaurant.phone}?text=${encodeURIComponent(message)}`
  //   window.open(whatsappUrl, "_blank")
  // }

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu")
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen bg-black flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-yellow-400/20" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white text-sm">{data.restaurant.heroSlogan}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                <div className="flex-1">
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                    <span className="text-yellow-400">MAR</span>
                    <span className="text-white"> BURGER</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-300 max-w-lg mt-4">{data.restaurant.description}</p>
                </div>

                {/* Imagen visible solo en tablet (md) y oculta en móvil y desktop */}
                <div className="hidden md:block lg:hidden mt-6 md:mt-0 flex-shrink-0">
                  <div className="relative w-48 h-48">
                    <Image
                      src={data.restaurant.heroImage}
                      alt="Hamburguesa Clásica Mar Burger"
                      width={200}
                      height={200}
                      className="w-full h-full object-contain"
                      priority
                    />
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-600/20 rounded-full blur-2xl animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={scrollToMenu}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                VER MENÚ
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              {/* <Button
                size="lg"
                onClick={handleOrderClick}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                PEDIR AHORA
              </Button> */}
            </div>

            {data.stats.enabled && (
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{data.stats.happyCustomers}+</div>
                  <div className="text-gray-400 text-sm">Clientes Felices</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{data.stats.averageTime}</div>
                  <div className="text-gray-400 text-sm">Tiempo Promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{data.stats.rating}★</div>
                  <div className="text-gray-400 text-sm">Calificación</div>
                </div>
              </div>
            )}
          </div>

          {/* Imagen principal - Solo visible en desktop (lg+) */}
          <div className="hidden lg:block relative">
            <div className="relative z-10">
              <Image
                src={data.restaurant.heroImage}
                alt="Hamburguesa Clásica Mar Burger"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
