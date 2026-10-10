"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  SHOWROOM_END,
  SHOWROOM_START,
} from "@/app/promociones/data";

import styles from "./ShowroomBar.module.css";

/* =========================================================
   BARRA DEL SHOWROOM (portada)
   Contador en días, no en segundos: recuerda la cita sin
   presionar. Se calcula con la fecha de Lima en el navegador
   y desaparece cuando termina el evento.
========================================================= */

const LIMA_DAY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Lima",
});

const toDayNumber = (date: Date) => {
  const [year, month, day] = LIMA_DAY.format(date)
    .split("-")
    .map(Number);

  return Date.UTC(year, month - 1, day) / 86_400_000;
};

const getLabel = (now: Date): string | null => {
  const start = new Date(SHOWROOM_START);
  const end = new Date(SHOWROOM_END);

  if (now > end) return null;
  if (now >= start) return "¡Es hoy! Te esperamos hasta las 5 p. m.";

  const days = toDayNumber(start) - toDayNumber(now);

  if (days <= 0) return "¡Es hoy! Desde las 11 a. m.";
  if (days === 1) return "¡Es mañana!";

  return `Faltan ${days} días`;
};

export default function ShowroomBar() {
  /* null mientras hidrata: el servidor muestra solo la fecha */
  const [label, setLabel] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const update = () => {
      const next = getLabel(new Date());

      setFinished(next === null);
      setLabel(next);
    };

    update();

    const interval = window.setInterval(update, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  if (finished) return null;

  return (
    <aside
      className={styles.bar}
      aria-label="Showroom de Halloween"
    >
      <span
        className={styles.icon}
        aria-hidden="true"
      >
        🎃
      </span>

      <p className={styles.text}>
        <strong>Showroom de Halloween</strong>
        <span className={styles.date}>
          Sáb. 17 de octubre
        </span>
        {label && (
          <span className={styles.countdown}>
            {label}
          </span>
        )}
      </p>

      <Link
        href="/promociones#registro"
        className={styles.cta}
      >
        <span className={styles.ctaLong}>
          Separar mi visita
        </span>
        <span className={styles.ctaShort}>
          Separar
        </span>
        <ArrowRightIcon
          size={15}
          weight="bold"
          aria-hidden="true"
        />
      </Link>
    </aside>
  );
}
