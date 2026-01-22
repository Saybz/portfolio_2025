"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type ButtonVariant = 
  | "pushable" 
  | "pushable-inactive" 
  | "blur-secondary" 
  | "blur-red" 
  | "link-secondary";

type ButtonColor = "secondary" | "red" | "default";
type ButtonSize = "sm" | "md" | "lg";

type BaseButtonProps = {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  external?: boolean;
};

const ButtonContent: React.FC<{
  variant: ButtonVariant;
  icon?: LucideIcon;
  iconPosition: "left" | "right";
  children: ReactNode;
  className: string;
}> = ({ variant, icon: Icon, iconPosition, children, className }) => {
  const iconSize = variant === "pushable" || variant === "pushable-inactive" ? "w-6 h-6" : "w-4 h-4";
  
  return (
    <span className="inline-flex items-center gap-3">
      {Icon && iconPosition === "left" && <Icon className={iconSize} />}
      {children}
      {Icon && iconPosition === "right" && <Icon className={iconSize} />}
    </span>
  );
};

const Button: React.FC<ButtonProps | LinkButtonProps> = ({
  variant = "pushable",
  color = "secondary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  children,
  className = "",
  ...props
}) => {
  // Si c'est un lien (avec href)
  if ("href" in props) {
    const { href, external, ...linkProps } = props as LinkButtonProps;
    
    // Si c'est un variant pushable, utiliser la structure pushable
    if (variant === "pushable") {
      const colorClass = color === "red" ? "pushable-red" : "pushable-secondary";
      const sizeClass = `pushable-${size}`;
      const content = (
        <span className="front">
          <ButtonContent
            variant={variant}
            icon={Icon}
            iconPosition={iconPosition}
            className=""
          >
            {children}
          </ButtonContent>
        </span>
      );

      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`pushable ${colorClass} ${sizeClass} ${className}`}
            {...linkProps}
          >
            {content}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className={`pushable ${colorClass} ${sizeClass} ${className}`}
          {...linkProps}
        >
          {content}
        </Link>
      );
    }

    // Pour les autres variants, utiliser le style de lien classique
    const content = (
      <ButtonContent
        variant={variant}
        icon={Icon}
        iconPosition={iconPosition}
        className={className}
      >
        {children}
      </ButtonContent>
    );

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={getLinkClassName(variant, className)}
          {...linkProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={getLinkClassName(variant, className)}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  // Sinon c'est un bouton
  const buttonProps = props as ButtonProps;
  // Variante pushable (bouton actif)
  if (variant === "pushable") {
    const colorClass = color === "red" ? "pushable-red" : "pushable-secondary";
    const sizeClass = `pushable-${size}`;
    return (
      <button className={`pushable ${colorClass} ${sizeClass} ${className}`} {...buttonProps}>
        <span className="front flex items-center justify-center">
          <ButtonContent
            variant={variant}
            icon={Icon}
            iconPosition={iconPosition}
            className=""
          >
            {children}
          </ButtonContent>
        </span>
      </button>
    );
  }

  // Variante pushable-inactive (bouton inactif)
  if (variant === "pushable-inactive") {
    const sizeClass = `pushable-${size}`;
    return (
      <button className={`pushable-inactive ${sizeClass} ${className}`} {...buttonProps}>
        <span className="front flex items-center justify-center">
          <ButtonContent
            variant={variant}
            icon={Icon}
            iconPosition={iconPosition}
            className=""
          >
            {children}
          </ButtonContent>
        </span>
      </button>
    );
  }

  // Variante blur-secondary (bouton avec blur et bordure secondary)
  if (variant === "blur-secondary") {
    return (
      <button
        className={`inline-flex items-center gap-2 border-[1px] border-secondary/30 px-4 py-2 rounded-md bg-secondary/20 backdrop-blur-md text-secondary shadow-md hover:bg-secondary/30 transition-colors ${className}`}
        {...buttonProps}
      >
        <ButtonContent
          variant={variant}
          icon={Icon}
          iconPosition={iconPosition}
          className=""
        >
          {children}
        </ButtonContent>
      </button>
    );
  }

  // Variante blur-red (bouton avec blur et bordure rouge)
  if (variant === "blur-red") {
    return (
      <button
        className={`text-xs text-red-400 opacity-70 hover:opacity-100 backdrop-blur-md rounded-md border border-red-400/30 bg-red-400/20 px-2 py-1 text-red-400 transition-colors ${className}`}
        {...buttonProps}
      >
        <ButtonContent
          variant={variant}
          icon={Icon}
          iconPosition={iconPosition}
          className=""
        >
          {children}
        </ButtonContent>
      </button>
    );
  }

  // Variante link-secondary (lien avec style secondary)
  if (variant === "link-secondary") {
    return (
      <button
        className={`inline-flex items-center gap-2 rounded-md border border-secondary/30 bg-secondary/20 backdrop-blur-md px-4 py-2 text-xs font-regular text-secondary/70 shadow hover:bg-secondary/30 hover:border-secondary/60 hover:text-secondary/80 transition-colors ${className}`}
        {...buttonProps}
      >
        <ButtonContent
          variant={variant}
          icon={Icon}
          iconPosition={iconPosition}
          className=""
        >
          {children}
        </ButtonContent>
      </button>
    );
  }

  return null;
};

const getLinkClassName = (variant: ButtonVariant, className: string): string => {
  switch (variant) {
    case "blur-secondary":
      return `inline-flex items-center gap-2 border-[1px] border-secondary/30 px-4 py-2 rounded-md bg-secondary/20 backdrop-blur-md text-secondary shadow-md hover:bg-secondary/30 transition-colors ${className}`;
    case "link-secondary":
      return `inline-flex items-center gap-2 rounded-md border border-secondary/30 bg-secondary/20 backdrop-blur-md px-4 py-2 text-xs font-regular text-secondary/70 shadow hover:bg-secondary/30 hover:border-secondary/60 hover:text-secondary/80 transition-colors ${className}`;
    default:
      return className;
  }
};

export default Button;
