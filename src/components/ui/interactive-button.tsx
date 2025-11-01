"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useEffect, MouseEvent } from "react";

type ButtonState = "idle" | "loading" | "success" | "failure";

interface InteractiveButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  loadingText?: string;
  successText?: string;
  failureText?: string;
  loadingDuration?: number;
  resetDelay?: number;
  enableEnterKey?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
  name?: string;
  value?: string;
}

export default function InteractiveButton({
  className,
  children = "Enter",
  onClick,
  loadingText = "Loading...",
  successText = "Success!",
  failureText = "Failed",
  loadingDuration = 1500,
  resetDelay = 3000,
  enableEnterKey = false,
  disabled,
  type = "button",
  form,
  name,
  value,
}: InteractiveButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");

  useEffect(() => {
    if (!enableEnterKey || state !== "idle") return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleButtonClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [enableEnterKey, state]);

  const handleButtonClick = async (event?: MouseEvent<HTMLButtonElement>) => {
    if (state !== "idle") return;

    setState("loading");

    try {
      if (onClick && event) {
        await onClick(event);
      }

      setTimeout(() => {
        setState("success");
        setTimeout(() => setState("idle"), resetDelay);
      }, loadingDuration);
    } catch (error) {
      setState("failure");
      setTimeout(() => setState("idle"), resetDelay);
    }
  };

  const content = {
    idle: { text: children, icon: <EnterIcon /> },
    loading: { text: loadingText, icon: <LoadingIcon /> },
    success: { text: successText, icon: <CheckIcon /> },
    failure: { text: failureText, icon: <FailureIcon /> },
  }[state];

  const getAnimation = () => {
    switch (state) {
      case "idle":
        return {
          initial: { opacity: 0, y: 20, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          exit: { opacity: 0, y: -10, filter: "blur(2px)" },
          transition: { duration: 0.4, ease: "easeInOut" as const },
        };
      case "loading":
        return {
          initial: { opacity: 0, y: 20, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          exit: {
            opacity: 0,
            x: 10,
            filter: "blur(2px)",
            scale: 0.95,
          },
          transition: {
            duration: 0.25,
            ease: "easeInOut" as const,
          },
        };
      case "success":
        return {
          initial: { opacity: 0, y: -10, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          exit: { opacity: 0, y: -10, filter: "blur(2px)" },
          transition: { duration: 0.3, ease: "easeInOut" as const },
        };
      case "failure":
        return {
          initial: {
            x: -10,
            scale: 0.95,
          },
          animate: {
            x: [0, -4, 4, -4, 4, -4, 4, 0],
            scale: 1,
          },
          exit: { opacity: 0, y: -10, filter: "blur(2px)" },
          transition: {
            duration: 0.5,
            ease: [0.36, 0.66, 0.04, 1] as const,
            times: [0, 0.1, 0.2, 0.35, 0.5, 0.7, 0.85, 1],
          },
        };
    }
  };

  const animation = getAnimation();

  return (
    <motion.button
      onClick={handleButtonClick}
      disabled={state !== "idle" || disabled}
      type={type}
      form={form}
      name={name}
      value={value}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md border px-4 py-2",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors",
        "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50",
        "dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900",
        "disabled:cursor-not-allowed",
        className,
      )}
      whileHover={state === "idle" ? { scale: 1.05 } : {}}
      whileTap={state === "idle" ? { scale: 0.98 } : {}}
      layout
      transition={{
        layout: { duration: 0.2, ease: "easeInOut" },
        scale: { duration: 0.1 },
      }}
    >
      <motion.span
        key={`text-${state}`}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={animation.transition}
        className="font-medium"
      >
        {content.text}
      </motion.span>
      <motion.div
        key={`icon-${state}`}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={animation.transition}
        className="flex items-center"
      >
        {content.icon}
      </motion.div>
    </motion.button>
  );
}

const EnterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="opacity-60"
  >
    <path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" />
  </svg>
);

const LoadingIcon = () => (
  <motion.svg
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a9 9 0 1 0 9 9" />
  </motion.svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22c55e"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M9 12l2 2l4 -4" />
  </svg>
);

const FailureIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ef4444"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);
