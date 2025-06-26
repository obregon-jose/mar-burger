"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  popular: boolean
  enabled: boolean
  stock: "available" | "out_of_stock"
}

interface Promotion {
  id: number
  productId: number
  title?: string 
  description?: string 
  image?: string 
  promotionPrice: number 
  discountPercent: number
  startDate: string
  endDate: string
  enabled: boolean
  featured: boolean
  isFlashSale: boolean 
  flashDurationMinutes?: number 
}

interface Category {
  id: string
  name: string
  icon: string
  enabled: boolean
  order: number
}

interface PaymentMethod {
  id: number
  name: string
  icon: string
  description: string
  enabled: boolean
}

interface DeliveryZone {
  id: number
  name: string
  price: number
  time: string
  enabled: boolean
}

interface Hours {
  [key: string]: {
    open: string
    close: string
    enabled: boolean
  }
}

interface RestaurantData {
  restaurant: {
    name: string
    slug: string
    logo: string
    heroImage: string
    heroSlogan: string
    description: string
    phone: string
    instagram: string
    address: string
    enabled: boolean
  }
  products: Product[]
  promotions: Promotion[]
  categories: Category[]
  paymentMethods: PaymentMethod[]
  deliveryZones: DeliveryZone[]
  hours: Hours
  stats: {
    happyCustomers: number
    averageTime: string
    rating: number
    enabled: boolean
  }

}

interface RestaurantContextType {
  data: RestaurantData
  updateData: (newData: RestaurantData) => void
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void
  addPromotion: (promotion: Omit<Promotion, "id">) => void
  updatePromotion: (id: number, promotion: Partial<Promotion>) => void
  deletePromotion: (id: number) => void
  addCategory: (category: Omit<Category, "id">) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  deleteCategory: (id: string) => void
  loading: boolean
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined)

const initialData: RestaurantData = {
  restaurant: {
    name: "Mar Burger",
    slug: "mar-burger",
    logo: "/images/h.png",
    heroImage: "/images/h.png",
    heroSlogan: "¡Veni y deborala!",
    description:"Restaurante de comidas rapidas y mariscos",
    phone: "3205521623",
    instagram: "@marburgeroficial",
    address: "Carrera 29 #66-05, Ciudad 2000, Cali", //corregir
    enabled: true
  },
  stats: {
    happyCustomers: 500,
    averageTime: "15min",
    rating: 4.9,
    enabled: true,
  },
  hours: {
    monday: { open: "11:00", close: "22:00", enabled: false },
    tuesday: { open: "11:00", close: "22:00", enabled: true },
    wednesday: { open: "11:00", close: "22:00", enabled: true },
    thursday: { open: "11:00", close: "22:00", enabled: true },
    friday: { open: "11:00", close: "22:00", enabled: true },
    saturday: { open: "11:00", close: "23:00", enabled: true },
    sunday: { open: "12:00", close: "22:00", enabled: true },
  },
  deliveryZones: [
    { id: 1, name: "Centro", price: 3000, time: "20-30 min", enabled: true },
    { id: 2, name: "Norte", price: 4000, time: "25-35 min", enabled: true },
    { id: 3, name: "Sur", price: 4000, time: "25-35 min", enabled: true },
    { id: 4, name: "Oeste", price: 5000, time: "30-40 min", enabled: true },
  ],
  paymentMethods: [
    {
      id: 1,
      name: "Efectivo",
      icon: "banknote",
      description: "Pago en efectivo al recibir",
      enabled: true,
    },
    {
      id: 2,
      name: "Nequi",
      icon: "smartphone",
      description: "Transferencia por Nequi",
      enabled: true,
    },
    {
      id: 3,
      name: "Daviplata",
      icon: "smartphone",
      description: "Transferencia por Daviplata",
      enabled: true,
    },
    {
      id: 4,
      name: "Tarjeta",
      icon: "credit-card",
      description: "Tarjeta débito/crédito",
      enabled: true,
    },
  ],

  categories: [
    { id: "hamburguesas", name: "Hamburguesas", icon: "🍔", enabled: true, order: 1 },
    { id: "acompañamientos", name: "Acompañamientos", icon: "🍟", enabled: true, order: 2 },
    { id: "bebidas", name: "Bebidas", icon: "🥤", enabled: true, order: 3 },
  ],
  products: [
    {
      id: 1,
      name: "Hamburguesa Clásica",
      description: "Carne de res, lechuga, tomate, cebolla, queso y salsa especial",
      price: 18000,
      image: "/placeholder.svg?height=300&width=300",
      category: "hamburguesas",
      popular: true,
      enabled: true,
      stock: "available",
    },
    {
      id: 2,
      name: "Hamburguesa BBQ",
      description: "Carne de res, bacon, cebolla caramelizada, queso y salsa BBQ",
      price: 22000,
      image: "/placeholder.svg?height=300&width=300",
      category: "hamburguesas",
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 3,
      name: "Hamburguesa Pollo",
      description: "Pechuga de pollo, lechuga, tomate, aguacate y mayonesa",
      price: 20000,
      image: "/placeholder.svg?height=300&width=300",
      category: "hamburguesas",
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 4,
      name: "Hamburguesa Doble",
      description: "Doble carne, doble queso, lechuga, tomate y salsa especial",
      price: 25000,
      image: "/placeholder.svg?height=300&width=300",
      category: "hamburguesas",
      popular: true,
      enabled: true,
      stock: "available",
    },
    {
      id: 5,
      name: "Papas Fritas",
      description: "Papas crujientes con sal marina",
      price: 8000,
      image: "/placeholder.svg?height=300&width=300",
      category: "acompañamientos",
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 6,
      name: "Aros de Cebolla",
      description: "Aros de cebolla empanizados y fritos",
      price: 10000,
      image: "/placeholder.svg?height=300&width=300",
      category: "acompañamientos",
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 7,
      name: "Gaseosas",
      description: "Coca-Cola, Pepsi, Sprite - 350ml",
      price: 5000,
      image: "/placeholder.svg?height=300&width=300",
      category: "bebidas",
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 8,
      name: "Jugos Naturales",
      description: "Naranja, limón, mora - 400ml",
      price: 7000,
      image: "/placeholder.svg?height=300&width=300",
      category: "bebidas",
      popular: false,
      enabled: true,
      stock: "available",
    },
  ],
  promotions: [
    {
      id: 1,
      productId: 1,
      promotionPrice: 15000,
      discountPercent: 17,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      enabled: true,
      featured: true,
      isFlashSale: false,
    },
    {
      id: 2,
      productId: 4,
      title: "2x1 EN HAMBURGUESAS",
      description: "Compra una hamburguesa doble y llévate otra gratis",
      promotionPrice: 12500,
      discountPercent: 50,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      enabled: true,
      featured: false,
      isFlashSale: false,
    },
  ],

}

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<RestaurantData>(initialData)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedData = localStorage.getItem("restaurant-data")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Migrar datos antiguos si no tienen las nuevas propiedades
        if (parsedData.promotions) {
          parsedData.promotions = parsedData.promotions.map((promo: any) => ({
            ...promo,
            promotionPrice:
              promo.promotionPrice || promo.discountPercent
                ? Math.round(
                    parsedData.products.find((p: any) => p.id === promo.productId)?.price *
                      (1 - promo.discountPercent / 100),
                  )
                : parsedData.products.find((p: any) => p.id === promo.productId)?.price || 0,
            isFlashSale: promo.isFlashSale || false,
          }))
        }
        if (!parsedData.categories) {
          parsedData.categories = initialData.categories
        }
        setData(parsedData)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  const updateData = (newData: RestaurantData) => {
    setData(newData)
    if (mounted) {
      localStorage.setItem("restaurant-data", JSON.stringify(newData))
    }
  }

  const addProduct = (product: Omit<Product, "id">) => {
    const newId = Math.max(...data.products.map((p) => p.id), 0) + 1
    const newProduct = { ...product, id: newId }
    const updatedData = {
      ...data,
      products: [...data.products, newProduct],
    }
    updateData(updatedData)
  }

  const updateProduct = (id: number, productUpdate: Partial<Product>) => {
    const updatedData = {
      ...data,
      products: data.products.map((product) => (product.id === id ? { ...product, ...productUpdate } : product)),
    }
    updateData(updatedData)
  }

  const deleteProduct = (id: number) => {
    const updatedData = {
      ...data,
      products: data.products.filter((product) => product.id !== id),
      promotions: data.promotions.filter((promotion) => promotion.productId !== id),
    }
    updateData(updatedData)
  }

  const addPromotion = (promotion: Omit<Promotion, "id">) => {
    const newId = Math.max(...data.promotions.map((p) => p.id), 0) + 1
    const newPromotion = { ...promotion, id: newId }
    const updatedData = {
      ...data,
      promotions: [...data.promotions, newPromotion],
    }
    updateData(updatedData)
  }

  const updatePromotion = (id: number, promotionUpdate: Partial<Promotion>) => {
    const updatedData = {
      ...data,
      promotions: data.promotions.map((promotion) =>
        promotion.id === id ? { ...promotion, ...promotionUpdate } : promotion,
      ),
    }
    updateData(updatedData)
  }

  const deletePromotion = (id: number) => {
    const updatedData = {
      ...data,
      promotions: data.promotions.filter((promotion) => promotion.id !== id),
    }
    updateData(updatedData)
  }

  const addCategory = (category: Omit<Category, "id">) => {
    const newId = category.name.toLowerCase().replace(/\s+/g, "-")
    const newCategory = { ...category, id: newId }
    const updatedData = {
      ...data,
      categories: [...data.categories, newCategory],
    }
    updateData(updatedData)
  }

  const updateCategory = (id: string, categoryUpdate: Partial<Category>) => {
    const updatedData = {
      ...data,
      categories: data.categories.map((category) =>
        category.id === id ? { ...category, ...categoryUpdate } : category,
      ),
    }
    updateData(updatedData)
  }

  const deleteCategory = (id: string) => {
    const updatedData = {
      ...data,
      categories: data.categories.filter((category) => category.id !== id),
      products: data.products.filter((product) => product.category !== id),
    }
    updateData(updatedData)
  }

  return (
    <RestaurantContext.Provider
      value={{
        data,
        updateData,
        addProduct,
        updateProduct,
        deleteProduct,
        addPromotion,
        updatePromotion,
        deletePromotion,
        addCategory,
        updateCategory,
        deleteCategory,
        loading,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant() {
  const context = useContext(RestaurantContext)
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider")
  }
  return context
}
