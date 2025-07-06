"use client"

import type React from "react"
import { Banknote, Smartphone, CreditCard } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"

export function PaymentMethod() {
    const { data } = useRestaurant()

    const enabledPaymentMethods = data.paymentMethods.filter((method) => method.enabled)

    return (
        <section id="payment" className="py-12 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 uppercase">
                        {/* Paga Como Quieras */}
                        <span className="text-yellow-400">MÉTODOS </span>
                        <span className="text-white">DE PAGO</span>
                    </h2>
                    <p className="text-gray-300 text-base sm:text-lg max-w-4xl mx-auto">
                        Elige el que más te guste y disfruta de tu comida sin preocupaciones.
                    </p>
                </div>


                <div className="grid grid-cols-2 sm:flex sm:gap-8 w-full max-w-5xl mx-auto gap-4">
                    {enabledPaymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className="flex flex-col items-center justify-center bg-black p-6 rounded-lg border border-red-600/20 shadow hover:shadow-lg transition w-full"
                        >
                            <div className="mb-3">
                                {method.icon === "banknote" && <Banknote className="w-8 h-8 text-green-500" />}
                                {method.icon === "smartphone" && <Smartphone className="w-8 h-8 text-purple-500" />}
                                {method.icon === "credit-card" && <CreditCard className="w-8 h-8 text-blue-500" />}
                            </div>
                            <span className="text-white font-semibold text-lg">{method.name}</span>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    )
}
