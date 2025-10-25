import { cn } from "@/lib/utils";
import React from "react";

const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-2xl font-semibold text-neutral-950 md:text-4xl dark:text-neutral-100",
        className,
      )}
    >
      {children}
    </h2>
  );
};

const SubHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-xl font-semibold text-neutral-950 md:text-2xl dark:text-neutral-100",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export { Heading, SubHeading };
