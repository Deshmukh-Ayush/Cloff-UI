import { cn } from "@/lib/utils";
import React from "react";

export const Para = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-xs text-neutral-700 md:text-lg dark:text-neutral-400",
        className,
      )}
    >
      {children}
    </p>
  );
};
