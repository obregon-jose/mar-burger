"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRestaurant } from "@/contexts/restaurant-context"
import sendWhatsAppMessage from "@/utils/sendWhatsAppMessage"
import { useState } from "react"

export function Menu() {
  const { data } = useRestaurant()
  const [activeCategory, setActiveCategory] = useState("Menú")
  const [searchTerm, setSearchTerm] = useState("")

  const handleOrderProduct = (productName: string, stock: string) => {
    if (stock === "out_of_stock") return
    const message = `¡Hola! Me gustaría pedir ${productName} 🍔`
    sendWhatsAppMessage(data.restaurant.phone, message)
  }

  const categories = Array.from(
    new Set(data.products.filter((p) => p.enabled).map((p) => p.category || "Otros"))
  )
  const allCategories = ["Menú", ...categories]

  const filteredProducts = data.products
    .filter((product) => product.enabled)
    .filter((product) => {
      if (activeCategory === "Menú") return true
      return (product.category || "Otros") === activeCategory
    })
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const groupedProducts = categories.reduce((acc, cat) => {
    acc[cat] = filteredProducts.filter((p) => (p.category || "Otros") === cat)
    return acc
  }, {} as Record<string, typeof data.products>)

  function renderCategoryBlock(category: string, products: typeof data.products) {
    if (!products.length) return null

    return (
      <div
        key={category}
        className="mb-12 bg-gray-800 rounded-2xl shadow-lg p-6 border border-yellow-400/30"
      >
        <div className="flex flex-col items-center mb-4 animate-pulse">
          <h3 className="text-2xl font-extrabold text-center tracking-widest uppercase bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
            {category}
          </h3>
          <span className="block w-16 h-1 bg-yellow-400 rounded-full mt-1" />
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[220px] justify-center">
            {products.map((product) => {
              const isOutOfStock = product.stock === "out_of_stock"
              return (
                <Card
                  key={product.id}
                  className={`min-w-[220px] max-w-[220px] bg-black border-red-600/20 hover:border-red-600/40 transition-all duration-300 group ${isOutOfStock ? "opacity-75" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={180}
                        height={180}
                        className="w-full h-32 object-cover rounded-lg"
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
                          onClick={() => handleOrderProduct(product.name, product.stock)}
                          disabled={isOutOfStock}
                          className={`font-bold ${isOutOfStock
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 text-white"
                            }`}
                        >
                          {isOutOfStock ? "AGOTADO" : "Pedir"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="menu" className="py-15 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 animate-pulse-">
            <span className="text-yellow-400">NUESTROS</span>
            <span className="text-white"> PLATOS</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto text-center">
            Descubre nuestras deliciosas opciones preparadas con ingredientes frescos y de la mejor calidad
          </p>
        </div>

        {/* Filtros */}
        <div>
          {/* Categorías */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
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
