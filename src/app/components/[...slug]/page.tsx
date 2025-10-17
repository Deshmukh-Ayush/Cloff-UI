import { notFound } from "next/navigation";
import { findFilePathForSlug, getAllDocPages } from "@/lib/docs";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function ComponentDocPage({ params }: Props) {
  const { slug } = await params;
  const filePath = await findFilePathForSlug(slug);
  if (!filePath) {
    notFound();
  }

  try {
    const { default: Content } = await import(`../../../content/${filePath}`);
    return (
      <article className="prose max-w-none py-8">
        <Content />
      </article>
    );
  } catch (err) {
    console.error("Failed to import MDX:", err);
    notFound();
  }
}

export async function generateStaticParams() {
  const pages = await getAllDocPages();
  return pages.map((p) => ({
    slug: p.slugSegments,
  }));
}

export const dynamicParams = false;
