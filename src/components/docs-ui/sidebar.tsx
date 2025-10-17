import Link from "next/link";
import { getDocsSidebar } from "@/lib/docs";

export default async function Sidebar() {
  const sidebar = await getDocsSidebar();

  return (
    <nav className="h-full overflow-y-auto p-4 pt-[90px]">
      {Object.entries(sidebar).map(([heading, pages]) => (
        <div key={heading} className="mb-4">
          <h3 className="px-2 text-sm font-semibold text-black capitalize dark:text-white">
            {heading}
          </h3>
          <ul className="mt-2 space-y-1">
            {pages.map((page) => {
              const href = `/components/${page.slugSegments.join("/")}`;
              return (
                <li key={page.filePath}>
                  <Link
                    href={href}
                    className="hover:bg-muted hover:text-foreground block rounded px-2 py-1 text-sm text-neutral-500"
                  >
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
