import { BASE_PATH } from '@/lib/base-path';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';
import { PortfolioNavigation } from '@/components/portfolio/PortfolioNavigation';
import { portfolioIdentity, portfolioProjects } from '@/lib/portfolio-content';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      <PortfolioNavigation />
      <main>
        <section className="home-hero" aria-labelledby="home-title">
          <p className="hero-name">ISIDORA ORREGO</p>
          <h1 id="home-title">
            <span className="hero-mirar">
              MIRAR
              <img
                className="hero-pin"
                src={`${BASE_PATH}/portfolio/identity/isidora-alfiler-azul.png`}
                alt=""
                aria-hidden="true"
              />
            </span>
            <em>DISTINTO</em>
          </h1>
          <p className="hero-claim">diseñar con intención</p>
          <span className="hero-index" aria-hidden="true">IO / 2026</span>
        </section>

        <section className="home-intro" aria-label="Introducción">
          <p className="section-index">00 / ENFOQUE</p>
          <p className="home-intro-copy">
            Diseño desde el concepto, buscando relaciones entre moda, imagen,
            materialidad y comunicación. Me interesa construir propuestas claras y
            cuidadas, dejando siempre espacio para una decisión inesperada que les dé
            carácter.
          </p>
        </section>

        <section className="home-projects" id="proyectos" aria-labelledby="projects-title">
          <div className="home-projects-heading">
            <p className="section-index">01 / SELECCIÓN</p>
            <h2 id="projects-title">Proyectos</h2>
            <p>Concepto, materialidad y comunicación.</p>
          </div>

          <div className="editorial-project-grid">
            {portfolioProjects.map((project) => {
              const hero = project.images.find((image) => image.role === 'hero')!;

              return (
                <a
                  className={`home-project-card home-project-${project.number}`}
                  href={`${BASE_PATH}${project.route}`}
                  key={project.slug}
                >
                  <figure>
                    <div className="home-project-image-wrap">
                      <img
                        src={`${BASE_PATH}${hero.src}`}
                        alt={hero.alt ?? `${project.title}, imagen principal del proyecto`}
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>{project.number}</span>
                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.homeMetadata}</p>
                      </div>
                      <span aria-hidden="true">↗</span>
                    </figcaption>
                  </figure>
                </a>
              );
            })}
          </div>
        </section>

        <section className="home-principle" aria-label="Principio de trabajo">
          <p>{portfolioIdentity.principle}</p>
          <blockquote>{portfolioIdentity.rule}</blockquote>
          <span>{portfolioIdentity.balance.restraint}<br />{portfolioIdentity.balance.expression}</span>
        </section>
      </main>
      <PortfolioFooter />
    </>
  );
}
