import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/content";
import { CaseStudyPage } from "@/components/case-study-page";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = getProject(slug); return project ? { title: project.title, description: project.summary } : {}; }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = getProject(slug); if (!project) notFound(); return <CaseStudyPage project={project} />; }
