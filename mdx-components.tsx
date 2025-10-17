import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="mt-8 mb-4 text-6xl font-semibold" {...props} />
    ),
    h2: (props) => (
      <h2
        className="mt-6 mb-3 text-4xl font-semibold dark:text-neutral-100"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-5 mb-2 text-xl font-semibold" {...props} />
    ),
    p: (props) => (
      <p className="my-4 text-neutral-500 dark:text-neutral-300" {...props} />
    ),
    a: (props) => (
      <Link
        {...props}
        className="text-blue-600 hover:underline dark:text-blue-400"
      />
    ),
    ul: (props) => <ul className="my-4 list-disc pl-6" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal pl-6" {...props} />,
    li: (props) => <li className="mb-1" {...props} />,
    code: (props) => (
      <code
        className="rounded-md bg-neutral-100 px-1 py-0.5 text-sm dark:bg-neutral-800"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg bg-neutral-100 p-4 text-sm dark:bg-neutral-900"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-neutral-300 pl-4 text-neutral-600 italic dark:border-neutral-700 dark:text-neutral-400"
        {...props}
      />
    ),
    ...components,
  };
}
