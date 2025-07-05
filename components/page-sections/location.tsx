"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRestaurant } from "@/contexts/restaurant-context"
import { InstagramIcon, WhatsAppIcon } from "@/app/icons"
import Link from "next/link"

export function Location() {
  const { data } = useRestaurant()
  const enabledDeliveryZones = data.deliveryZones.filter((zone) => zone.enabled)
  const hours = data.hours.filter((hour) => hour.enabled)

  return (
    <section id="ubicacion" className="py-10 sm:py-10 lg:py-10 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-red-500">DÓNDE</span>
            <span className="text-white"> ESTAMOS</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Visítanos nuestro restaurante en Santiago de Cali.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Información de contacto */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700 hover:border-gray-500 transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="sm:block text-center uppercase">
                    <span className="text-yellow-400 font-extrabold text-2xl ">MAR </span>
                    <span className="text-white font-extrabold text-2xl ">BURGER</span>
                  </div>
                  {/* <h3 className="text-2xl font-bold text-white ">{data.restaurant.name}</h3> pendiente cacar el nombre de aqui en 2 partes separadas */}

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
                      <InstagramIcon className="w-5 h-5 text-red-500 " />
                      <Link
                        href={`https://instagram.com/${data.restaurant.instagram.replace(/^@/, "")}`}
                        className="text-gray-300"
                        target="_blank"
                      >
                        @{data.restaurant.instagram}
                      </Link>
                    </div>

                  </div>

                  {/* horario */}
                  <div className="mt-8">
                    <h4 className="text-xl font-bold text-white mb-4 text-center">Horario de Atención</h4>
                    <div className="space-y-4">
                      {hours.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <span className="text-gray-300">{`${item.day} ${item.open} - ${item.close}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                    <Button
                      onClick={() => window.open(`tel:${data.restaurant.phone}`, "_self")}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold"
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
          </div>

          
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
              <div className="hidden lg:block bg-gray-900 border border-gray-700 rounded-lg overflow-hidden flex-1 flex items-center justify-center ">
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
                  style={{ border: 0, minHeight: 200, width: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
