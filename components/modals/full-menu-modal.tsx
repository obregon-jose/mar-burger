"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Plus } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"

interface CartItem {
  id: number
  name: string
  price: number
}

export function FullMenuModal({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const { data } = useRestaurant()

  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCart([...cart, item])
  }

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return

    const phoneNumber = data?.restaurant.phone || "573205521623"
    let message = "¡Hola! Me gustaría hacer el siguiente pedido:\n\n"

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - $${item.price.toLocaleString()}\n`
    })

    const total = cart.reduce((sum, item) => sum + item.price, 0)
    message += `\nTotal: $${total.toLocaleString()}\n\n¡Gracias! 🍔`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const categories = [
    { id: "hamburguesas", name: "Hamburguesas", icon: "🍔" },
    { id: "acompañamientos", name: "Acompañamientos", icon: "🍟" },
    { id: "bebidas", name: "Bebidas", icon: "🥤" },
  ]

  const enabledMenuItems = data?.menuItems.filter((item) => item.enabled) || []

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-black border-red-600/20 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            <span className="text-yellow-400">MENÚ</span> COMPLETO
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          <Tabs defaultValue="hamburguesas" className="flex-1">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-red-600/20">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-red-600 text-white"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {enabledMenuItems
                    .filter((item) => item.category === category.id)
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="bg-gray-900 border-red-600/20 hover:border-red-600/40 transition-all"
                      >
                        <CardContent className="p-4">
                          <div className="relative mb-3">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={200}
                              height={150}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            {item.popular && (
                              <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs">POPULAR</Badge>
                            )}
                            {item.stock === "out_of_stock" && (
                              <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                                <Badge variant="destructive" className="text-sm">
                                  AGOTADO
                                </Badge>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                            <p className="text-gray-400 text-xs">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-red-500 font-bold">${item.price.toLocaleString()}</span>
                              <Button
                                size="sm"
                                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                                disabled={item.stock === "out_of_stock"}
                                className="bg-red-600 hover:bg-red-700 text-white h-8 px-3 disabled:opacity-50"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                {item.stock === "out_of_stock" ? "Agotado" : "Agregar"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {cart.length > 0 && (
            <div className="border-t border-red-600/20 pt-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-red-500" />
                  <span className="text-white font-semibold">
                    Carrito ({cart.length} {cart.length === 1 ? "item" : "items"})
                  </span>
                </div>
                <Button onClick={sendWhatsAppOrder} className="bg-green-600 hover:bg-green-700 text-white font-bold">
                  Pedir por WhatsApp
                </Button>
              </div>

              <div className="max-h-32 overflow-y-auto space-y-2">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-red-400">${item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
