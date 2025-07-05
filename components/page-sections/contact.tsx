"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useRestaurant } from "@/contexts/restaurant-context"
// import { InstagramIcon, WhatsAppIcon } from "@/app/icons"

export function Contact() {
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

  return (
    <section id="contacto" className="py-10 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            {/* <span className="text-yellow-400">CONTÁCTANOS</span> */}
            <span className="text-yellow-400">DÉJANOS </span>
            <span className="text-white">TU MENSAJE</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-2xl bg-black border-red-600/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Escríbenos a través de WhatsApp
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Textarea
              name="message"
              placeholder="Cuéntanos sobre tu experiencia o sugerencias"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="bg-gray-900 border-red-600/20 text-white placeholder:text-gray-400"
              required
            />
          </div>
          <Button
            type="submit"
            // className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold"
                              className="bg-red-700 bg-gradient-to-r space-x-2 from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3"

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
