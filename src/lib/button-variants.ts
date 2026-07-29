import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "dark"
  | "outline"
  | "outlineLight"
  | "light"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-semibold tracking-tight transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brass text-ink shadow-[0_8px_24px_-8px_rgba(195,154,86,0.6)] hover:bg-brass-300 hover:shadow-[0_12px_30px_-8px_rgba(195,154,86,0.7)] active:translate-y-px",
  dark: "bg-ink text-sand hover:bg-ink-800 active:translate-y-px",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-sand active:translate-y-px",
  outlineLight:
    "border border-foam/35 text-foam backdrop-blur-sm hover:bg-foam hover:text-ink active:translate-y-px",
  light: "bg-sand text-ink hover:bg-foam active:translate-y-px",
  ghost: "text-ink hover:text-brass-600",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
