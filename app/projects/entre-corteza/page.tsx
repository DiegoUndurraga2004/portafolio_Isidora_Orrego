import type { Metadata } from 'next';
import { ProjectPage } from '@/components/portfolio/ProjectPage';
import { getPortfolioProject } from '@/lib/portfolio-content';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Entre Corteza — Isidora Orrego',
  description: 'Colección cápsula inspirada en Amelia Errázuriz, por Isidora Orrego y equipo.',
};

export default function EntreCortezaPage() {
  return <ProjectPage project={getPortfolioProject('entre-corteza')!} />;
}
