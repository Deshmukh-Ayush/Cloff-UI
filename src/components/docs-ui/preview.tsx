import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState } from "react";

type PreviewContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("Preview components must be used within PreviewRoot");
  }
  return context;
};

// Root component that'll manage state
export type PreviewRootProps = React.ComponentProps<"div"> & {
  defaultTab?: string;
};

export const PreviewRoot = ({
  children,
  className,
  defaultTab = "preview",
  ...props
}: PreviewRootProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <PreviewContext.Provider value={{ activeTab, setActiveTab }}>
      <div
        className={cn("relative min-h-[70vh] max-w-4xl rounded-md", className)}
        {...props}
      >
        {children}
      </div>
    </PreviewContext.Provider>
  );
};

// Tabs wrapper - container for tabs
export type PreviewTabsProps = React.ComponentProps<"div">;

export const PreviewTabs = ({
  children,
  className,
  ...props
}: PreviewTabsProps) => {
  return (
    <div
      className={cn(
        "absolute top-0 z-10 flex w-full items-center justify-between px-4 py-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// tab button
export type PreviewTabProps = React.ComponentProps<"button"> & {
  value: string;
};

export const PreviewTab = ({
  children,
  className,
  value,
  ...props
}: PreviewTabProps) => {
  const { activeTab, setActiveTab } = usePreview();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "text-md mr-2 rounded-md px-5 py-2 text-neutral-900 transition-colors dark:text-neutral-100",
        isActive
          ? "bg-neutral-500 font-medium"
          : "hover:bg-neutral-300 active:bg-neutral-500",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Content container
export type PreviewContentProps = React.ComponentProps<"div"> & {
  value: string;
};

export const PreviewContent = ({
  children,
  className,
  value,
  ...props
}: PreviewContentProps) => {
  const { activeTab } = usePreview();

  if (activeTab !== value) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 top-14 flex items-center justify-center rounded-2xl border border-neutral-500 p-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
