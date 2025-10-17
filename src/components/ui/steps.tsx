"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const Steps = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "my-8 ml-4 border-l border-neutral-200 pl-7 [counter-reset:step] dark:border-neutral-800",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const Step = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
}) => {
  return (
    <div
      className={cn(
        "relative mb-8 [counter-increment:step] last:mb-0",
        "before:absolute before:-left-[42px] before:flex before:h-8 before:w-8 before:items-center before:justify-center before:rounded-full before:border-2 before:border-neutral-300 before:bg-white before:text-sm before:font-semibold before:text-neutral-700 before:content-[counter(step)]",
        "dark:before:border-neutral-700 dark:before:bg-neutral-950 dark:before:text-neutral-300",
        className,
      )}
    >
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>

      {/* Content */}
      <div className="space-y-3">{children}</div>
    </div>
  );
};
