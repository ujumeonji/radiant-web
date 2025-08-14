import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  href?: string;
}

export default function Logo({
  className,
  variant = "dark",
  href = "/",
}: LogoProps) {
  const logoContent = (
    <span
      className={cn(
        "text-3xl font-bold tracking-tighter",
        variant === "dark" ? "text-gray-800" : "text-slate-50",
        className
      )}
    >
      radiant
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
