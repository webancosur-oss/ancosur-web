"use client";

import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useEffect } from "react";

import styles from "./FeedbackToast.module.css";

export type ToastVariant =
  | "success"
  | "error"
  | "warning"
  | "info";

export type FeedbackToastData = {
  variant: ToastVariant;
  title: string;
  message: string;
};

type FeedbackToastProps = FeedbackToastData & {
  open: boolean;
  duration?: number;
  onClose: () => void;
};

const toastIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: WarningCircleIcon,
  info: InfoIcon,
};

export default function FeedbackToast({
  open,
  variant,
  title,
  message,
  duration = 5500,
  onClose,
}: FeedbackToastProps) {
  useEffect(() => {
    if (!open || duration <= 0) return;

    const timer = window.setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [duration, onClose, open]);

  if (!open) return null;

  const ToastIcon = toastIcons[variant];

  return (
    <div
      className={`${styles.toast} ${styles[variant]}`}
      role={
        variant === "error" || variant === "warning"
          ? "alert"
          : "status"
      }
      aria-live={
        variant === "error" || variant === "warning"
          ? "assertive"
          : "polite"
      }
    >
      <div className={styles.icon}>
        <ToastIcon
          size={26}
          weight="fill"
          aria-hidden={true}
        />
      </div>

      <div className={styles.content}>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>

      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        <XIcon
          size={17}
          weight="bold"
          aria-hidden={true}
        />
      </button>
    </div>
  );
}