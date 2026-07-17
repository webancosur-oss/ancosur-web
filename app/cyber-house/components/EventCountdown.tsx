"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "./EventCountdown.module.css";

type EventStatus =
  | "loading"
  | "upcoming"
  | "live"
  | "finished";

type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type EventCountdownProps = {
  startAt: string;
  endAt: string;
  eventName?: string;
};

const EMPTY_TIME: RemainingTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const getRemainingTime = (
  targetTime: number,
  currentTime: number
): RemainingTime => {
  const difference = Math.max(
    targetTime - currentTime,
    0
  );

  return {
    days: Math.floor(
      difference / 86_400_000
    ),
    hours: Math.floor(
      (difference / 3_600_000) %
        24
    ),
    minutes: Math.floor(
      (difference / 60_000) %
        60
    ),
    seconds: Math.floor(
      (difference / 1_000) %
        60
    ),
  };
};

const formatUnit = (
  value: number
): string => {
  return String(value).padStart(
    2,
    "0"
  );
};

export default function EventCountdown({
  startAt,
  endAt,
  eventName = "Cyber House",
}: EventCountdownProps) {
  const startTimestamp = useMemo(
    () => new Date(startAt).getTime(),
    [startAt]
  );

  const endTimestamp = useMemo(
    () => new Date(endAt).getTime(),
    [endAt]
  );

  const [status, setStatus] =
    useState<EventStatus>("loading");

  const [remaining, setRemaining] =
    useState<RemainingTime>(
      EMPTY_TIME
    );

  useEffect(() => {
    const updateCountdown = () => {
      const currentTime = Date.now();

      if (
        currentTime <
        startTimestamp
      ) {
        setStatus("upcoming");
        setRemaining(
          getRemainingTime(
            startTimestamp,
            currentTime
          )
        );
        return;
      }

      if (
        currentTime <
        endTimestamp
      ) {
        setStatus("live");
        setRemaining(
          getRemainingTime(
            endTimestamp,
            currentTime
          )
        );
        return;
      }

      setStatus("finished");
      setRemaining(EMPTY_TIME);
    };

    updateCountdown();

    const interval =
      window.setInterval(
        updateCountdown,
        1_000
      );

    return () => {
      window.clearInterval(interval);
    };
  }, [
    startTimestamp,
    endTimestamp,
  ]);

  if (status === "finished") {
    return (
      <div
        className={styles.finished}
        aria-live="polite"
      >
        <span>
          Evento finalizado
        </span>

        <strong>
          El {eventName} ha terminado
        </strong>

        <p>
          Registra tus datos para
          recibir información sobre
          nuestros proyectos y
          promociones vigentes.
        </p>

        <a href="#registro">
          Solicitar información
        </a>
      </div>
    );
  }

  const heading =
    status === "live"
      ? "El Cyber House está en vivo"
      : "Falta para el Cyber House";

  return (
    <div
      className={styles.countdown}
      aria-live="polite"
    >
      <div className={styles.header}>
        <span
          className={
            status === "live"
              ? styles.liveBadge
              : styles.upcomingBadge
          }
        >
          {status === "live"
            ? "EN VIVO"
            : "PRÓXIMAMENTE"}
        </span>

        <strong>{heading}</strong>
      </div>

      <div className={styles.grid}>
        <div className={styles.unit}>
          <strong>
            {status === "loading"
              ? "--"
              : formatUnit(
                  remaining.days
                )}
          </strong>
          <span>Días</span>
        </div>

        <div className={styles.unit}>
          <strong>
            {status === "loading"
              ? "--"
              : formatUnit(
                  remaining.hours
                )}
          </strong>
          <span>Horas</span>
        </div>

        <div className={styles.unit}>
          <strong>
            {status === "loading"
              ? "--"
              : formatUnit(
                  remaining.minutes
                )}
          </strong>
          <span>Minutos</span>
        </div>

        <div className={styles.unit}>
          <strong>
            {status === "loading"
              ? "--"
              : formatUnit(
                  remaining.seconds
                )}
          </strong>
          <span>Segundos</span>
        </div>
      </div>
    </div>
  );
}
