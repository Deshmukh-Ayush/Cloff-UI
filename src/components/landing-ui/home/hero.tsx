import { Newsreader } from "next/font/google";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { NeumorphButton } from "../button";

const newsreader = Newsreader({
  subsets: ["latin"],
});

export const Hero = () => {
  return (
    <div className="mx-auto mt-10 flex flex-col items-center justify-center border-b border-neutral-300 py-24 dark:border-neutral-700">
      <h2
        className={`${newsreader.className} text-center text-7xl leading-16 tracking-tight`}
      >
        <span className="bg-gradient-to-br from-[#70D9FF] to-[#00A4DF] bg-clip-text text-transparent">
          Interactivity
        </span>{" "}
        at your <br /> finger-tips.
      </h2>
      <p className="text-1xl mt-4 text-center text-neutral-400">
        The only shadcn component library <br /> you'll ever need to make your
        website interactive and seamless.
      </p>
      <NeumorphButton>Browse Components</NeumorphButton>
    </div>
  );
};
