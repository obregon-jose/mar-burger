"use client"

import { useState, useEffect } from "react"
import { Percent, ChevronLeft, ChevronRight, Clock, Zap } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"
import Image from "next/image"
import sendWhatsAppMessage from "@/utils/sendWhatsAppMessage"

// Función para obtener fecha en zona horaria de Colombia
const getColombianDate = (date?: Date) => {
  const targetDate = date || new Date()
  return new Date(targetDate.toLocaleString("en-US", { timeZone: "America/Bogota" }))
}

// Función para crear fecha desde string considerando zona horaria de Colombia
const createDateFromInput = (dateString: string) => {
  return new Date(dateString + "T00:00:00-05:00") // Colombia UTC-5
}

export function Promotions() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { data } = useRestaurant()
  const now = getColombianDate()

  const availableProductsWithPromotions = data.products
    .filter((product) => product.enabled && product.stock === "available")
    .map((product) => {
      const promotion = data.promotions.find((promo) => {
        if (!promo.enabled || promo.productId !== product.id) return false
        const startDate = createDateFromInput(promo.startDate)
        const endDate = createDateFromInput(promo.endDate)
        return now >= startDate && now <= endDate
      })

      return {
        product,
        promotion,
        hasPromotion: !!promotion,
        finalPrice: promotion ? promotion.promotionPrice : product.price,
      }
    })
    .filter((item) => item.hasPromotion)

  useEffect(() => {
    if (availableProductsWithPromotions.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % availableProductsWithPromotions.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [availableProductsWithPromotions.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % availableProductsWithPromotions.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + availableProductsWithPromotions.length) % availableProductsWithPromotions.length)

  return (
    <section id="promociones" className="py-12 sm:py-16 lg:py-20 bg-black relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-red-500">PROMOCIONES</span>
            <span className="text-white"> ESPECIALES</span>
          </h2>
          {availableProductsWithPromotions.length > 0 && (
            <p className="text-gray-300 text-base sm:text-lg max-w-4xl mx-auto">
              Aprovecha nuestras increíbles ofertas y disfruta de la mejor comida al mejor precio
            </p>
          )}
        </div>

        {availableProductsWithPromotions.length === 0 ? (
          <div className="text-center">
            <div className="bg-gray-900 border border-red-600/20 rounded-2xl p-8 sm:p-12 max-w-md mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">¡Próximamente!</h3>
              <p className="text-gray-400 text-sm sm:text-base">Estamos preparando increíbles ofertas para ti</p>
            </div>
          </div>
        ) : (
          <div className="relative max-w-6xl mx-auto">
            {/* Contenedor del carrusel */}
            <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-red-600/20 shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {availableProductsWithPromotions.map(({ product, promotion, finalPrice }) => {
                  if (!promotion) return null

                  // Usar título del producto si no tiene título personalizado
                  const displayTitle = promotion.title || `OFERTA ${product.name.toUpperCase()}`
                  const displayDescription = promotion.description || `Descuento especial en ${product.name}`
                  const displayImage = promotion.image || product.image || "/placeholder.svg?height=500&width=600"

                  return (
                    <div key={product.id} className="w-full flex-shrink-0">
                      <div className="grid lg:grid-cols-2 min-h-[400px] sm:min-h-[500px]">
                        {/* Imagen */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                          <Image
                            src={displayImage || "/placeholder.svg"}
                            alt={displayTitle}
                            width={600}
                            height={500}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                          />

                          {/* Badges */}
                          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full flex items-center space-x-1 sm:space-x-2 shadow-xl">
                            <Percent className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="font-bold text-sm sm:text-lg">{promotion.discountPercent}% OFF</span>
                          </div>

                          {promotion.featured && (
                            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-yellow-500 text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl">
                              ⭐ DESTACADA
                            </div>
                          )}

                          {promotion.isFlashSale && (
                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-orange-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl flex items-center space-x-1">
                              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>RELÁMPAGO</span>
                            </div>
                          )}

                          {product.popular && (
                            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-green-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl">
                              🔥 POPULAR
                            </div>
                          )}

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Contenido */}
                        <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-900 to-black">
                          <div>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                              {displayTitle}
                            </h3>
                            <p className="text-gray-300 text-base sm:text-lg mb-2 sm:mb-3">{displayDescription}</p>
                            <p className="text-gray-400 text-sm">{product.description}</p>
                          </div>

                          <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <span className="text-gray-500 line-through text-lg sm:text-xl">
                                ${product.price.toLocaleString()}
                              </span>
                              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-500">
                                ${finalPrice.toLocaleString()}
                              </span>
                            </div>

                            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-3">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm space-y-1 sm:space-y-0">
                                <div className="flex items-center space-x-2 text-yellow-400">
                                  <Clock className="w-4 h-4" />
                                  <span>
                                    Válida hasta {createDateFromInput(promotion.endDate).toLocaleDateString("es-CO")}
                                    {promotion.isFlashSale && promotion.flashDurationMinutes && (
                                      <span className="ml-1">({promotion.flashDurationMinutes} min)</span>
                                    )}
                                  </span>
                                </div>
                                <div className="text-green-400 font-bold">
                                  Ahorras: ${(product.price - finalPrice).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => sendWhatsAppMessage(data.restaurant.phone, `¡Hola! Me interesa la promoción de ${product.name} 🍔`)}
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
                          >
                            🍔 PÍDELO YA
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Botones de navegación */}
            {availableProductsWithPromotions.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-black/80 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 shadow-xl border border-red-600/20"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-black/80 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 shadow-xl border border-red-600/20"
                >
                  <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                </button>
              </>
            )}

            {/* Indicadores */}
            {availableProductsWithPromotions.length > 1 && (
              <div className="flex justify-center space-x-3 mt-6 sm:mt-8">
                {availableProductsWithPromotions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-red-500 w-6 sm:w-8" : "bg-gray-600 hover:bg-gray-500 w-2 sm:w-3"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
