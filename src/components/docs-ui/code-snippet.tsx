"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import {
  type ComponentProps,
  cloneElement,
  type HTMLAttributes,
  type ReactElement,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type SnippetProps = ComponentProps<typeof Tabs>;

export const Snippet = ({ className, ...props }: SnippetProps) => (
  <Tabs
    className={cn(
      "group w-full gap-0 overflow-hidden rounded-md border",
      className,
    )}
    {...props}
  />
);

export type SnippetHeaderProps = HTMLAttributes<HTMLDivElement>;

export const SnippetHeader = ({ className, ...props }: SnippetHeaderProps) => (
  <div
    className={cn(
      "bg-secondary flex flex-row items-center justify-between border-b p-1",
      className,
    )}
    {...props}
  />
);

export type SnippetCopyButtonProps = ComponentProps<typeof Button> & {
  value: string;
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const SnippetCopyButton = ({
  asChild,
  value,
  onCopy,
  onError,
  timeout = 2000,
  children,
  ...props
}: SnippetCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (
      typeof window === "undefined" ||
      !navigator.clipboard.writeText ||
      !value
    ) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      onCopy?.();

      setTimeout(() => setIsCopied(false), timeout);
    }, onError);
  };

  if (asChild) {
    return cloneElement(children as ReactElement, {
      // @ts-expect-error - we know this is a button
      onClick: copyToClipboard,
    });
  }

  const icon = isCopied ? <CheckIcon size={14} /> : <CopyIcon size={14} />;

  return (
    <Button
      className="opacity-0 transition-opacity group-hover:opacity-100"
      onClick={copyToClipboard}
      size="icon"
      variant="ghost"
      {...props}
    >
      {children ?? icon}
    </Button>
  );
};

export type SnippetTabsListProps = ComponentProps<typeof TabsList>;

export const SnippetTabsList = TabsList;

export type SnippetTabsTriggerProps = ComponentProps<typeof TabsTrigger>;

export const SnippetTabsTrigger = ({
  className,
  ...props
}: SnippetTabsTriggerProps) => (
  <TabsTrigger className={cn("gap-1.5", className)} {...props} />
);

export type SnippetTabsContentProps = ComponentProps<typeof TabsContent>;

export const SnippetTabsContent = ({
  className,
  children,
  ...props
}: SnippetTabsContentProps) => (
  <TabsContent
    asChild
    className={cn(
      "bg-background mt-0 p-4 text-sm text-neutral-900 dark:text-neutral-200",
      className,
    )}
    {...props}
  >
    <pre className="truncate">{children}</pre>
  </TabsContent>
);

const iconCache = new Map<string, LucideIcon | null>();

async function loadIcon(iconName: string): Promise<LucideIcon | null> {
  if (iconCache.has(iconName)) {
    return iconCache.get(iconName) ?? null;
  }

  try {
    const lucide = await import("lucide-react");
    const icon =
      (lucide[iconName as keyof typeof lucide] as LucideIcon) ?? null;
    iconCache.set(iconName, icon);
    return icon;
  } catch (err) {
    console.error(`Failed to load icon: ${iconName}`, err);
    iconCache.set(iconName, null);
    return null;
  }
}

type Command = {
  label: string;
  icon: string;
  code: string;
};

type CodeSnippetProps = {
  commands: Command[];
};

const CodeSnippet = ({ commands }: CodeSnippetProps) => {
  const [value, setValue] = useState(commands[0]?.label ?? "");
  const [icons, setIcons] = useState<Record<string, LucideIcon | null>>({});

  const iconNames = useMemo(
    () => Array.from(new Set(commands.map((cmd) => cmd.icon))),
    [commands],
  );

  useEffect(() => {
    let isMounted = true;

    const loadIcons = async () => {
      const loadedIcons = await Promise.all(
        iconNames.map(async (name) => ({
          name,
          component: await loadIcon(name),
        })),
      );

      if (isMounted) {
        const iconsMap = Object.fromEntries(
          loadedIcons.map(({ name, component }) => [name, component]),
        );
        setIcons(iconsMap);
      }
    };

    loadIcons();

    return () => {
      isMounted = false;
    };
  }, [iconNames]);

  const activeCommand = useMemo(
    () => commands.find((c) => c.label === value),
    [commands, value],
  );

  return (
    <Snippet onValueChange={setValue} value={value}>
      <SnippetHeader>
        <SnippetTabsList>
          {commands.map(({ label, icon }) => {
            const Icon = icons[icon];
            return (
              <SnippetTabsTrigger key={label} value={label}>
                {Icon ? <Icon size={14} /> : <div className="h-3.5 w-3.5" />}
                <span>{label}</span>
              </SnippetTabsTrigger>
            );
          })}
        </SnippetTabsList>
        {activeCommand && <SnippetCopyButton value={activeCommand.code} />}
      </SnippetHeader>
      {commands.map(({ label, code }) => (
        <SnippetTabsContent key={label} value={label}>
          {code}
        </SnippetTabsContent>
      ))}
    </Snippet>
  );
};

export default CodeSnippet;
