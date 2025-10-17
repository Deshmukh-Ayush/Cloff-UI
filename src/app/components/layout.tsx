import Sidebar from "@/components/docs-ui/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="bg-background sticky top-0 h-screen w-64">
        <Sidebar />
      </aside>
      <main className="dark:bg-background mt-[60px] flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
