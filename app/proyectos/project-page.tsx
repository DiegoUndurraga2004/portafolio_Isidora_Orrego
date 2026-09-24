import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getProject, getSuggestedProject } from '@/lib/isidora-portfolio';
import { BASE_PATH } from '@/lib/base-path';

export function ProjectPage({ slug }: { slug: string }) {
  const project = getProject(slug)!;
  const suggested = getSuggestedProject(slug);

  return (
    <main className={`io-page project-page ${project.accent}`}>
      <header className="io-header project-header">
        <a href={`${BASE_PATH}/portafolios/mirar-distinto.html#proyectos`} className="io-back"><ArrowLeft size={17} /> Todos los proyectos</a>
        <a href={`${BASE_PATH}/portafolios/mirar-distinto.html`} className="io-wordmark">ISIDORA ORREGO</a>
        <span>{project.number} / {project.area}</span>
      </header>

      <section className="project-hero">
        <div className="project-index">PROYECTO {project.number}</div>
        <h1>{project.title}</h1>
        <p>{project.area}</p>
        <div className="project-hero-placeholder"><span>AÑADIR FOTO</span></div>
      </section>

      <section className="project-summary">
        <p className="io-label">Concepto / 01</p>
        <p>{project.statement}</p>
      </section>

      <section className="project-facts">
        <div className="project-fact-row"><span>Dirección</span><p>{project.description}</p></div>
        <div className="project-fact-row"><span>Aporte</span><p>{project.contribution}</p></div>
        <div className="project-fact-row"><span>Claves</span><div className="project-tags">{project.approach.map((item) => <span key={item}>{item}</span>)}</div></div>
      </section>

      <section className="project-gallery">
        <div className="project-gallery-placeholder"><span>AÑADIR FOTO</span></div>
        <div className="project-gallery-placeholder small"><span>AÑADIR FOTO</span></div>
      </section>

      <section className="project-principle">
        <span className="io-label">Principio / 02</span>
        <p>Una base clara. <em>Un gesto</em> que da carácter.</p>
      </section>

      <section className="suggested-project">
        <p>Proyecto sugerido</p>
        <a className="suggested-link" href={`${BASE_PATH}/proyectos/${suggested.slug}.html`}>
          <div className={`suggested-placeholder ${suggested.accent}`}><span>AÑADIR FOTO</span></div>
          <div className="suggested-copy">
            <span>{suggested.number} / {suggested.area}</span>
            <h2>{suggested.title}</h2>
            <p>{suggested.statement}</p>
            <ArrowUpRight size={24} />
          </div>
        </a>
      </section>

      <footer className="io-footer"><span>ISIDORA ORREGO</span><span>Mirar distinto</span><span>2025—2026</span></footer>
    </main>
  );
}
