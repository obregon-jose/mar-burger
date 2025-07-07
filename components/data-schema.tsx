'use client'
import { SITE_URL, DEFAULT_SCHEMA, DEFAULT_SEO  } from "@/lib/seo-config";

export default function DataSchema() {
  
  const schema = {
     "@context": "https://schema.org",
    "@type": DEFAULT_SCHEMA.type,
    "name": DEFAULT_SEO.openGraph.siteName,
    "description": DEFAULT_SCHEMA.description,
    "image": `${SITE_URL}/images/logo.png`,
    "priceRange": DEFAULT_SCHEMA.priceRange,
    "url": SITE_URL,
    "servesCuisine": DEFAULT_SCHEMA.servesCuisine,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": DEFAULT_SCHEMA.location.address,
      "addressLocality": DEFAULT_SCHEMA.location.locality,
      "addressRegion": DEFAULT_SCHEMA.location.region,
      "postalCode":   DEFAULT_SCHEMA.location.postalCode,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": DEFAULT_SCHEMA.location.latitude,
      "longitude": DEFAULT_SCHEMA.location.longitude,
    },
    "telephone": DEFAULT_SCHEMA.telephone,
    "openingHours": DEFAULT_SCHEMA.openingHours,
    "sameAs": DEFAULT_SCHEMA.sameAs,
  }

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}