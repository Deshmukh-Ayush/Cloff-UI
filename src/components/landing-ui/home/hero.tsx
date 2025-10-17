import { Newsreader } from "next/font/google";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

const newsreader = Newsreader({
  subsets: ["latin"],
});

export const Hero = () => {
  return (
    <div className="mx-auto mt-10 flex flex-col items-center justify-center border-b border-neutral-300 py-24 dark:border-neutral-700">
      <h2
        className={`${newsreader.className} text-center text-7xl leading-16 tracking-tight`}
      >
        <span className="bg-gradient-to-r from-[#19BBEC] via-[#1266F7] to-[#18A0DE] bg-clip-text text-transparent">
          Life's
        </span>{" "}
        too <br /> short for <span className="italic">bad UI</span>
      </h2>
      <p className="text-1xl text-center text-neutral-500">
        The only component library you'll need <br /> Because life's too short
        for bad UI just Copy paste and chill
      </p>
      <Link
        className={cn(
          "mt-6 rounded-md border border-none bg-gray-950 px-4 py-2 text-sm text-white transition-all duration-200 ease-in-out dark:bg-gray-300 dark:text-neutral-800 dark:hover:bg-gray-100",
          "shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
          "dark:shadow-[0_3px_10px_rgba(255,255,255,0.1)]",
        )}
        href="/components"
      >
        Browse Components
      </Link>
    </div>
  );
};
