"use client"

import type React from "react"
import { Banknote, Smartphone, CreditCard } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"

export function PaymentMethod() {
    const { data } = useRestaurant()

    const enabledPaymentMethods = data.paymentMethods.filter((method) => method.enabled)

    return (
        <section id="payment" className="py-12 sm:py-16 lg:py-20 bg-black- relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-red-500">Métodos</span>
              <span className="text-white"> de Pago</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
                Ofrecemos múltiples opciones de pago para tu comodidad. Elige la que más te guste y disfruta de tu comida sin preocupaciones.
            </p>
          </div>
          
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {enabledPaymentMethods.length > 0 && (
                            <div className="bg-gray-900 p-6 rounded-lg border border-red-600/20">
                                <h4 className="text-xl font-bold text-white mb-4"> </h4>
                                <div className="grid grid-cols-2 gap-3 text-gray-300 text-sm">
                                    {enabledPaymentMethods.map((method) => (
                                        <div key={method.id} className="flex items-center space-x-2">
                                            {method.icon === "banknote" && <Banknote className="w-4 h-4 text-green-500" />}
                                            {method.icon === "smartphone" && <Smartphone className="w-4 h-4 text-purple-500" />}
                                            {method.icon === "credit-card" && <CreditCard className="w-4 h-4 text-blue-500" />}
                                            <span>{method.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>


                </div>
            </div>
        </section>
    )
}
