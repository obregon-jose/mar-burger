"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category_id: number;
  popular: boolean;
  enabled: boolean;
  stock: "available" | "out_of_stock";
}

interface Promotion {
  id: number;
  productId: number;
  title?: string;
  description?: string;
  image?: string;
  promotionPrice: number;
  discountPercent: number;
  startDate: string;
  endDate: string;
  enabled: boolean;
  featured: boolean;
  isFlashSale: boolean;
  flashDurationMinutes?: number;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  enabled: boolean;
}

interface PaymentMethod {
  id: number;
  name: string;
  icon: string;
  description: string;
  enabled: boolean;
}

interface DeliveryZone {
  id: number;
  name: string;
  price: number;
  time: string;
  enabled: boolean;
}

interface Hours {
  id: number;
  day: string;
  open: string;
  close: string;
  enabled: boolean;
}

interface shoppingCart {
  enabled: boolean;
  items: {
    id: number;
    productId: number;
    quantity: number;
    note?: string;
    image?: string;
    name?: string;
    price?: number;
  }[];
}

interface RestaurantData {
  restaurant: {
    name: string;
    slug: string;
    logo: string;
    heroImage: string;
    heroSlogan: string;
    description: string;
    phone: string;
    instagram: string;
    address: string;
    enabled: boolean;
  };
  products: Product[];
  productCategory: Category[];
  promotions: Promotion[];
  // categories: Category[];
  paymentMethods: PaymentMethod[];
  deliveryZones: DeliveryZone[];
  hours: Hours[];
  stats: {
    happyCustomers: number;
    averageTime: string;
    rating: number;
    enabled: boolean;
  };

  shoppingCarts: shoppingCart;
}

interface RestaurantContextType {
  data: RestaurantData;
  // updateData: (newData: RestaurantData) => void;
  // addProduct: (product: Omit<Product, "id">) => void;
  // updateProduct: (id: number, product: Partial<Product>) => void;
  // deleteProduct: (id: number) => void;
  // addPromotion: (promotion: Omit<Promotion, "id">) => void;
  // updatePromotion: (id: number, promotion: Partial<Promotion>) => void;
  // deletePromotion: (id: number) => void;
  // addCategory: (category: Omit<Category, "id">) => void;
  // updateCategory: (id: string, category: Partial<Category>) => void;
  // deleteCategory: (id: string) => void;
  loading: boolean;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined
);

const initialData: RestaurantData = {
  restaurant: {
    name: "Mar Burger",
    slug: "mar-burger",
    logo: "/images/logo.png",
    heroImage: "",
    heroSlogan: "¡Sabor que conquista el mar y la ciudad!",
    // description:"Disfruta las mejores hamburguesas y platos de mariscos en un solo lugar. Calidad, frescura y sabor único en cada bocado.",
    description: "Disfruta hamburguesas, mariscos, carnes y más en un solo lugar. Calidad, frescura y sabor único en cada bocado.",
    phone: "3205521623",
    instagram: "marburgueroficial",
    // address: "Calle 29 #66-05, Ciudad 2000, Cali",
    address: "Cra. 67a #29-05, Ciudad 2000, Cali",
    enabled: true,
  },
  stats: {
    happyCustomers: 100,
    averageTime: "20min",
    rating: 4.2,
    enabled: true,
  },
  hours: [
    { id: 1, day: "Lunes - Viernes", open: "11:00 am", close: "10:00 pm", enabled: true },
    { id: 2, day: "Sábados", open: "11:00 am", close: "10:00 pm", enabled: true },
    { id: 3, day: "Domingos", open: "12:00 pm", close: "10:00 pm", enabled: true },
  ],
  deliveryZones: [
    { id: 1, name: "Centro", price: 2000, time: "20-30 min", enabled: false },
    { id: 2, name: "Norte", price: 2000, time: "30-40 min", enabled: false },
    { id: 3, name: "Sur", price: 0, time: "10-20 min", enabled: false },
    { id: 4, name: "Oeste", price: 2000, time: "20-30 min", enabled: false },
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
      enabled: false,
    },
    {
      id: 4,
      name: "Tarjeta",
      icon: "credit-card",
      description: "Tarjeta débito/crédito",
      enabled: false,
    },
  ],

  productCategory: [
    {
      id: 1,
      name: "Hamburguesas",
      icon: "🍔",
      enabled: true,
    },
    {
      id: 2,
      name: "Acompañamientos",
      icon: "🍟",
      enabled: true,
    },
    {
      id: 3,
      name: "Bebidas",
      icon: "🥤",
      enabled: true
    },
    {
      id: 4,
      name: "Mariscos",
      icon: "🍤",
      enabled: true
    },
    {
      id: 5,
      name: "Asados",
      icon: "🥩",
      enabled: true
    },
    {
      id: 6,
      name: "Postres",
      icon: "🥩🥩",
      enabled: false
    },
  ],
  products: [
    {
      id: 1,
      name: "Res sencilla",
      description: "",
      price: 0, //
      image: "",
      category_id: 1,
      popular: true,
      enabled: true,
      stock: "available",
    },
    {
      id: 2,
      name: "Res doble",
      description: "", //
      price: 0, //
      image: "",
      category_id: 1,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 4,
      name: "Pollo sencilla",
      description: "", //
      price: 0,
      image: "",
      category_id: 1,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 5,
      name: "Pollo doble",
      description: "", //
      price: 0,
      image: "",
      category_id: 1,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 6,
      name: "Mixta",
      description: "", //
      price: 0,
      image: "",
      category_id: 1,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 7,
      name: "Cazuela de mariscos",
      description: "",
      price: 35000,
      image: "",
      category_id: 4,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 8,
      name: "Camaron apanado",
      description: "",
      price: 0,
      image: "",
      category_id: 4,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 9,
      name: "Camaron al ajillo",
      description: "",
      price: 0,
      image: "",
      category_id: 4,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 10,
      name: "Ceviche de camaron",
      description: "",
      price: 0,
      image: "",
      category_id: 4,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 11,
      name: "Tripletazo de mariscos",
      description: "",
      price: 0,
      image: "",
      category_id: 4,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 12,
      name: "Arroz a la marinela",
      description: "",
      price: 0,
      image: "",
      category_id: 4,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      //mandar a la secion de promociones
      id: 13,
      name: "Arroz de camarones 2x1",
      description: "",
      price: 0,
      image: "",
      category_id: 4,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 14,
      name: "Filete de res",
      description: "",
      price: 0,
      image: "",
      category_id: 5,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 15,
      name: "Filete de pollo",
      description: "",
      price: 0,
      image: "",
      category_id: 5,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 16,
      name: "Filete de cerdo",
      description: "",
      price: 0,
      image: "",
      category_id: 5,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 17,
      name: "Lomo de cerdo",
      description: "",
      price: 0,
      image: "",
      category_id: 5,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 18,
      name: "Punta de ancaa",
      description: "",
      price: 0,
      image: "",
      category_id: 5,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 19,
      name: "Chuleta de pollo",
      description: "",
      price: 0,
      image: "",
      category_id: 5,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 20,
      name: "Chuleta de cerdo",
      description: "",
      price: 0,
      image: "",
      category_id: 5,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 21,
      name: "Costillas a la BBQ",
      description: "",
      price: 0,
      image: "",
      category_id: 5,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 22,
      name: "Picada personal",
      description: "",
      price: 0,
      image: "",
      category_id: 5,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 23,
      name: "Picada Grande",
      description: "",
      price: 0,
      image: "",
      category_id: 5,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 24,
      name: "Jugo de borojo en leche",
      description: "",
      price: 0,
      image: "",
      category_id: 3,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 25,
      name: "Jugo de mango en leche",
      description: "",
      price: 0,
      image: "",
      category_id: 3,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 26,
      name: "Jugo de mora en leche",
      description: "",
      price: 0,
      image: "",
      category_id: 3,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 27,
      name: "Jugo de tomate de arbol en leche",
      description: "",
      price: 0,
      image: "",
      category_id: 3,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 28,
      name: "Jugo de guayaba en leche",
      description: "",
      price: 0,
      image: "",
      category_id: 3,
      popular: false,
      enabled: true,
      stock: "available",
    },
    {
      id: 29,
      name: "Limonada",
      description: "",
      price: 0,
      image: "",
      category_id: 3,
      popular: false,
      enabled: true,
      stock: "available",
    },
  ],

  promotions: [ //analisar que es lo que trae la promocion
    {
      id: 1,
      productId: 1,
      title: "2x1 EN HAMBURGUESAS",
      description: "Compra una hamburguesa doble y llévate otra gratis",
      promotionPrice: 2000,
      discountPercent: 17,
      startDate: "2025-07-01",
      endDate: "2025-07-31",
      enabled: false,
      featured: true,
      isFlashSale: false,
    },
    {
      id: 2,
      productId: 4,
      title: "HAMBURGUESAS",
      description: "Compra una hamburguesa doble y llévate otra gratis",
      promotionPrice: 12500,
      discountPercent: 50,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      enabled: false,
      featured: false,
      isFlashSale: false,
    },
    {
      id: 3,
      productId: 8,
      title: "cc",
      description: "Compra una hamburguesa doble y llévate otra gratis",
      promotionPrice: 1200,
      discountPercent: 10,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      enabled: false,
      featured: false,
      isFlashSale: false,
    },
    {
      id: 8,
      productId: 5,
      title: "papa",
      description: "Compra una hamburguesa doble y llévate otra gratis",
      promotionPrice: 2500,
      discountPercent: 20,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      enabled: false,
      featured: false,
      isFlashSale: false,
    },
  ],
  //quitar se maneja desde sessionstorage
  shoppingCarts: {
    enabled: true,
    items: [
      // {
      //   id: 1,
      //   productId: 1,
      //   quantity: 3,
      //   note: "Sin cebolla",
      //   image: "",
      //   name: "Hamburguesa Clásica",
      //   price: 18000,
      // },
      // {
      //   id: 2,
      //   productId: 5,
      //   quantity: 1,
      //   note: "Con extra sal",
      //   image: "",
      //   name: "Papas Fritas",
      //   price: 8000,
      // },
    ],
  },
};

export function RestaurantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<RestaurantData>(initialData);
  // const [loading, setLoading] = useState(false);
  // const [mounted, setMounted] = useState(false);
  const [loading] = useState(false);
  const [, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem("restaurant-data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Migrar datos antiguos si no tienen las nuevas propiedades
        if (parsedData.promotions) {
          parsedData.promotions = parsedData.promotions.map((promo: Promotion) => ({
            ...promo,
            promotionPrice:
              promo.promotionPrice || promo.discountPercent
                ? Math.round(
                  parsedData.products.find(
                    (p: Product) => p.id === promo.productId
                  )?.price *
                  (1 - promo.discountPercent / 100)
                )
                : parsedData.products.find((p: Product) => p.id === promo.productId)
                  ?.price || 0,
            isFlashSale: promo.isFlashSale || false,
          }));
        }
        if (!parsedData.categories) {
          parsedData.categories = initialData.productCategory;
        }
        setData(parsedData);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  // const updateData = (newData: RestaurantData) => {
  //   setData(newData);
  //   if (mounted) {
  //     localStorage.setItem("restaurant-data", JSON.stringify(newData));
  //   }
  // };

  // const addProduct = (product: Omit<Product, "id">) => {
  //   const newId = Math.max(...data.products.map((p) => p.id), 0) + 1;
  //   const newProduct = { ...product, id: newId };
  //   const updatedData = {
  //     ...data,
  //     products: [...data.products, newProduct],
  //   };
  //   updateData(updatedData);
  // };

  // const updateProduct = (id: number, productUpdate: Partial<Product>) => {
  //   const updatedData = {
  //     ...data,
  //     products: data.products.map((product) =>
  //       product.id === id ? { ...product, ...productUpdate } : product
  //     ),
  //   };
  //   updateData(updatedData);
  // };

  // const deleteProduct = (id: number) => {
  //   const updatedData = {
  //     ...data,
  //     products: data.products.filter((product) => product.id !== id),
  //     promotions: data.promotions.filter(
  //       (promotion) => promotion.productId !== id
  //     ),
  //   };
  //   updateData(updatedData);
  // };

  // const addPromotion = (promotion: Omit<Promotion, "id">) => {
  //   const newId = Math.max(...data.promotions.map((p) => p.id), 0) + 1;
  //   const newPromotion = { ...promotion, id: newId };
  //   const updatedData = {
  //     ...data,
  //     promotions: [...data.promotions, newPromotion],
  //   };
  //   updateData(updatedData);
  // };

  // const updatePromotion = (id: number, promotionUpdate: Partial<Promotion>) => {
  //   const updatedData = {
  //     ...data,
  //     promotions: data.promotions.map((promotion) =>
  //       promotion.id === id ? { ...promotion, ...promotionUpdate } : promotion
  //     ),
  //   };
  //   updateData(updatedData);
  // };

  // const deletePromotion = (id: number) => {
  //   const updatedData = {
  //     ...data,
  //     promotions: data.promotions.filter((promotion) => promotion.id !== id),
  //   };
  //   updateData(updatedData);
  // };

  // const addCategory = (category: Omit<Category, "id">) => {
  //   const newId = category.name.toLowerCase().replace(/\s+/g, "-");
  //   const newCategory = { ...category, id: newId };
  //   const updatedData = {
  //     ...data,
  //     categories: [...data.categories, newCategory],
  //   };
  //   updateData(updatedData);
  // };

  // const updateCategory = (id: string, categoryUpdate: Partial<Category>) => {
  //   const updatedData = {
  //     ...data,
  //     categories: data.categories.map((category) =>
  //       category.id === id ? { ...category, ...categoryUpdate } : category
  //     ),
  //   };
  //   updateData(updatedData);
  // };

  // const deleteCategory = (id: string) => {
  //   const updatedData = {
  //     ...data,
  //     categories: data.categories.filter((category) => category.id !== id),
  //     products: data.products.filter((product) => product.category !== id),
  //   };
  //   updateData(updatedData);
  // };

  return (
    <RestaurantContext.Provider
      value={{
        data,
        // updateData,
        // addProduct,
        // updateProduct,
        // deleteProduct,
        // addPromotion,
        // updatePromotion,
        // deletePromotion,
        // addCategory,
        // updateCategory,
        // deleteCategory,
        loading,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
}
