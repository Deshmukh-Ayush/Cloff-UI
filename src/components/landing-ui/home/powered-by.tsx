"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Newsreader } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
});

const groups = [
  [
    { src: "next-logo.png", alt: "nextjs-logo" },
    { src: "tailwind.svg", alt: "tailwind" },
    { src: "framer-motion.svg", alt: "framer motion logo" },
  ],
  [
    { src: "react-logo.svg", alt: "node-logo" },
    { src: "shadcn-ui.svg", alt: "shadcn-ui" },
    { src: "next-logo.png", alt: "next-logo" },
  ],
];

export const PoweredBy = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % groups.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentGroup = groups[index] ?? [];

  return (
    <div className="flex max-h-screen flex-col items-center gap-20 border-b border-dashed border-neutral-300 py-10 dark:border-neutral-700">
      <h1
        className={`${newsreader.className} text-4xl tracking-tight text-neutral-800 dark:text-neutral-100`}
      >
        Powered By
      </h1>

      <div className="flex w-full items-center justify-center gap-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex gap-20"
          >
            {currentGroup.map((icon, i) => (
              <motion.img
                key={i}
                src={icon.src}
                alt={icon.alt}
                className="w-[60px] saturate-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.3 }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
