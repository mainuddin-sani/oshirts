import { notFound } from "next/navigation";
import DesignDetail from "@/components/designs/DesignDetail/DesignDetail";
import { allDesignIds, findDesign } from "@/data/savedDesigns";

export function generateStaticParams() {
  return allDesignIds.map((designId) => ({ designId }));
}

export async function generateMetadata({ params }) {
  const { designId } = await params;
  const design = findDesign(designId);

  if (!design) return { title: "Design not found — Shirts" };

  return {
    title: `${design.name} (${design.id}) — Saved designs — Shirts`,
    description: `${design.name} on a ${design.color} ${design.style.brand} ${design.style.name}, saved ${design.savedLabel}.`,
  };
}

export default async function SavedDesignPage({ params }) {
  const { designId } = await params;
  const design = findDesign(designId);

  if (!design) notFound();

  return <DesignDetail design={design} />;
}
