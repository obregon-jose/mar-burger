export const SITE_DOMAIN = "marburger.vercel.app";
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const DEFAULT_SEO = {
    title: "MAR BURGER | Comidas Rápidas y Mariscos",
    description:
        "Disfruta las mejores comidas rápidas y mariscos frescos en MAR BURGER, Cali. Hamburguesas artesanales, ceviches, pescados y delivery rápido. Calidad, sabor único y servicio excepcional en cada pedido.",
    keywords: [
        "marburger",
        "mar burger",
        "comidas rápidas",
        "mariscos",
        "hamburguesas",
        "delivery",
        "restaurante",
        "mariscos frescos",
        "pedidos online",
        "mar burger cali",
        "marburger cali",
        "mar burger mariscos",
        "marburger mariscos",
        "mar burger comidas rápidas",
        "marburger comidas rápidas",
        "comida rápida cali",
        "mariscos cali",
        "hamburguesas cali",
        "restaurante mariscos cali",
        "pedidos a domicilio cali",
    ],
    openGraph: {
        type: "website",
        locale: "es_CO",
        siteName: "MAR BURGER",
        images: [
            {
                url: `${SITE_URL}/images/og-marburger.jpg`, //pendiente
                width: 1200,
                height: 630,
                alt: "Deliciosas hamburguesas y mariscos de MAR BURGER",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
    },
};

export const DEFAULT_SCHEMA = {
    type: "Restaurant",
    description: "Disfruta las mejores comidas rápidas y mariscos frescos en MAR BURGER, Cali.",
    servesCuisine: ["Hamburguesas", "Mariscos", "Comida Rápida"],
    location: {
        address: "", //corregir
        locality: "Cali",
        region: "Valle del Cauca",
        postalCode: "", //corregir
        latitude: "", //corregir
        longitude: "", //corregir
    },
    telephone: "+573001234567", //corregir
    openingHours: [
        "Mo-Sa 12:00-22:00",
        "Su 12:00-20:00",
    ],
    priceRange: "$$",
    sameAs: [
        "https://www.instagram.com/marburger", //corregir
        "https://wa.me/573001234567", //corregir
],
};