"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Breadcrumbs.module.css";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
  variant?: "light" | "dark";
};

export default function Breadcrumbs({
  items,
  backHref = "/",
  backLabel = "Regresar",
  variant = "light",
}: BreadcrumbsProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(backHref);
  };

  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <button type="button" onClick={handleBack} className={styles.backButton}>
        ← {backLabel}
      </button>

      <nav className={styles.breadcrumbs} aria-label="Migajas de pan">
        <ol>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.label}>
                {item.href && !isLast ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}

                {!isLast && <small>/</small>}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}