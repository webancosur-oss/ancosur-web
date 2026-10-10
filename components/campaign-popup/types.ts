import type { Promotion } from "@/app/promociones/data";

/* Datos de la promoción que necesita el popup (serializables
   desde el servidor). */
export type PopupPromotion = Pick<
  Promotion,
  | "id"
  | "name"
  | "eyebrow"
  | "title"
  | "highlight"
  | "summary"
  | "image"
  | "imageAlt"
  | "imageWidth"
  | "imageHeight"
  | "validityLabel"
>;
