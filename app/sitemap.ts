import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-config";

export default function sitemap(): MetadataRoute.Sitemap {

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // {
    //   url: `${SITE_URL}/menu`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.9,
    // },
  ];
}
