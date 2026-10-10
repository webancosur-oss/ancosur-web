"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { PopupPromotion } from "./types";

/* =========================================================
   CARGADOR DEL POPUP DE CAMPAÑA
   Compatible con las pautas de Google:
   - no aparece al entrar: espera la primera interacción
     (scroll, toque o tecla) y unos segundos más;
   - una sola vez por sesión (si se cierra o se envía);
   - nunca en /promociones (allí ya está el formulario).
   El componente del popup se descarga solo en ese momento.
========================================================= */

const CampaignPopup = dynamic(() => import("./CampaignPopup"), {
  ssr: false,
});

const SHOW_DELAY = 2500;

const INTERACTION_EVENTS = [
  "scroll",
  "pointerdown",
  "keydown",
  "touchstart",
] as const;

export const popupStorageKey = (id: string) =>
  `ancosur-popup-${id}`;

type CampaignPopupLazyProps = {
  promotion: PopupPromotion | null;
};

export default function CampaignPopupLazy({
  promotion,
}: CampaignPopupLazyProps) {
  const pathname = usePathname();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!promotion || pathname?.startsWith("/promociones")) {
      return;
    }

    try {
      if (sessionStorage.getItem(popupStorageKey(promotion.id))) {
        return;
      }
    } catch {
      /* sessionStorage bloqueado: se muestra igual */
    }

    let timer = 0;

    const removeListeners = () => {
      INTERACTION_EVENTS.forEach((name) =>
        window.removeEventListener(name, handleInteraction),
      );
    };

    function handleInteraction() {
      removeListeners();
      timer = window.setTimeout(() => setShouldShow(true), SHOW_DELAY);
    }

    INTERACTION_EVENTS.forEach((name) =>
      window.addEventListener(name, handleInteraction, {
        passive: true,
      }),
    );

    return () => {
      removeListeners();
      window.clearTimeout(timer);
    };
  }, [promotion, pathname]);

  if (!promotion || !shouldShow) return null;

  return (
    <CampaignPopup
      promotion={promotion}
      onClose={() => setShouldShow(false)}
    />
  );
}
