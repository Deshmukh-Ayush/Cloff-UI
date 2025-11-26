import { Sidebar } from "@/components/docs-ui/sidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="mt-16 ml-56 flex-1 dark:bg-black">
        <div className="container max-w-4xl px-8 py-10">{children}</div>
      </main>
    </div>
  );
}
