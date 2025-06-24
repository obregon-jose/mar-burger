import Link from "next/link"
import { MapPin } from "lucide-react"

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
                <svg className="w-4 h-4 text-red-500" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.11 2.37 7.13L4 29l7.13-2.37A11.93 11.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.93 0-3.77-.52-5.36-1.5l-.38-.23-4.24 1.41 1.41-4.24-.23-.38A9.94 9.94 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.83-2.01-.22-.53-.44-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.28-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.59.58.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/>
                    </svg>
                <span className="text-gray-400 text-sm">3205521623</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <rect width="18" height="18" x="3" y="3" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17" cy="7" r="1" />
                  </svg>
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
