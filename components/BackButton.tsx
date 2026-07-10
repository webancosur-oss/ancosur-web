"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./BackButton.module.css";

type BackButtonProps = {
  href?: string;
  label?: string;
  variant?: "light" | "dark";
  useHistory?: boolean;
  className?: string;
};

export default function BackButton({
  href = "/",
  label = "Volver",
  variant = "light",
  useHistory = false,
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (useHistory && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(href);
  };

  const buttonClass = `${styles.back} ${styles[variant]} ${className}`;

  if (useHistory) {
    return (
      <button type="button" onClick={handleBack} className={buttonClass}>
        <span>←</span>
        {label}
      </button>
    );
  }

  return (
    <Link href={href} className={buttonClass}>
      <span>←</span>
      {label}
    </Link>
  );
}