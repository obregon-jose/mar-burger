"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"
import { InstagramIcon, WhatsAppIcon } from "@/app/icons"
import Image from "next/image"
import { useRestaurant } from "@/contexts/restaurant-context"

export function Footer() {
  const { data } = useRestaurant()
  const hours = data.hours.filter((hour) => hour.enabled)

  const navItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#menu", label: "Menú" },
    { href: "#promociones", label: "Promociones" },
    { href: "#ubicacion", label: "Visítanos" },
  ]
  return (
    <footer className="bg-black border-t border-red-600/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600- to-red-700- rounded-full flex items-center justify-center">
                <Image
                  src={data.restaurant.logo}
                  alt="Logo de Mar Burger"
                  width={64}
                  height={64}
                  className="w-full- h-full- object-contain-"
                  priority
                />
              </div>
              <div className="sm:block- uppercase">
                <span className="text-yellow-400 font-bold text-xl">MAR </span>
                <span className="text-white font-bold text-xl">BURGER</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              {data.restaurant.description}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">

              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <WhatsAppIcon className="w-4 h-4 text-red-500 " />
                <span className="text-gray-400 text-sm">{data.restaurant.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <InstagramIcon className="w-4 h-4 text-red-500" />
                <Link
                  href={`https://instagram.com/${data.restaurant.instagram.replace(/^@/, "")}`}
                  className="text-gray-400 text-sm"
                  target="_blank"
                >
                  @{data.restaurant.instagram}
                </Link>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                <span className="text-gray-400 text-sm">{data.restaurant.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Horarios</h4>
            <ul className="space-y-2 text-sm">

              {hours.map((item) => (
                <li key={item.id} className="flex justify-between text-gray-400">
                  <span>{item.day}</span>
                  <span>{`${item.open} - ${item.close}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-red-600/20 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} {data.restaurant.name}. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm">
            <span>Desarrollado por </span>
            <Link
              href="https://www.linkedin.com/in/obregon-jose"
              target="_blank"
            >
              José Obregón
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
