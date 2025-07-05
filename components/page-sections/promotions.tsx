"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock, Zap } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"
import Image from "next/image"
import sendWhatsAppMessage from "@/utils/sendWhatsAppMessage"
import { Button } from "../ui/button"

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
    <section id="promociones" className="py-10 sm:py-10 lg:py-10 bg-black relative- z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-red-500">PROMOCIONES</span>
            <span className="text-white"> ESPECIALES</span>
          </h2>
          {availableProductsWithPromotions.length > 0 && (
            <p className="text-gray-300 text-base sm:text-lg max-w-4xl mx-auto">
              Aprovecha nuestras increíbles ofertas y disfruta de la mejor comida al mejor precio.
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
          <div className="relative max-w-5xl mx-auto">
            {/* Contenedor del carrusel */}
            <div className="relative max-w-3xl mx-auto overflow-hidden rounded-xl bg-gray-900 border border-red-600/20 shadow-xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {availableProductsWithPromotions.map(({ product, promotion, finalPrice }) => {
                  if (!promotion) return null

                  const displayTitle = promotion.title || `OFERTA ${product.name.toUpperCase()}`
                  const displayDescription = promotion.description || `Descuento especial en ${product.name}`
                  const displayImage = promotion.image || product.image || "/images/logobig.png"

                  return (
                    <div key={product.id} className="w-full flex-shrink-0">
                      <div className="grid lg:grid-cols-2 min-h-[260px] sm:min-h-[320px]">
                        {/* Imagen */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                          <Image
                            src={displayImage}
                            alt={displayTitle}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                          />

                          {/* Badges */}
                          <div>
                            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-red-600/70 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center space-x-1 shadow-xl text-xs sm:text-sm">
                              <span className="font-bold">{promotion.discountPercent}% OFF</span>
                            </div>
                            <div className="absolute top-10 sm:top-12 left-3 sm:left-4 bg-green-600/60  text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center space-x-1 shadow-xl text-xs sm:text-sm">
                              <span className="font-bold">Ahorras: <span className="text-white">${(product.price - finalPrice).toLocaleString()}</span></span>
                            </div>
                          </div>

                          {promotion.featured && (
                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-500 text-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-xl">
                              ⭐ DESTACADA
                            </div>
                          )}

                          {promotion.isFlashSale && (
                            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-orange-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-xl flex items-center space-x-1">
                              <Zap className="w-3 h-3" />
                              <span>RELÁMPAGO</span>
                            </div>
                          )}

                          {product.popular && (
                            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-green-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-xl">
                              🔥 POPULAR
                            </div>
                          )}

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Contenido */}
                        <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-2 sm:space-y-3 bg-gradient-to-br from-gray-900 to-black">
                          <div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 leading-tight">
                              {displayTitle}
                            </h3>
                            <p className="text-gray-300 text-sm sm:text-base mb-1">{displayDescription}</p>
                            <p className="text-gray-400 text-xs">{product.description}</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500 line-through text-base">
                                ${product.price.toLocaleString()}
                              </span>
                              <span className="text-2xl sm:text-3xl font-bold text-red-500">
                                ${finalPrice.toLocaleString()}
                              </span>
                            </div>

                            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-2">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm space-y-1 sm:space-y-0">
                                <div className="flex items-center space-x-1 text-yellow-400">
                                  <Clock className="w-3 h-3" />
                                  <span>
                                    Válida hasta {createDateFromInput(promotion.endDate).toLocaleDateString("es-CO")}
                                    {promotion.isFlashSale && promotion.flashDurationMinutes && (
                                      <span className="ml-1">({promotion.flashDurationMinutes} min)</span>
                                    )}
                                  </span>
                                </div>

                              </div>
                            </div>
                          </div>

                          <Button
                            onClick={() => sendWhatsAppMessage(data.restaurant.phone, `¡Hola! Me interesa la promoción de ${product.name} 🍔`)}
                            className="bg-red-700 bg-gradient-to-r space-x-2 from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3"
                          >
                            🍔 PÍDELO YA
                          </Button>
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
