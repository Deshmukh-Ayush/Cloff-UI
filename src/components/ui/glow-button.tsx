import { cn } from "@/lib/utils";
import React from "react";

enum VaraintColor {
  orange = "orange",
  blue = "blue",
  green = "green",
}

const GlowButton = ({
  children,
  variant = VaraintColor.blue,
  className,
}: {
  children: React.ReactNode;
  variant?: string;
  disableChevron?: boolean;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        "relative mt-5 flex cursor-pointer items-center overflow-hidden rounded-[0.6rem] border font-extralight before:absolute before:inset-0 before:z-20 before:rounded-[1rem] before:content-[''] after:absolute after:inset-0 after:z-10 after:rounded-[1rem] after:[box-shadow:0_0_15px_-1px_#ffffff90_inset] after:content-[''] hover:opacity-[0.90]",
        variant === VaraintColor.orange
          ? "border-[#f8d4b3]/80 bg-[#DE732C] [box-shadow:0_0_100px_-10px_#DE732C] before:[box-shadow:0_0_4px_-1px_#fff_inset]"
          : variant === VaraintColor.blue
            ? "border-[#9ec4ff]/90 bg-gradient-to-br from-[#5fb1cf] to-[#048abb] [box-shadow:0_0_100px_-10px_#0165FF] before:[box-shadow:0_0_7px_-1px_#d5e5ff_inset]"
            : "border-[#c0f1d3]/70 bg-[#176635] [box-shadow:0_0_100px_-10px_#21924c] before:[box-shadow:0_0_7px_-1px_#91e6b2_inset]",
        className,
      )}
    >
      <div className="z-0 flex items-center gap-2 border-r border-[#fff]/40 px-7 py-2">
        <p>{children}</p>
      </div>
    </button>
  );
};

export default GlowButton;
