"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  PanInfo,
  HTMLMotionProps,
} from "motion/react";
import useMeasure from "react-use-measure";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface Logo {
  title: string;
  src: string;
}

interface DropdownOption {
  label: string;
  value: string;
}

// ============================================================================
// PROGRESSIVE BLUR COMPONENT
// ============================================================================

const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

type ProgressiveBlurProps = {
  direction?: keyof typeof GRADIENT_ANGLES;
  blurLayers?: number;
  className?: string;
  blurIntensity?: number;
} & HTMLMotionProps<"div">;

function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 8,
  className,
  blurIntensity = 0.25,
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction];
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${
              posIndex === 1 || posIndex === 2 ? 1 : 0
            }) ${pos * 100}%`,
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(
          ", ",
        )})`;

        return (
          <motion.div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${index * blurIntensity}px)`,
            }}
            {...props}
          />
        );
      })}
    </div>
  );
}

// ============================================================================
// HOOKS
// ============================================================================

const useAutoResizeTextarea = (
  ref: React.RefObject<HTMLTextAreaElement | null>,
) => {
  const handleInput = () => {
    const textarea = ref.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
    const maxHeight = lineHeight * 4;

    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    } else {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = "auto";
    }
  };

  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.overflowY = "hidden";
      textarea.style.height = "auto";
    }
  }, [ref]);

  return handleInput;
};

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
};

// ============================================================================
// PRIMITIVE COMPONENTS
// ============================================================================

const SelectorIcon = ({ isOpen }: { isOpen?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-selector"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        d="M8 9l4 -4l4 4"
        animate={{
          d: isOpen ? "M8 15l4 4l4 -4" : "M8 9l4 -4l4 4",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.path
        d="M16 15l-4 4l-4 -4"
        animate={{
          d: isOpen ? "M16 9l-4 -4l-4 4" : "M16 15l-4 4l-4 -4",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </svg>
  );
};

const RightArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697"
        stroke="#fff"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 12H20.33"
        stroke="#fff"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconSquare = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
    </svg>
  );
};

// ============================================================================
// COMPOUND COMPONENTS
// ============================================================================

export const AIInput = ({ children }: { children: React.ReactNode }) => {
  const [measureRef, bounds] = useMeasure();

  return (
    <motion.div
      animate={{
        height: bounds.height > 0 ? bounds.height : undefined,
      }}
      transition={{
        type: "spring",
        bounce: 0.2,
        duration: 0.6,
      }}
      className="relative w-full"
    >
      <div ref={measureRef}>
        <div className="flex w-full flex-col rounded-3xl bg-gray-200 px-2 py-2 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const AIInputTextarea = ({
  placeholder = "Type here.....",
  onSubmit,
  value,
  onChange,
}: {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleInput = useAutoResizeTextarea(textareaRef);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
    handleInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const text = textareaRef.current?.value.trim();
      if (onSubmit && text) {
        onSubmit(text);
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current && value !== undefined) {
      textareaRef.current.value = value;
      handleInput();
    }
  }, [value, handleInput]);

  return (
    <div className="w-full py-1">
      <textarea
        ref={textareaRef}
        className="w-full resize-none rounded-lg bg-transparent px-3 py-2 outline-none"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder={placeholder}
        defaultValue={value}
      />
    </div>
  );
};

export const AIInputControls = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-10 w-full shrink-0 items-center justify-between rounded-3xl">
      {children}
    </div>
  );
};

export const AIInputLeftControls = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const AIInputRightControls = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const AIInputDropdown = ({
  options,
  defaultValue,
  onChange,
}: {
  options: DropdownOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    defaultValue || options[0]?.label || "",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (option: DropdownOption) => {
    setSelected(option.label);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        layout
        layoutId="dropdown-container"
        onClick={() => setIsOpen(!isOpen)}
        transition={{
          layout: {
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          },
        }}
        className="flex items-center gap-2 rounded-2xl border-t border-white bg-neutral-100 px-4 py-1 text-neutral-800 transition-colors hover:bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={selected}
            initial={{ opacity: 0, filter: "blur(4px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(4px)",
              scale: 0.9,
              position: "absolute",
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="inline-block whitespace-nowrap"
          >
            {selected}
          </motion.span>
        </AnimatePresence>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <SelectorIcon />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0, filter: "blur(8px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(8px)" }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              opacity: { duration: 0.2 },
            }}
            className="absolute top-full left-0 z-10 mt-2 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-600 dark:bg-neutral-800"
          >
            <motion.div layout className="py-1">
              {options.map((option, index) => (
                <motion.button
                  layout
                  key={option.value}
                  initial={{ filter: "blur(8px)" }}
                  animate={{ filter: "blur(0px)" }}
                  exit={{ filter: "blur(8px)" }}
                  transition={{
                    delay: isOpen ? index * 0.0823 : 0,
                    duration: 0.3,
                  }}
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-2 text-left transition-colors hover:bg-neutral-100 hover:dark:bg-neutral-700 ${
                    selected === option.label
                      ? "bg-neutral-50 font-medium text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
                      : "text-neutral-700 dark:text-neutral-100"
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AIInputAgentPicker = ({
  agents,
  defaultAgent,
  onChange,
}: {
  agents: Logo[];
  defaultAgent?: Logo;
  onChange?: (agent: Logo) => void;
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Logo | null>(
    defaultAgent || null,
  );

  const [trayRef, bounds] = useMeasure();
  const x = useMotionValue(0);
  const dragStarted = useRef(false);

  const GAP = 8;
  const ITEM_WIDTH = 40;

  const totalWidth = agents.length * ITEM_WIDTH + (agents.length - 1) * GAP;
  const maxDrag = 0;
  const minDrag = Math.min(0, bounds.width - totalWidth - 24);

  const handleAgentSelect = (agent: Logo) => {
    if (!dragStarted.current) {
      setSelectedAgent(agent);
      setShowPicker(false);
      onChange?.(agent);
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setTimeout(() => {
      dragStarted.current = false;
    }, 50);

    const velocity = info.velocity.x;
    const offset = x.get();

    const target = offset + velocity * 0.2;

    const clamped = Math.max(Math.min(target, maxDrag), minDrag);

    animate(x, clamped, { type: "spring", stiffness: 400, damping: 40 });
  };

  useEffect(() => {
    if (showPicker) x.set(0);
  }, [showPicker, x]);

  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        {showPicker && (
          <motion.div
            className="absolute bottom-full left-0 mb-4 flex h-12 w-26 overflow-hidden rounded-4xl border border-white/20 bg-gray-300 backdrop-blur-md dark:bg-neutral-800"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Added Progressive Blur - Left */}
            <ProgressiveBlur
              className="pointer-events-none absolute top-0 left-0 z-10 h-full w-10"
              direction="left"
              blurIntensity={0.5}
            />

            {/* Added Progressive Blur - Right */}
            <ProgressiveBlur
              className="pointer-events-none absolute top-0 right-0 z-10 h-full w-10"
              direction="right"
              blurIntensity={0.5}
            />

            <div ref={trayRef} className="flex h-full w-full items-center px-3">
              <motion.div
                drag="x"
                dragConstraints={{ left: minDrag, right: maxDrag }}
                dragElastic={0.1}
                style={{ x, gap: GAP, touchAction: "none" }}
                onDragStart={() => {
                  dragStarted.current = true;
                }}
                onDragEnd={handleDragEnd}
                className="flex items-center"
              >
                {agents.map((agent) => (
                  <button
                    key={agent.title}
                    onPointerUp={() => handleAgentSelect(agent)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <Image
                      src={agent.src}
                      alt={agent.title}
                      height={24}
                      width={24}
                      className="pointer-events-none h-6 w-6 object-contain"
                    />
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPicker((s) => !s)}
        className="flex h-8 w-8 items-center justify-center rounded-full border-t border-white bg-neutral-100 p-1.5 dark:border-neutral-600 dark:bg-neutral-800"
      >
        <img
          src={selectedAgent?.src ?? "https://via.placeholder.com/100"}
          alt={selectedAgent?.title ?? "AI Agent"}
          className="h-full w-full object-contain"
        />
      </motion.button>
    </div>
  );
};

export const AIInputSubmitButton = ({
  onClick,
  disabled = false,
  isLoading = false,
}: {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-white"
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <IconSquare />
          </motion.div>
        ) : (
          <motion.div
            key="arrow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <RightArrow />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
