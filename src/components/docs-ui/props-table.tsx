import { cn } from "@/lib/utils";
import React from "react";

// Base Props table
export const PropsTable = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900",
        className,
      )}
    >
      <table className="w-full">{children}</table>
    </div>
  );
};

// Table Header
const PropsTableHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead className="border-b border-neutral-800 bg-neutral-900">
      <tr>{children}</tr>
    </thead>
  );
};

// Table Header Cell
const PropsTableHeaderCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <th
      className={cn(
        "px-6 py-3 text-left text-sm font-semibold text-white",
        className,
      )}
    >
      {children}
    </th>
  );
};

// Table Body
const PropsTableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

// Table Row
const PropsTableRow = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <tr
      className={cn("border-b border-neutral-800 last:border-b-0", className)}
    >
      {children}
    </tr>
  );
};

// Table Cell
const PropsTableCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <td className={cn("px-6 py-4 text-sm text-neutral-300", className)}>
      {children}
    </td>
  );
};

// Code Badge (for prop names and types)
const PropsTableCode = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <code
      className={cn(
        "rounded bg-neutral-800 px-2 py-1 font-mono text-xs text-neutral-100",
        className,
      )}
    >
      {children}
    </code>
  );
};

// Attach subcomponents to main component
PropsTable.Header = PropsTableHeader;
PropsTable.HeaderCell = PropsTableHeaderCell;
PropsTable.Body = PropsTableBody;
PropsTable.Row = PropsTableRow;
PropsTable.Cell = PropsTableCell;
PropsTable.Code = PropsTableCode;
