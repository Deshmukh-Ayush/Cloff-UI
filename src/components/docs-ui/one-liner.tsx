import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const OneLiner = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <div
      className={cn(
        "mt-2 flex items-center justify-end px-2 text-sm underline",
        className,
      )}
    >
      <Link href={href}>{children}</Link>
    </div>
  );
};
