import type { MetadataRoute } from 'next'
import { SITE_URL } from "@/lib/seo-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/_next/', '/404', '/500'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}