import type { ReactNode } from "react";

import styles from "./HeroFold.module.css";

/* =========================================================
   PRIMERA PANTALLA
   Hero + franja de promociones ocupan exactamente el alto
   visible (sin franja blanca debajo). El hero crece o se
   ajusta según el espacio que deja la franja.
========================================================= */

export default function HeroFold({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={styles.fold}>{children}</div>;
}
