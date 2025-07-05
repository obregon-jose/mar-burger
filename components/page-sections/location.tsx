"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRestaurant } from "@/contexts/restaurant-context"
import { WhatsAppIcon } from "@/app/icons"

export function Location() {
  const { data } = useRestaurant()
  const enabledDeliveryZones = data.deliveryZones.filter((zone) => zone.enabled)

  return (
    <section id="ubicacion" className="py-10 sm:py-10 lg:py-10 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-red-500">NUESTRA</span>
            <span className="text-white"> UBICACIÓN</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Visítanos en nuestro restaurante en Santiago de Cali
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Información de contacto */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700 hover:border-gray-500 transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white text-center uppercase">{data.restaurant.name}</h3>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{data.restaurant.address}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <WhatsAppIcon className="w-5 h-5 text-red-500 " />
                      <span className="text-gray-300">{data.restaurant.phone}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-gray-300">Lun - Dom: 11:00 AM - 10:00 PM</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                    <Button
                      onClick={() => window.open(`tel:${data.restaurant.phone}`, "_self")}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      LLAMAR
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(
                          `https://maps.google.com/?q=${encodeURIComponent(data.restaurant.address)}`,
                          "_blank",
                        )
                      }
                      variant="outline"
                      className="border-black text-black hover:bg-yellow-400 font-bold"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      CÓMO LLEGAR
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horarios detallados - Solo en desktop y tablet */}
            <div className="hidden sm:block">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-white mb-4 text-center">Horario de Atención</h4>
                  <div className="space-y-2">
                    {Object.entries(data.hours).map(([day, hours]) => {
                      const dayNames = {
                        monday: "Lunes",
                        tuesday: "Martes",
                        wednesday: "Miércoles",
                        thursday: "Jueves",
                        friday: "Viernes",
                        saturday: "Sábado",
                        sunday: "Domingo",
                      }

                      if (!hours.enabled) return null

                      return (
                        <div key={day} className="flex justify-between text-gray-300">
                          <span>{dayNames[day as keyof typeof dayNames]}:</span>
                          <span className="text-yellow-400">
                            {hours.open} - {hours.close}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Informacion de zona */}
          <div className="flex flex-col space-y-6 h-full">
            {/* Zonas de Domicilio */}
            {enabledDeliveryZones.length > 0 && (
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
                <h4 className="text-xl font-bold text-white mb-4 text-center">Zonas de Domicilio</h4>
                <div className="space-y-2 text-gray-300 text-sm">
                  {enabledDeliveryZones.map((zone) => (
                    <div key={zone.id} className="flex justify-between">
                      <span>{zone.name}:</span>
                      <span className="text-red-400">
                        {zone.price === 0 ? "Gratis" : `$${zone.price.toLocaleString()}`} ({zone.time})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mapa */}
            <div className="flex-1 flex flex-col relative">
              <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden flex-1 flex items-center justify-center ">
                {/* <iframe
                title="Mapa de ubicación" 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1084.4465408764856!2d-76.52695766780764!3d3.410456580401372!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6b61f57ac6d%3A0x41b2e6487dc08cf1!2sCra.%2046b%20%2315-57%2C%20Comuna%2010%2C%20Cali%2C%20Valle%20del%20Cauca!5e1!3m2!1ses!2sco!4v1724266764747!5m2!1ses!2sco" 
                width="100%"
                height="100%" 
                style={{ border: 0, minHeight: 256, width: "100%" }}
                allowfullscreen 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                /> */}

                <iframe
                  title="Mapa de ubicación"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(data.restaurant.address)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 256, width: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
