import { CONTAINER } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn(CONTAINER.full, className)}>{children}</div>;
}
