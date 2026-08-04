import { redirect } from "next/navigation";
import { projects } from "@/data/content";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function LegacyProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/?case=${slug === "safar" ? "safar" : "haven"}`);
}
