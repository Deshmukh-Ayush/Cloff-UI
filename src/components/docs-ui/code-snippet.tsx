import React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

// Base Snippet component
export const Snippet = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-0 overflow-hidden rounded-lg border border-neutral-300 bg-white text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100",
        className,
      )}
    >
      {children}
    </div>
  );
};

// Tab component for package manager selection
const SnippetTab = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-gray-200 text-gray-900 dark:bg-neutral-800 dark:text-white"
          : "bg-white text-gray-500 hover:text-gray-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
      }`}
    >
      {children}
    </button>
  );
};

const SnippetHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between border-b border-neutral-300 bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900">
      {children}
    </div>
  );
};

// Tabs container
const SnippetTabs = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex">{children}</div>;
};

// Code content area
const SnippetContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <code
      className={`block bg-gray-50 px-4 py-3 font-mono text-sm text-gray-800 dark:bg-neutral-900 dark:text-neutral-100 ${className}`}
    >
      {children}
    </code>
  );
};

// Copy button
const SnippetAction = ({
  onCopy,
  copied,
}: {
  onCopy: () => void;
  copied: boolean;
}) => {
  return (
    <button
      onClick={onCopy}
      className="px-3 py-2 text-gray-500 transition-colors hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-100"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
};

// Attach subcomponents to main component
Snippet.Header = SnippetHeader;
Snippet.Tabs = SnippetTabs;
Snippet.Tab = SnippetTab;
Snippet.Content = SnippetContent;
Snippet.Action = SnippetAction;
