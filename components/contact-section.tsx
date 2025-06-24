"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {  Send, Banknote, Smartphone, CreditCard } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"

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

  if (!data.sections.contact.enabled) {
    return null
  }

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
                    {/* WhatsApp icon SVG */}
                    <svg className="w-6 h-6 text-white" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.11 2.37 7.13L4 29l7.13-2.37A11.93 11.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.93 0-3.77-.52-5.36-1.5l-.38-.23-4.24 1.41 1.41-4.24-.23-.38A9.94 9.94 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.83-2.01-.22-.53-.44-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.28-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.59.58.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/>
                    </svg>
                    </div>
                  <div>
                    <p className="text-white font-semibold">WhatsApp</p>
                    <p className="text-gray-300">{data.restaurant.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  {/* Puedes usar un ícono de Instagram de lucide-react si está disponible */}
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <rect width="18" height="18" x="3" y="3" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17" cy="7" r="1" />
                  </svg>
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
