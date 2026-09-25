import type { Metadata } from 'next';
import { ProjectPage } from '@/components/portfolio/ProjectPage';
import { getPortfolioProject } from '@/lib/portfolio-content';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Vínculo — Isidora Orrego',
  description: 'Colección de complementos de moda en cuero de Isidora Orrego.',
};

export default function VinculoPage() {
  return <ProjectPage project={getPortfolioProject('vinculo')!} />;
}
