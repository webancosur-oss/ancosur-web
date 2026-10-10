"use client";

import type { ReactNode } from "react";

/* =========================================================
   BOTÓN "QUIERO ESTA PROMOCIÓN"
   Lleva al formulario (#registro) y preselecciona la
   promoción mediante un evento que escucha el formulario.
========================================================= */

export const PROMO_SELECT_EVENT = "ancosur:promo-select";

type PromoCtaProps = {
  promotionId: string;
  className?: string;
  children: ReactNode;
};

export default function PromoCta({
  promotionId,
  className,
  children,
}: PromoCtaProps) {
  return (
    <a
      href="#registro"
      className={className}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent(PROMO_SELECT_EVENT, {
            detail: promotionId,
          }),
        );
      }}
    >
      {children}
    </a>
  );
}
