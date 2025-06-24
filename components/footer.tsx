import Link from "next/link"
import { MapPin } from "lucide-react"
import { InstagramIcon, WhatsAppIcon } from "@/app/icons"

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-red-600/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MB</span>
              </div>
              <div>
                <span className="text-yellow-400 font-bold text-xl">MAR</span>
                <span className="text-white font-bold text-xl">BURGER</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Las mejores hamburguesas artesanales de Cali, preparadas con ingredientes frescos y de la mejor calidad.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#inicio" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#menu" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Menú
                </Link>
              </li>
              <li>
                <Link href="#promociones" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Promociones
                </Link>
              </li>
              <li>
                <Link href="#ubicacion" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Ubicación
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <WhatsAppIcon className="w-4 h-4 text-red-500 "/>
                <span className="text-gray-400 text-sm">3205521623</span>
              </li>
              <li className="flex items-center space-x-2">
                <InstagramIcon className="w-4 h-4 text-red-500"/>
                
                <span className="text-gray-400 text-sm">@marburgeroficial</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                <span className="text-gray-400 text-sm">Calle 15 #8-45, Centro, Cali</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Horarios</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-gray-400">
                <span>Lun - Vie:</span>
                <span>11AM - 10PM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Sábados:</span>
                <span>11AM - 11PM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Domingos:</span>
                <span>12PM - 10PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-600/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Mar Burger. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm">
            Sitio Web Diseñado y Desarrollado por José Benildo Obregón Vallecilla
          </p>
        </div>
      </div>
    </footer>
  )
}
