"use client";
import {
  BarChart3,
  ClipboardList,
  Clock,
  MessageSquare,
  Plus,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ResendCard = ({
  title = "Cloff UI",
  subtitle = "A modern UI component Library",
  logoSrc = "cloff-icon.svg",
  logoAlt = "logo",
  buttonText = "Cloff",
  features = [
    {
      icon: MessageSquare,
      title: "Copy & Paste Components",
      description: "Your everyday component need fulfilled",
    },
    {
      icon: BarChart3,
      title: "Analytical Approach",
      description: "Software monitoring 24/7",
    },
    {
      icon: ClipboardList,
      title: "Tech consultation services",
      description:
        "Strategic growth and scaling mechanism using our holistic framework",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Cloff's team is available 24/7 for your software needs",
    },
  ],
  showCloseButton = true,
  onClose = () => {},
  className = "",
  gradientColors = {
    from: "#19BBEC",
    via: "#1266F7",
    to: "#18A0DE",
  },
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={`flex h-112 min-h-104 w-72 flex-col items-center rounded-2xl bg-white px-4 py-2 text-black shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] dark:bg-neutral-900 ${className}`}
          >
            <h2
              className="bg-clip-text text-[15px] font-bold text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`,
              }}
            >
              {title}
            </h2>
            <p className="text-[12px] text-neutral-500 dark:text-neutral-200">
              {subtitle}
            </p>
            <div className="flex items-center justify-center">
              <button
                onClick={handleClose}
                className="mt-4 flex items-center gap-1 rounded-2xl px-2 py-1 text-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md dark:bg-neutral-800"
              >
                {logoSrc ? (
                  <span className="h-3 w-5">
                    <img
                      src={logoSrc}
                      alt={logoAlt}
                      className="h-full w-full object-contain dark:invert"
                    />
                  </span>
                ) : (
                  <span
                    className="h-3 w-5 rounded"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`,
                    }}
                  />
                )}
                <span className="dark:text-neutral-200">{buttonText}</span>
                {showCloseButton && (
                  <X className="h-3 w-4 text-neutral-400 dark:text-neutral-200" />
                )}
              </button>
            </div>
            <div className="relative mt-4 mb-2 w-full flex-1 rounded-lg border border-neutral-200 bg-gray-100 dark:border-neutral-800 dark:bg-neutral-900">
              <motion.div
                initial={{
                  opacity: 0.2,
                  scale: 0.98,
                  filter: "blur(10px)",
                }}
                whileHover={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  mass: 1,
                }}
                className="absolute inset-0 h-full w-full divide-y divide-neutral-300 overflow-auto rounded-lg bg-white dark:divide-neutral-700 dark:bg-neutral-900"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-2 p-4">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] dark:bg-neutral-800 dark:shadow-lg">
                        <Icon size={16} className="dark:invert" />
                      </div>
                      <div className="flex flex-col">
                        <p className="mt-0.5 text-[9px] font-bold text-neutral-600 dark:text-neutral-200">
                          {feature.title}
                        </p>
                        <p className="mt-0.5 text-[8px] text-neutral-500 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-center gap-2 p-4">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
                    <Plus size={12} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[10px] text-neutral-400">Get Started</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResendCard;
