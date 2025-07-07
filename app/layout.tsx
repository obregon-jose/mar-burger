import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DEFAULT_SEO, SITE_URL } from "@/lib/seo-config";
import DataSchema from "@/components/data-schema";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: DEFAULT_SEO.title,
    template: `%s | ${DEFAULT_SEO.openGraph.siteName}`,
  },
  description: DEFAULT_SEO.description,
  keywords: DEFAULT_SEO.keywords,
  metadataBase: new URL(SITE_URL),

  openGraph: {
    ...DEFAULT_SEO.openGraph,
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    url: SITE_URL,
  },
  twitter: {
    ...DEFAULT_SEO.twitter,
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    images: DEFAULT_SEO.openGraph.images,
  },
  verification: {
    google: "SM1h4jU_nI-Z-wSfALsiVmvB6zV0AS7jZFruE0f2MYo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <DataSchema />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
