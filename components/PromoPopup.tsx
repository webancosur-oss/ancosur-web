"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./PromoPopup.module.css";

const popupConfig = {
  id: "campana-cusco-2026",
  enabled: true,
  showDelay: 1200,
  showOncePerSession: true,
  image: "/assets/campanias/postjulio.png",
  imageAlt: "Campaña ANCOSUR - Te regalamos un viaje a Cusco",
  imageWidth: 1080,
  imageHeight: 1080,
  link: "/contacto",
};

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!popupConfig.enabled) return;

    const storageKey = `popup-${popupConfig.id}`;

    if (popupConfig.showOncePerSession) {
      const alreadyClosed = sessionStorage.getItem(storageKey);

      if (alreadyClosed) return;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, popupConfig.showDelay);

    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);

    if (popupConfig.showOncePerSession) {
      sessionStorage.setItem(`popup-${popupConfig.id}`, "closed");
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <button
        type="button"
        className={styles.backdrop}
        onClick={closePopup}
        aria-label="Cerrar popup"
      />

      <div className={styles.popup}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={closePopup}
          aria-label="Cerrar popup"
        >
          ×
        </button>

        <a href={popupConfig.link} className={styles.imageLink}>
          <Image
            src={popupConfig.image}
            alt={popupConfig.imageAlt}
            width={popupConfig.imageWidth}
            height={popupConfig.imageHeight}
            className={styles.popupImage}
            loading="lazy"
            sizes="(max-width: 480px) 92vw, (max-width: 768px) 82vw, 620px"
          />
        </a>
      </div>
    </div>
  );
}