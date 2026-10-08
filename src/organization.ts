import { SITE_URL } from "./seo";

/* =========================================================
   DATOS DE LA EMPRESA
   Fuente única para JSON-LD, meta geo y llms.txt.
========================================================= */

export const ORGANIZATION_ID =
  `${SITE_URL}/#organization`;

export const WEBSITE_ID =
  `${SITE_URL}/#website`;

export const PHONE =
  "+51 971 069 763";

export const EMAIL =
  "info@ancosur.com";

export const ADDRESS = {
  streetAddress: "Av. San Carlos 1481",
  addressLocality: "Huancayo",
  addressRegion: "Junín",
  postalCode: "12002",
  addressCountry: "PE",
};

export const GEO = {
  latitude: -12.0651,
  longitude: -75.2049,
};

/* Mismos perfiles que enlaza el Footer */
export const SOCIAL_PROFILES = [
  "https://www.facebook.com/ancosurinmobiliaria",
  "https://www.instagram.com/ancosurinmobiliaria/",
  "https://www.tiktok.com/@ancosurinmobiliaria",
  "https://www.youtube.com/@ancosurinmobiliaria",
  "https://x.com/Ancosur_",
];
