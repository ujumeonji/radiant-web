import { BRAND } from "@/lib/constants";
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
        BRAND.logo.base,
        variant === "dark" ? BRAND.logo.dark : BRAND.logo.light,
        className,
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
