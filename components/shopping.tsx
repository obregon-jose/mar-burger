"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRestaurant } from "@/contexts/restaurant-context"
import sendWhatsAppMessage from "@/utils/sendWhatsAppMessage"

export function Shopping
() {
    const [cartOpen, setCartOpen] = useState(false)

    const { data } = useRestaurant()

    return (
        <>
            {/* Botón flotante del carrito */}
            {data.shoppingCarts.items.length > 0 && !cartOpen && (
                <div className="fixed bottom-6 right-6 z-50 animate-bounce">
                    <Button
                        className="w-14 h-14 rounded-full bg-yellow-400 animate-pulse hover:bg-yellow-500 text-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 relative"
                        onClick={() => setCartOpen(true)}
                    >
                        <ShoppingCartIcon className="w-8 h-8" />
                        {/* Badge de cantidad de productos */}
                        {Array.isArray(data.shoppingCarts.items) && data.shoppingCarts.items.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                                {data.shoppingCarts.items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0)}
                            </span>
                        )}
                    </Button>

                </div>
            )}
            {/* Carrito deslizante */}
            {cartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="bg-white w-full max-w-md h-full shadow-lg overflow-y-auto p-4 relative animate-slide-in-right">
                        <button
                            onClick={() => setCartOpen(false)}
                            className="absolute top-4 right-4 text-black hover:text-red-600"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>

                        {data.shoppingCarts.items.map((item: any) => (
                            <div key={item.id} className="flex items-center mb-4 border-b pb-4">
                                <Image src={item.image} alt={item.name} width={64} height={64} className="rounded object-cover" />
                                <div className="ml-4 flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                                    {item.note && <p className="text-sm text-gray-500 italic">Nota: {item.note}</p>}
                                </div>
                                <span className="font-bold">${item.price.toLocaleString()}</span>
                            </div>
                        ))}

                        <div className="mt-6 text-right">
                            <Button onClick={() => sendWhatsAppMessage(data.restaurant.phone)} className="bg-green-500 text-white">
                                Finalizar pedido
                            </Button>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}
