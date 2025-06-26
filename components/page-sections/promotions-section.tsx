import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Percent } from "lucide-react"

export function PromotionsSection() {
  const promotions = [
    {
      id: 1,
      title: "COMBO HAMBURGUESA CLÁSICA",
      description: "Hamburguesa clásica + papa + gaseosa mini",
      originalPrice: "$25.000",
      discountPrice: "$20.000",
      discount: "20%",
      image: "/images/mar-burger-promo.png",
      featured: true,
    },
    {
      id: 2,
      title: "2x1 EN HAMBURGUESAS",
      description: "Compra una hamburguesa y llévate otra gratis",
      originalPrice: "$36.000",
      discountPrice: "$18.000",
      discount: "50%",
      image: "/placeholder.svg?height=400&width=400",
      featured: false,
    },
    {
      id: 3,
      title: "COMBO FAMILIAR",
      description: "4 hamburguesas + 4 papas + 4 gaseosas",
      originalPrice: "$80.000",
      discountPrice: "$65.000",
      discount: "19%",
      image: "/placeholder.svg?height=400&width=400",
      featured: false,
    },
  ]

  return (
    <section id="promociones" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-red-500">PROMOCIONES</span>
            <span className="text-white"> ESPECIALES</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Aprovecha nuestras increíbles ofertas y disfruta de la mejor comida al mejor precio
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <Card
              key={promo.id}
              className={`bg-gray-900 border-red-600/20 hover:border-red-600/40 transition-all duration-300 group ${
                promo.featured ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <CardContent className="p-0">
                <div className={`grid ${promo.featured ? "lg:grid-cols-2" : "grid-cols-1"} h-full`}>
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={promo.image || "/placeholder.svg"}
                      alt={promo.title}
                      width={400}
                      height={400}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        promo.featured ? "h-full" : "h-64"
                      }`}
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                      <Percent className="w-4 h-4" />
                      <span className="font-bold">{promo.discount} OFF</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-center space-y-4">
                    <div>
                      <h3
                        className={`font-bold text-white mb-2 ${promo.featured ? "text-2xl lg:text-3xl" : "text-xl"}`}
                      >
                        {promo.title}
                      </h3>
                      <p className="text-gray-400">{promo.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 line-through text-lg">{promo.originalPrice}</span>
                        <span className={`font-bold text-red-500 ${promo.featured ? "text-3xl" : "text-2xl"}`}>
                          {promo.discountPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-yellow-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Oferta por tiempo limitado</span>
                    </div>

                    <Button
                      className={`bg-red-600 hover:bg-red-700 text-white font-bold ${
                        promo.featured ? "text-lg py-3" : ""
                      }`}
                    >
                      PÍDELO YA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
