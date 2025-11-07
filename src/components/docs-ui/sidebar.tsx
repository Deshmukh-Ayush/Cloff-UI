"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsConfig } from "@/lib/docs";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-background fixed top-0 left-0 z-30 h-screen w-60">
      <div className="h-full overflow-y-auto px-6 py-26">
        {/* Navigation */}
        <nav className="space-y-6">
          {docsConfig.map((section) => (
            <div key={section.title}>
              <h4 className="text-foreground mb-2 text-sm font-semibold">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-1 py-1 text-sm transition-all duration-200 ease-in-out",
                          isActive
                            ? "bg-primary text-neutral-950 dark:text-neutral-50"
                            : "text-neutral-800 hover:bg-gray-100/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-gray-800/50 dark:hover:text-neutral-100",
                        )}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span>{item.title}</span>
                          {item.label && (
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-xs font-medium",
                                item.label === "new" &&
                                  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                                item.label === "updated" &&
                                  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                                item.label === "beta" &&
                                  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                                item.label === "deprecated" &&
                                  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                              )}
                            >
                              {item.label}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
