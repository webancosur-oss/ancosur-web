"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/* =========================================================
   POPUP DE CAMPAÑA BAJO DEMANDA
   El popup (componente grande) no se descarga con la página:
   se carga y monta tras la primera interacción (scroll, toque
   o tecla). Así no compite con la carga inicial ni con el LCP.
========================================================= */

const PromoLeadPopup = dynamic(
  () => import("./PromoLeadPopup"),
  { ssr: false },
);

const INTERACTION_EVENTS = [
  "scroll",
  "pointerdown",
  "keydown",
  "touchstart",
] as const;

export default function PromoLeadPopupLazy() {
  const [shouldLoad, setShouldLoad] =
    useState(false);

  useEffect(() => {
    const load = () => {
      setShouldLoad(true);
      removeListeners();
    };

    const removeListeners = () => {
      INTERACTION_EVENTS.forEach((name) =>
        window.removeEventListener(name, load),
      );
    };

    INTERACTION_EVENTS.forEach((name) =>
      window.addEventListener(name, load, {
        passive: true,
      }),
    );

    return removeListeners;
  }, []);

  return shouldLoad ? <PromoLeadPopup /> : null;
}
