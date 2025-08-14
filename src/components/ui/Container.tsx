import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
