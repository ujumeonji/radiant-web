// Design tokens and constants

export const CONTAINER = {
  maxWidth: "max-w-screen-lg",
  padding: "px-4 sm:px-6 lg:px-8",
  full: "container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8",
} as const;

export const BRAND = {
  accent: {
    border: "border-t-4 border-slate-800",
  },
  logo: {
    base: "text-3xl font-bold tracking-tighter",
    dark: "text-gray-800",
    light: "text-slate-50",
  },
} as const;

export const COLORS = {
  gray: {
    800: "text-gray-800",
    900: "text-gray-900",
  },
  slate: {
    50: "text-slate-50",
    100: "bg-slate-100 text-slate-800",
    400: "text-slate-400",
    700: "border-slate-700",
    800: "border-slate-800",
    900: "bg-slate-900",
  },
} as const;

export const SPACING = {
  section: "py-12",
  page: "py-20",
  gap: {
    small: "gap-4",
    medium: "gap-8",
    large: "space-x-8",
  },
} as const;
