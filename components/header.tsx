"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRestaurant } from "@/contexts/restaurant-context"
import { WhatsAppIcon } from "@/app/icons"
// import sendWhatsAppMessage from "@/utils/sendWhatsAppMessage"
import { Shopping } from "./shopping"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const { data } = useRestaurant()

  const navItems = [
    { id:"inicio", href: "#inicio", label: "Inicio" },
    { id:"menu", href: "#menu", label: "Menú" },
    { id:"promociones", href: "#promociones", label: "Promociones" },
    { id:"ubicacion", href: "#ubicacion", label: "Visítanos" },
    { id:"contacto", href: "#contacto", label: "Contáctanos" },
  ]

  return (
    <>
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-red-600/20 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600- to-red-700- rounded-full flex items-center justify-center">
                <Image
                  src={data.restaurant.logo}
                  alt="Logo de Mar Burger"
                  width={64}
                  height={64}
                  className="w-full- h-full- object-contain-"
                  priority
                />
              </div>
              <div className="sm:block uppercase">
                <span className="text-yellow-400 font-extrabold text-2xl ">MAR </span>
                <span className="text-white font-extrabold text-2xl ">BURGER</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-yellow-400 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <WhatsAppIcon className="w-6 h-6 text-red-500" />
                <span className="text-sm">{data.restaurant.phone}</span>
              </div>

              {/* <Button
                onClick={() => sendWhatsAppMessage(data.restaurant.phone)}
                
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold">
                PEDIR AHORA
              </Button> */}
            </div>

            {/* MOBILE */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-black border-red-600/20">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-white hover:text-yellow-400 transition-colors font-medium text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {/* <Button 
                  onClick={() => sendWhatsAppMessage(data.restaurant.phone)} 
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold flex items-center space-x-2"
                  >
                    PEDIR AHORA
                    <WhatsAppIcon className="w-8 h-8 text-white" />
                  </Button> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Shopping Cart */}
      <Shopping />

    </>
  )
}
