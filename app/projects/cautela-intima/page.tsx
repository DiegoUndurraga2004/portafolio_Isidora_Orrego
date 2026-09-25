import type { Metadata } from 'next';
import { ProjectPage } from '@/components/portfolio/ProjectPage';
import { getPortfolioProject } from '@/lib/portfolio-content';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Cautela Íntima — Isidora Orrego',
  description: 'Proyecto de Alta Costura de Isidora Orrego: Umbral Recíproco.',
};

export default function CautelaIntimaPage() {
  return <ProjectPage project={getPortfolioProject('cautela-intima')!} />;
}
