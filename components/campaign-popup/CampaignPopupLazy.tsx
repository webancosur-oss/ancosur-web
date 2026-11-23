"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { obtenerPopupWeb, type PopupWeb } from "@/data/popupWeb";

/* =========================================================
   CARGADOR DEL POPUP
   El pop-up lo arma marketing en el CRM (afiche, textos,
   campos, páginas y vigencia). Compatible con las pautas de
   Google:
   - no aparece al entrar: espera la primera interacción
     (scroll, toque o tecla); recién ahí se consulta al CRM
     si hay un pop-up para esta página, y se espera lo que
     indique su configuración;
   - una sola vez por sesión (si se cierra o se envía).
   El componente del popup se descarga solo en ese momento.
========================================================= */

const CampaignPopup = dynamic(() => import("./CampaignPopup"), {
  ssr: false,
});

const INTERACTION_EVENTS = [
  "scroll",
  "pointerdown",
  "keydown",
  "touchstart",
] as const;

export const popupStorageKey = (id: number | string) =>
  `ancosur-popup-${id}`;

type Estado = {
  /* Ruta para la que se consultó: al cambiar de página se vuelve a consultar. */
  ruta: string;
  popup: PopupWeb | null;
  mostrar: boolean;
};

export default function CampaignPopupLazy() {
  const pathname = usePathname();
  const [estado, setEstado] = useState<Estado>({
    ruta: "",
    popup: null,
    mostrar: false,
  });

  useEffect(() => {
    if (!pathname) return;

    const ruta = pathname;
    let cancelled = false;
    let timer = 0;
    const controller = new AbortController();

    const removeListeners = () => {
      INTERACTION_EVENTS.forEach((name) =>
        window.removeEventListener(name, handleInteraction),
      );
    };

    async function handleInteraction() {
      removeListeners();

      const found = await obtenerPopupWeb(ruta, controller.signal).catch(
        () => null,
      );
      if (cancelled || !found) return;

      try {
        if (sessionStorage.getItem(popupStorageKey(found.id))) return;
      } catch {
        /* sessionStorage bloqueado: se muestra igual */
      }

      setEstado({ ruta, popup: found, mostrar: false });
      timer = window.setTimeout(
        () => {
          if (cancelled) return;
          setEstado((actual) =>
            actual.ruta === ruta ? { ...actual, mostrar: true } : actual,
          );
        },
        Math.max(0, found.retraso_seg) * 1000,
      );
    }

    INTERACTION_EVENTS.forEach((name) =>
      window.addEventListener(name, handleInteraction, {
        passive: true,
      }),
    );

    return () => {
      cancelled = true;
      removeListeners();
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [pathname]);

  if (estado.ruta !== pathname || !estado.popup || !estado.mostrar) {
    return null;
  }

  return (
    <CampaignPopup
      popup={estado.popup}
      onClose={() =>
        setEstado((actual) => ({ ...actual, mostrar: false }))
      }
    />
  );
}
