"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {  Send, Banknote, Smartphone, CreditCard } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"
import { InstagramIcon, WhatsAppIcon } from "@/app/icons"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })

  const { data } = useRestaurant()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `¡Hola! Soy ${formData.name}${formData.phone ? ` (${formData.phone})` : ""}\n\n${formData.message}\n\n¡Gracias! 🍔`
    const whatsappUrl = `https://wa.me/57${data.restaurant.phone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setFormData({ name: "", phone: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const enabledPaymentMethods = data.paymentMethods.filter((method) => method.enabled)

  return (
    <section id="contacto" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-red-500">CONTÁCTANOS</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">

                    <WhatsAppIcon className="w-6 h-6 text-white"/>
                    </div>
                  <div>
                    <p className="text-white font-semibold">WhatsApp</p>
                    <p className="text-gray-300">{data.restaurant.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <InstagramIcon className="w-6 h-6 text-white"/>
    
                  </div>
                  <div>
                  <p className="text-white font-semibold">Instagram</p>
                  <a
                    href={data.restaurant.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:underline"
                  >
                    {data.restaurant.instagram?.replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "")}
                  </a>
                  </div>
                </div>

                
              </div>
            </div>

            {enabledPaymentMethods.length > 0 && (
              <div className="bg-gray-900 p-6 rounded-lg border border-red-600/20">
                <h4 className="text-xl font-bold text-white mb-4">Métodos de Pago</h4>
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

          <Card className="bg-gray-900 border-red-600/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje por WhatsApp</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Textarea
                    name="message"
                    placeholder="Cuéntanos sobre tu experiencia o sugerencias"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="bg-black border-red-600/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={!formData.message.trim()}
                >
                  <Send className="w-5 h-5 mr-2" />
                  ENVIAR MENSAJE
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
