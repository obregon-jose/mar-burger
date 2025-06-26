import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mar Burger - Restaurante de comidas rapidas y mariscos",
  description: "Disfruta de nuestras deliciosas ", //Pendiente
  openGraph: {
    title: "Mar Burger",
    description: "", //Pendiente
    url: "https://marburger.vercel.app", 
    images: ["/images/logo.png"],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mar Burger - Restaurante de comidas rapidas y mariscos",
    description: "", //Pendiente
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
