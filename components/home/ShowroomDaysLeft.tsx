"use client";

import { useEffect, useState } from "react";

import {
  SHOWROOM_END,
  SHOWROOM_START,
} from "@/app/promociones/data";

/* =========================================================
   CONTADOR EN DÍAS DEL SHOWROOM
   Días, no segundos: recuerda la cita sin presionar. Se
   calcula con la fecha de Lima en el navegador (la página
   se cachea) y se actualiza cada minuto.
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

export const getShowroomLabel = (
  now: Date,
): string | null => {
  const start = new Date(SHOWROOM_START);
  const end = new Date(SHOWROOM_END);

  if (now > end) return null;
  if (now >= start) return "¡Es hoy! Hasta las 5 p. m.";

  const days = toDayNumber(start) - toDayNumber(now);

  if (days <= 0) return "¡Es hoy! Desde las 11 a. m.";
  if (days === 1) return "¡Es mañana!";

  return `Faltan ${days} días`;
};

type ShowroomDaysLeftProps = {
  className?: string;
};

export default function ShowroomDaysLeft({
  className,
}: ShowroomDaysLeftProps) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setLabel(getShowroomLabel(new Date()));

    update();

    const interval = window.setInterval(update, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  if (!label) return null;

  return <span className={className}>{label}</span>;
}
