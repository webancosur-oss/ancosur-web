import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.75",
    "192.168.1.131",
  ],

  poweredByHeader: false,

  images: {
    formats: [
      "image/avif",
      "image/webp",
    ],

    /* Toda calidad usada en <Image quality={…}> debe estar
       aquí; Next redondea al valor permitido más cercano. */
    qualities: [
      75,
      85,
      90,
    ],

    /* Las imágenes optimizadas se cachean 30 días en la CDN */
    minimumCacheTTL: 2592000,
  },

  async headers() {
    return [
      {
        /* public/assets y public/og no llevan hash en el
           nombre: 7 días de caché y revalidación en segundo
           plano para no servir versiones viejas por meses. */
        source: "/:dir(assets|og)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
