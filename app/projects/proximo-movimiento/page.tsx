import type { Metadata } from 'next';
import { ProjectPage } from '@/components/portfolio/ProjectPage';
import { getPortfolioProject } from '@/lib/portfolio-content';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Próximo Movimiento — Isidora Orrego',
  description: 'Proyecto de upcycling Vitatex x Schneider Electric desarrollado por Isidora Orrego y equipo.',
};

export default function ProximoMovimientoPage() {
  return <ProjectPage project={getPortfolioProject('proximo-movimiento')!} />;
}
