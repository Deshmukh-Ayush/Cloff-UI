import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

// Base Snippet component using composition pattern
export const Snippet = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col gap-0 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 ${className}`}
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
      className={`border-r border-neutral-800 px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-neutral-800 text-white"
          : "bg-neutral-900 text-neutral-400 hover:text-neutral-300"
      }`}
    >
      {children}
    </button>
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
      className={`flex-1 px-4 py-2 font-mono text-sm text-neutral-100 ${className}`}
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
      className="border-l border-neutral-800 px-3 py-2 text-neutral-400 transition-colors hover:text-neutral-100"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
};

// Attach subcomponents to main component
Snippet.Tabs = SnippetTabs;
Snippet.Tab = SnippetTab;
Snippet.Content = SnippetContent;
Snippet.Action = SnippetAction;
