"use client";

import Link from "next/link";
import type { ComponentType, MouseEvent, ReactNode } from "react";
import styles from "./ActionButton.module.css";

type IconWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";

type ButtonIcon = ComponentType<{
  size?: number;
  weight?: IconWeight;
  className?: string;
  "aria-hidden"?: boolean;
}>;

type ButtonVariant =
  | "primary"
  | "dark"
  | "light"
  | "outline"
  | "ghost"
  | "unstyled";

type ButtonSize = "xs" | "sm" | "md" | "lg";

type ActionButtonProps = {
  href?: string;
  children: ReactNode;
  icon?: ButtonIcon;
  iconPosition?: "left" | "right";
  variant?: ButtonVariant;
  size?: ButtonSize;

  mobileSize?: ButtonSize;
  tabletSize?: ButtonSize;
  desktopSize?: ButtonSize;

  fullWidth?: boolean;
  mobileFullWidth?: boolean;
  tabletFullWidth?: boolean;
  desktopFullWidth?: boolean;

  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;

  target?: "_self" | "_blank";
  rel?: string;
  ariaLabel?: string;
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
};

const isExternalHref = (href: string) => {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("https://wa.me") ||
    href.startsWith("https://api.whatsapp.com")
  );
};

const getIconSize = (size: ButtonSize) => {
  if (size === "xs") return 14;
  if (size === "sm") return 16;
  if (size === "lg") return 21;
  return 18;
};

const getResponsiveSizeClass = (
  prefix: "mobile" | "tablet" | "desktop",
  size?: ButtonSize
) => {
  if (!size) return "";

  const sizeMap: Record<ButtonSize, string> = {
    xs: "Xs",
    sm: "Sm",
    md: "Md",
    lg: "Lg",
  };

  return styles[`${prefix}${sizeMap[size]}`];
};

export default function ActionButton({
  href,
  children,
  icon: Icon,
  iconPosition = "right",
  variant = "primary",
  size = "md",

  mobileSize,
  tabletSize,
  desktopSize,

  fullWidth = false,
  mobileFullWidth = false,
  tabletFullWidth = false,
  desktopFullWidth = false,

  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,

  target,
  rel,
  ariaLabel,
  className = "",
  isActive = true,
  disabled = false,
  type = "button",
  onClick,
}: ActionButtonProps) {
  if (!isActive) return null;

  const buttonClassName = [
    styles.button,
    styles[variant],
    styles[size],

    getResponsiveSizeClass("mobile", mobileSize),
    getResponsiveSizeClass("tablet", tabletSize),
    getResponsiveSizeClass("desktop", desktopSize),

    fullWidth ? styles.fullWidth : "",
    mobileFullWidth ? styles.mobileFullWidth : "",
    tabletFullWidth ? styles.tabletFullWidth : "",
    desktopFullWidth ? styles.desktopFullWidth : "",

    hideOnMobile ? styles.hideOnMobile : "",
    hideOnTablet ? styles.hideOnTablet : "",
    hideOnDesktop ? styles.hideOnDesktop : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconSize = getIconSize(size);

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon
          size={iconSize}
          weight="bold"
          className={styles.icon}
          aria-hidden={true}
        />
      )}

      <span>{children}</span>

      {Icon && iconPosition === "right" && (
        <Icon
          size={iconSize}
          weight="bold"
          className={styles.icon}
          aria-hidden={true}
        />
      )}
    </>
  );

  if (!href) {
    return (
      <button
        type={type}
        className={buttonClassName}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  const external = isExternalHref(href);
  const finalTarget = target ?? (external ? "_blank" : "_self");
  const finalRel =
    rel ?? (finalTarget === "_blank" ? "noopener noreferrer" : undefined);

  if (external) {
    return (
      <a
        href={href}
        target={finalTarget}
        rel={finalRel}
        aria-label={ariaLabel}
        className={buttonClassName}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      target={finalTarget}
      rel={finalRel}
      aria-label={ariaLabel}
      className={buttonClassName}
      onClick={onClick}
    >
      {content}
    </Link>
  );
}