"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRestaurant } from "@/contexts/restaurant-context"
import sendWhatsAppMessage from "@/utils/sendWhatsAppMessage"

export function Menu() {
  const { data } = useRestaurant()

  const handleOrderProduct = (productName: string, stock: string) => {
    if (stock === "out_of_stock") return
    const message = `¡Hola! Me gustaría pedir ${productName} 🍔`
    sendWhatsAppMessage(data.restaurant.phone, message)
  }

  return (
    <section id="menu" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-yellow-400">NUESTRO</span>
            <span className="text-white"> MENÚ</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Descubre nuestras deliciosas opciones preparadas con ingredientes frescos y de la mejor calidad
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.products
            .filter((product) => product.enabled)
            .map((product) => {
              const isOutOfStock = product.stock === "out_of_stock"

              return (
                <Card
                  key={product.id}
                  className={`bg-black border-red-600/20 hover:border-red-600/40 transition-all duration-300 group ${
                    isOutOfStock ? "opacity-75" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {product.popular && !isOutOfStock && (
                        <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs">POPULAR</Badge>
                      )}
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                          <Badge variant="destructive" className="text-lg px-4 py-2">
                            AGOTADO
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-red-500">${product.price.toLocaleString()}</span>
                        <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleOrderProduct(product.name, product.stock)}
                          disabled={isOutOfStock}
                          className={`font-bold ${
                            isOutOfStock
                              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                        >
                          {isOutOfStock ? "AGOTADO" : "Pedir ahora"}
                        </Button>
                        {/* <Button
                          size="sm"
                          onClick={() => handleOrderProduct(product.name, product.stock)}
                          disabled={isOutOfStock}
                          className={`font-bold ${
                            isOutOfStock
                              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                        >
                          {isOutOfStock ? "AGOTADO" : "Agregar"}
                        </Button> */}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </div>
         <div className="text-center mt-12">
          {/* <FullMenuModal> */}
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-4">
              VER MENÚ COMPLETO
            </Button>
          {/* </FullMenuModal> */}
        </div>
      </div>
    </section>
  )
}
