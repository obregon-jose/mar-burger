import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mar Burger - Las mejores hamburguesas de Cali",
  description: "Disfruta de nuestras deliciosas hamburguesas artesanales preparadas con ingredientes frescos",
  openGraph: {
    title: "Mar Burger",
    description: "Las mejores hamburguesas de Cali, hechas con amor y ingredientes frescos",
    url: "https://marburger.vercel.app", 
    images: ["/images/logo.png"],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mar Burger - Las mejores hamburguesas de Cali",
    description: "Deliciosas hamburguesas artesanales hechas con ingredientes frescos en Cali",
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
