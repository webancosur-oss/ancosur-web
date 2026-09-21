"use client";

import styles from "./FilterTabs.module.css";

export type FilterOption<T extends string = string> = {
  value: T;
  label: string;
};

export type FilterTabsProps<T extends string = string> = {
  /**
   * Define exactamente qué filtros aparecerán.
   *
   * Ejemplo:
   *
   * [
   *   { value: "pre_venta", label: "Preventa" },
   *   { value: "en_construccion", label: "En construcción" },
   * ]
   */
  options: readonly FilterOption<T>[];

  /**
   * Filtro actualmente seleccionado.
   */
  value: T;

  /**
   * Se ejecuta cuando el usuario cambia de filtro.
   */
  onChange: (value: T) => void;

  /**
   * Nombre accesible del grupo de filtros.
   */
  ariaLabel?: string;

  /**
   * Clase adicional opcional.
   */
  className?: string;
};

export default function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel = "Filtrar contenido",
  className = "",
}: FilterTabsProps<T>) {
  return (
    <div
      className={`${styles.wrapper} ${className}`.trim()}
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`${styles.button} ${
              isActive ? styles.active : ""
            }`.trim()}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}