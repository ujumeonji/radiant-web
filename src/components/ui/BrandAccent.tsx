import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BrandAccentProps {
  className?: string;
}

export default function BrandAccent({ className }: BrandAccentProps) {
  return <div className={cn(BRAND.accent.border, className)}></div>;
}
