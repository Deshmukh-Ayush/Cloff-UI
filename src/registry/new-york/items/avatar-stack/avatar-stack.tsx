"use client";

import { motion } from "motion/react";

interface AvatarItem {
  name: string;
  image: string;
}

interface AvatarStackProps {
  items: AvatarItem[];
  title: string;
  subtitle: string;
  className?: string;
}

export const AvatarStack = ({
  items = [],
  title,
  subtitle,
  className = "",
}: AvatarStackProps) => {
  return (
    <div
      className={`group flex flex-col items-center justify-center ${className}`}
    >
      <motion.div
        className="relative flex h-16 w-full cursor-pointer items-center justify-center"
        initial="initial"
        whileHover="hover"
      >
        {items.map((item, index) => {
          return (
            <motion.img
              key={item.name}
              src={item.image}
              alt={item.name}
              className="absolute h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm transition-shadow duration-300 hover:shadow-md"
              style={{
                zIndex: items.length - index,
              }}
              variants={{
                initial: {
                  x: index * 4,
                  y: -index * 0.5,
                  scale: 1 - index * 0.05,
                  opacity: 1,
                },
                hover: {
                  x: (index - (items.length - 1) / 2) * 35,
                  y: 0,
                  scale: 1.1,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                },
              }}
            />
          );
        })}
      </motion.div>

      <div className="mt-4 flex flex-col items-center gap-0.5">
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </span>
        <span className="text-xs text-neutral-500">{subtitle}</span>
      </div>
    </div>
  );
};
