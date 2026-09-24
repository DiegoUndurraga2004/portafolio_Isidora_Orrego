import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { isidoraProjects } from '@/lib/isidora-portfolio';
import { BASE_PATH } from '@/lib/base-path';

export const dynamic = 'force-static';

export default function MirarDistintoPortfolio() {
  return (
    <main className="io-page">
      <header className="io-header">
        <a href={`${BASE_PATH}/#mis-portafolios`} className="io-back"><ArrowLeft size={17} /> Volver al archivo</a>
        <span className="io-wordmark">ISIDORA ORREGO</span>
        <span>PORTAFOLIO / 2025—2026</span>
      </header>

      <section className="io-hero">
        <p className="io-label">Dirección de arte · Styling · Fotografía · Moda</p>
        <h1>MIRAR <em>DISTINTO,</em><br />diseñar con intención</h1>
        <p className="io-intro">
          Transformo conceptos en universos visuales coherentes, combinando observación,
          styling, fotografía y detalle para dar carácter a cada proyecto sin sobrecargarlo.
        </p>
        <div className="io-hero-break">70% CONTENCIÓN <strong>30% EXPRESIÓN</strong></div>
      </section>

      <section className="io-manifesto">
        <p className="io-label">Manifiesto / 01</p>
        <p>
          Me interesa mirar con atención antes de diseñar. Encontrar relaciones, ordenar ideas
          y descubrir eso que puede transformar algo conocido en una experiencia diferente.
          <em> El carácter no aparece por acumular recursos, sino por saber elegirlos.</em>
        </p>
      </section>

      <section className="io-projects" id="proyectos">
        <div className="io-section-heading">
          <span>02</span><h2>PROYECTOS</h2><p>{isidoraProjects.length.toString().padStart(2, '0')} miradas</p>
        </div>
        <div className="io-project-grid">
          {isidoraProjects.map((project) => (
            <a className={`io-project-card ${project.accent}`} href={`${BASE_PATH}/proyectos/${project.slug}.html`} key={project.slug}>
              <div className="io-photo-placeholder"><span>AÑADIR FOTO</span></div>
              <div className="io-project-card-copy">
                <div><span>{project.number}</span><span>{project.area}</span></div>
                <h3>{project.title}</h3>
                <p>{project.statement}</p>
                <ArrowUpRight size={22} />
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="io-footer"><span>ISIDORA ORREGO</span><span>Mirar distinto</span><span>2025—2026</span></footer>
    </main>
  );
}
