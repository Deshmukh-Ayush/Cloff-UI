"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

export const Tabs = ({
  defaultValue,
  children,
  className = "",
}: {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div
        className={`flex flex-col gap-0 overflow-hidden rounded-lg text-neutral-800 dark:text-neutral-100 ${className}`}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList (header section)
export const TabsList = ({ children }: { children: ReactNode }) => {
  return <div className="inline-flex">{children}</div>;
};

// Individual Tab Button
export const TabsTrigger = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within <Tabs>");

  const isActive = ctx.activeTab === value;

  return (
    <button
      onClick={() => ctx.setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-gray-200 text-gray-900 dark:bg-neutral-800 dark:text-white"
          : "bg-white text-gray-500 hover:text-gray-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
      }`}
    >
      {children}
    </button>
  );
};

// Content Area
export const TabsContent = ({
  value,
  children,
  className = "",
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within <Tabs>");

  if (ctx.activeTab !== value) return null;

  return (
    <div
      className={`px-4 py-3 font-mono text-sm text-gray-800 dark:text-neutral-100 ${className}`}
    >
      {children}
    </div>
  );
};
