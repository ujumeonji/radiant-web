import { cn } from "@/lib/utils";

interface BrandAccentProps {
  className?: string;
}

export default function BrandAccent({ className }: BrandAccentProps) {
  return <div className={cn("border-t-4 border-slate-800", className)}></div>;
}
