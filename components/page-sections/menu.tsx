"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRestaurant } from "@/contexts/restaurant-context"
import sendWhatsAppMessage from "@/utils/sendWhatsAppMessage"
import { useState, useEffect, useRef } from "react"

export function Menu() {
  const { data } = useRestaurant()
  const [activeCategory, setActiveCategory] = useState("Menú")
  const [searchTerm, setSearchTerm] = useState("")

  const handleOrderProduct = (productName: string, stock: string) => {
    if (stock === "out_of_stock") return
    const message = `¡Hola! Me gustaría pedir ${productName} 🍔`
    sendWhatsAppMessage(data.restaurant.phone, message)
  }

  const categoryMap = new Map<number, string>(
  data.productCategory
    .filter((cat) => cat.enabled)
    .map((cat) => [cat.id, cat.name])
)

const getCategoryName = (category_id?: number): string => {
  return category_id != null && categoryMap.has(category_id)
    ? categoryMap.get(category_id)!
    : "Otros"
}

// Obtener nombres únicos de categorías habilitadas (más "Otros" si aplica)
const categories = Array.from(
  new Set(
    data.products
      .filter((product) => product.enabled)
      .map((product) => getCategoryName(product.category_id))
  )
)

const allCategories = ["Menú", ...categories]

const filteredProducts = data.products
  .filter((product) => product.enabled)
  .filter((product) => {
    if (activeCategory === "Menú") return true
    return getCategoryName(product.category_id) === activeCategory
  })
  .filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

const groupedProducts = categories.reduce((acc, catName) => {
  acc[catName] = filteredProducts.filter(
    (product) => getCategoryName(product.category_id) === catName
  )
  return acc
}, {} as Record<string, typeof data.products>)


  function InfiniteCarousel({ products }: { products: typeof data.products }) {
    const carouselRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [currentX, setCurrentX] = useState(0)

    const cardWidth = 236 // 220px + 16px gap

    // Crear array infinito duplicando productos
    const infiniteProducts = [...products, ...products, ...products]

    // Auto-advance cada 3 segundos - SIMPLIFICADO
    useEffect(() => {
      if (isPaused || isDragging || products.length === 0) return

      const interval = setInterval(() => {
        if (!isTransitioning) {
          setIsTransitioning(true)
          setCurrentIndex(prev => prev + 1)
        }
      }, 3000)

      return () => clearInterval(interval)
    }, [isPaused, isDragging, products.length, isTransitioning])

    // Manejar posición y transiciones
    useEffect(() => {
      const carousel = carouselRef.current
      if (!carousel) return

      const translateX = currentIndex * cardWidth
      
      if (isTransitioning) {
        carousel.style.transition = 'transform 0.5s ease-in-out'
        carousel.style.transform = `translateX(-${translateX}px)`
        
        // Después de la transición, reposicionar si es necesario
        const handleTransitionEnd = () => {
          setIsTransitioning(false)
          
          // Si estamos en el último tercio, saltar al primer tercio
          if (currentIndex >= products.length * 2) {
            carousel.style.transition = 'none'
            const newIndex = currentIndex - products.length
            setCurrentIndex(newIndex)
            carousel.style.transform = `translateX(-${newIndex * cardWidth}px)`
          }
          // Si estamos en el primer tercio y vamos hacia atrás, saltar al segundo tercio
          else if (currentIndex < products.length) {
            carousel.style.transition = 'none'
            const newIndex = currentIndex + products.length
            setCurrentIndex(newIndex)
            carousel.style.transform = `translateX(-${newIndex * cardWidth}px)`
          }
          
          carousel.removeEventListener('transitionend', handleTransitionEnd)
        }
        
        carousel.addEventListener('transitionend', handleTransitionEnd)
        return () => carousel.removeEventListener('transitionend', handleTransitionEnd)
      } else {
        carousel.style.transition = 'none'
        carousel.style.transform = `translateX(-${translateX}px)`
      }
    }, [currentIndex, isTransitioning, products.length, cardWidth])

    // Inicializar en el segundo set para permitir navegación en ambas direcciones
    useEffect(() => {
      if (products.length > 0 && currentIndex === 0) {
        setCurrentIndex(products.length)
      }
    }, [products.length])

    const nextSlide = () => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrentIndex(prev => prev + 1)
    }

    const prevSlide = () => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrentIndex(prev => prev - 1)
    }

    // Eventos de mouse
    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      setStartX(e.clientX)
      setCurrentX(e.clientX)
      setIsPaused(true)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return
      
      setCurrentX(e.clientX)
      const diff = e.clientX - startX
      
      // Aplicar el offset de arrastre en tiempo real
      const carousel = carouselRef.current
      if (carousel) {
        const baseTranslate = currentIndex * cardWidth
        carousel.style.transition = 'none'
        carousel.style.transform = `translateX(-${baseTranslate - diff}px)`
      }
    }

    const handleMouseUp = () => {
      if (!isDragging) return
      
      const diff = currentX - startX
      const threshold = 100 // Mínimo para cambiar slide
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          prevSlide() // Deslizar hacia la derecha = slide anterior
        } else {
          nextSlide() // Deslizar hacia la izquierda = slide siguiente
        }
      } else {
        // Volver a la posición original si no se alcanzó el threshold
        const carousel = carouselRef.current
        if (carousel) {
          carousel.style.transition = 'transform 0.3s ease-out'
          carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`
        }
      }
      
      setIsDragging(false)
      setIsPaused(false)
    }

    // Eventos táctiles
    const handleTouchStart = (e: React.TouchEvent) => {
      setIsDragging(true)
      setStartX(e.touches[0].clientX)
      setCurrentX(e.touches[0].clientX)
      setIsPaused(true)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging) return
      
      setCurrentX(e.touches[0].clientX)
      const diff = e.touches[0].clientX - startX
      
      // Aplicar el offset de arrastre en tiempo real
      const carousel = carouselRef.current
      if (carousel) {
        const baseTranslate = currentIndex * cardWidth
        carousel.style.transition = 'none'
        carousel.style.transform = `translateX(-${baseTranslate - diff}px)`
      }
    }

    const handleTouchEnd = () => {
      if (!isDragging) return
      
      const diff = currentX - startX
      const threshold = 100
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          prevSlide()
        } else {
          nextSlide()
        }
      } else {
        // Volver a la posición original
        const carousel = carouselRef.current
        if (carousel) {
          carousel.style.transition = 'transform 0.3s ease-out'
          carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`
        }
      }
      
      setIsDragging(false)
      setIsPaused(false)
    }

    const handleMouseEnter = () => {
      if (!isDragging) {
        setIsPaused(true)
      }
    }

    const handleMouseLeave = () => {
      if (isDragging) {
        handleMouseUp()
      } else {
        setIsPaused(false)
      }
    }

    // Calcular el índice actual para los indicadores
    const getActiveIndicatorIndex = () => {
      if (currentIndex < products.length) {
        return currentIndex
      } else if (currentIndex >= products.length * 2) {
        return currentIndex - products.length * 2
      } else {
        return currentIndex - products.length
      }
    }

    return (
      <div 
        className="overflow-hidden pb-4 cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={carouselRef}
          className="flex gap-4"
          style={{ width: `${infiniteProducts.length * cardWidth}px` }}
        >
          {infiniteProducts.map((product, index) => {
            const isOutOfStock = product.stock === "out_of_stock"
            return (
              <Card
                key={`${product.id}-${index}`}
                className={`min-w-[220px] max-w-[220px] bg-black border-red-600/20 hover:border-red-600/40 transition-all duration-300 group ${isOutOfStock ? "opacity-75" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <Image
                      src={product?.image || "/images/logo.png"}
                      alt={product.name}
                      width={180}
                      height={180}
                      className="w-full h-32 object-cover rounded-lg pointer-events-none"
                      draggable={false}
                    />
                    {product.popular && !isOutOfStock && (
                      <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs">POPULAR</Badge>
                    )}
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                        <Badge variant="destructive" className="text-base px-2 py-1">
                          AGOTADO
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors text-center">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-xs text-center">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-500">
                        ${product.price.toLocaleString()}
                      </span>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!isDragging) {
                            handleOrderProduct(product.name, product.stock)
                          }
                        }}
                        disabled={isOutOfStock}
                        className={`font-bold ${isOutOfStock
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                      >
                        {isOutOfStock ? "Agotado" : "Pedir"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* Indicadores de navegación */}
        <div className="flex justify-center mt-4 gap-2">
          {products.map((_, index) => {
            const isActive = getActiveIndicatorIndex() === index
            return (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-yellow-400 w-6' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true)
                    setCurrentIndex(products.length + index)
                  }
                }}
              />
            )
          })}
        </div>
      </div>
    )
  }

  function renderCategoryBlock(category: string, products: typeof data.products) {
    if (!products.length) return null

    return (
      <div
        key={category}
        className="mb-12 bg-gray-800 rounded-2xl shadow-lg p-6 border border-yellow-400/30"
      >
        <div className="flex flex-col items-center mb-4 animate-pulse">
            <h3
            className="text-2xl font-extrabold text-center tracking-widest uppercase drop-shadow-lg"
            style={{
              background: "linear-gradient(90deg, #facc15, #ef4444, #facc15)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
            >
            {category}
            </h3>
          <span className="block w-16 h-1 bg-yellow-400 rounded-full mt-1" />
        </div>
        <InfiniteCarousel products={products} />
      </div>
    )
  }

  return (
    <section id="menu" className="py-10 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 animate-pulse-">
            <span className="text-yellow-400">NUESTROS</span>
            <span className="text-white"> PLATOS</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            Descubre nuestras deliciosas opciones preparadas con ingredientes frescos y de la mejor calidad
          </p>
        </div>

        {/* Filtros */}
        <div>
          <div className="mb-5">
            {/* Desktop: horizontal scrollable buttons */}
            <div className="hidden sm:flex flex-wrap justify-center gap-3">
              {allCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  className={`font-bold px-6 py-2 rounded-md ${activeCategory === cat
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-gray-200 hover:bg-yellow-400 hover:text-black"
                    }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            {/* Mobile: select dropdown */}
            <div className="sm:hidden flex justify-center">
              <div className="relative w-full max-w-md">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="block w-full px-4 py-2 rounded-md border border-yellow-400 bg-gray-800 text-gray-200 font-medium shadow focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none"
                  style={{
                    maxWidth: "100vw",
                  }}
                >
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat} className="text-white">
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg border border-yellow-400 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Productos */}
        {filteredProducts.length === 0 ? (

          <div className="mb-12 bg-black rounded-2xl shadow-lg p-6 border border-red-600/20">
            <p className="text-center text-base font-bold text-white transition-colors">
              No hay productos disponibles para esta búsqueda.
            </p>
          </div>

        ) : activeCategory === "Menú" ? (
          categories.map((cat) => renderCategoryBlock(cat, groupedProducts[cat]))
        ) : (
          renderCategoryBlock(activeCategory, filteredProducts)
        )}
      </div>
    </section>
  )
}