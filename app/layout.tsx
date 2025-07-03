import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mar Burger - Restaurante de comidas rápidas y mariscos",
  description: "Disfruta las mejores hamburguesas y mariscos en un solo lugar. Calidad, frescura y sabor único en cada bocado.",
  openGraph: {
    title: "Mar Burger",
    description: "Disfruta las mejores hamburguesas y mariscos en un solo lugar. Calidad, frescura y sabor único en cada bocado.",
    url: "https://marburger.vercel.app", 
    images: ["/images/logo.png"],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mar Burger - Restaurante de comidas rápidas y mariscos",
    description: "Disfruta las mejores hamburguesas y mariscos en un solo lugar. Calidad, frescura y sabor único en cada bocado.",
    images: ["/images/logo.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
