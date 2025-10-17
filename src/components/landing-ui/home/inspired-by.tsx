"use client";

import React from "react";
import { Newsreader } from "next/font/google";
import { InfiniteSlider } from "../marquee";
import { ProgressiveBlur } from "../progressive-blur";
import Link from "next/link";

const newsreader = Newsreader({
  subsets: ["latin"],
});

const people = [
  {
    name: "Manu Paaji",
    href: "https://x.com/mannupaaji",
  },
  {
    name: "Hitesh Sir",
    href: "https://x.com/Hiteshdotcom",
  },
  {
    name: "Piyush Sir",
    href: "https://x.com/piyushgarg_dev",
  },
  {
    name: "Harsh Bhaiya",
    href: "https://x.com/harshbhaiyaa",
  },
  {
    name: "Harkirat",
    href: "https://x.com/kirat_tw",
  },
  {
    name: "Rauno",
    href: "https://x.com/raunofreiberg",
  },
  {
    name: "Emil Kowalski",
    href: "https://x.com/emilkowalski_",
  },
  {
    name: "Mariana",
    href: "https://x.com/mrncst",
  },
  {
    name: "Ibelick",
    href: "https://x.com/Ibelick",
  },
  {
    name: "Paco",
    href: "https://x.com/pacocoursey",
  },
  {
    name: "Nitish Khagwal",
    href: "https://x.com/nitishkmrk",
  },
];

export const InspiredBy = () => {
  return (
    <div className="flex max-h-screen flex-col items-center gap-20 py-10">
      <h1
        className={`${newsreader.className} text-4xl tracking-tight text-neutral-800`}
      >
        Inspired By
      </h1>
      <p className="text-center text-neutral-500">
        Special thanks to{" "}
        <span className="text-neutral-800">
          <Link href="https://x.com/Hiteshdotcom" target="_blank">
            Hitesh Sir,
          </Link>
        </span>{" "}
        <span className="text-neutral-800">
          <Link href="https://x.com/mannupaaji" target="_blank">
            {" "}
            Manu Paaji
          </Link>
          ,
        </span>{" "}
        <span className="text-neutral-800">
          <Link href="https://x.com/kirat_tw" target="_blank">
            {" "}
            Harkirat{" "}
          </Link>
        </span>{" "}
        and
        <span className="text-neutral-800">
          <Link href="https://x.com/harshbhaiyaa" target="_blank">
            {" "}
            Harsh Bhaiya
          </Link>
        </span>{" "}
        <br />
      </p>

      <div className="relative w-full overflow-hidden py-10">
        {/* Content layer */}
        <div className="relative z-0">
          <InfiniteSlider className="flex h-full w-full items-center">
            {people.map((gen, href) => (
              <div
                key={href}
                className="w-32 text-center font-[450] text-neutral-800 dark:text-white"
              >
                <Link href={gen.href} target="_blank">
                  {gen.name}
                </Link>
              </div>
            ))}
          </InfiniteSlider>
        </div>

        {/* Blur overlay layers (positioned above content) */}
        <ProgressiveBlur
          position="left"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[200px]"
        />
        <ProgressiveBlur
          position="right"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[200px]"
        />
      </div>
    </div>
  );
};
