import type { CSSProperties } from 'react';
import { BASE_PATH } from '@/lib/base-path';
import {
  getFollowUpProjects,
  type NarrativeModule,
  type PortfolioProject,
  type ProjectImage,
} from '@/lib/portfolio-content';
import { PortfolioFooter } from './PortfolioFooter';
import { PortfolioNavigation } from './PortfolioNavigation';
import styles from './project-page.module.css';

const projectAccents: Record<PortfolioProject['slug'], string> = {
  'cautela-intima': '#888b91',
  vinculo: '#8d7657',
  'entre-corteza': '#746b45',
  'proximo-movimiento': '#baf000',
};

const imageRoleLabels: Record<ProjectImage['role'], string> = {
  hero: 'Imagen principal',
  result: 'Resultado',
  detail: 'Detalle',
  process: 'Proceso',
  technical: 'Desarrollo técnico',
};

const assetUrl = (path: string) => `${BASE_PATH}${path}`;

function PortfolioImage({ image, project, priority = false }: {
  image: ProjectImage;
  project: PortfolioProject;
  priority?: boolean;
}) {
  return (
    <figure className={styles.imageFigure}>
      <img
        src={assetUrl(image.src)}
        alt={image.alt ?? `${imageRoleLabels[image.role]} del proyecto ${project.title}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

function Narrative({ module, project }: { module: NarrativeModule; project: PortfolioProject }) {
  if (module.kind === 'quote') {
    return <blockquote className={styles.narrativeQuote}>{module.text}</blockquote>;
  }

  if (module.kind === 'list') {
    return (
      <section className={styles.narrativeList} aria-label={module.label}>
        <p>{module.label}</p>
        <ul>{module.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
    );
  }

  if (module.kind === 'video' && project.video) {
    return (
      <figure className={styles.videoFigure}>
        <video
          controls
          playsInline
          preload="metadata"
          poster={assetUrl(project.video.poster)}
        >
          <source src={assetUrl(project.video.src)} type="video/mp4" />
          Tu navegador no permite reproducir este video.
        </video>
        {project.video.credit ? <figcaption>{project.video.credit}</figcaption> : null}
      </figure>
    );
  }

  if (module.kind === 'images') {
    const images = module.imageIds
      .map((imageId) => project.images.find((image) => image.id === imageId))
      .filter((image): image is ProjectImage => Boolean(image));

    return (
      <div className={`${styles.narrativeImages} ${styles[`layout_${module.layout}`]}`}>
        {images.map((image) => <PortfolioImage image={image} project={project} key={image.id} />)}
      </div>
    );
  }

  return null;
}

function DetailList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className={styles.detailList}>
      <h3>{label}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

export function ProjectPage({ project }: { project: PortfolioProject }) {
  const hero = project.images.find((image) => image.role === 'hero')!;
  const followUpProjects = getFollowUpProjects(project.slug) ?? [];
  const accentStyle = {
    '--project-accent': projectAccents[project.slug],
  } as CSSProperties;

  return (
    <div className={styles.projectShell} style={accentStyle}>
      <PortfolioNavigation />
      <main>
        <header className={styles.projectIntro}>
          <p className={styles.projectNumber}>PROYECTO {project.number}</p>
          <h1>{project.title}</h1>
          {project.subtitle ? <p className={styles.projectSubtitle}>{project.subtitle}</p> : null}
          <blockquote>{project.statement}</blockquote>

          <dl className={styles.metadata}>
            <div>
              <dt>Año / período</dt>
              <dd>
                {project.metadata.year}
                <span className={styles.metaSecondary}>{project.metadata.period}</span>
              </dd>
            </div>
            <div><dt>Curso</dt><dd>{project.metadata.course}</dd></div>
            <div><dt>Tipo</dt><dd>{project.metadata.type}</dd></div>
            {project.metadata.role ? (
              <div><dt>Rol</dt><dd>{project.metadata.role.join(' · ')}</dd></div>
            ) : null}
            <div><dt>Herramientas</dt><dd>{project.metadata.tools.join(' · ')}</dd></div>
          </dl>
        </header>

        <div className={styles.heroImage}>
          <PortfolioImage image={hero} project={project} priority />
          <span aria-hidden="true">{project.number}</span>
        </div>

        <section className={styles.briefSection} aria-label="Encargo y propuesta">
          <article>
            <p className={styles.sectionLabel}>01 / Encargo</p>
            <p>{project.commission}</p>
          </article>
          <article>
            <p className={styles.sectionLabel}>02 / Propuesta</p>
            <p>{project.proposal}</p>
          </article>
        </section>

        <section className={styles.projectLedger} aria-label="Información complementaria">
          {project.context ? <DetailList label="Contexto" items={[project.context]} /> : null}
          {project.user ? <DetailList label="Usuario" items={[project.user]} /> : null}
          {project.concept ? <DetailList label="Concepto" items={[project.concept]} /> : null}
          {project.trend ? <DetailList label="Tendencia" items={[project.trend]} /> : null}
          {project.collection ? <DetailList label="Colección" items={project.collection} /> : null}
          {project.result ? <DetailList label="Resultado" items={project.result} /> : null}
          {project.materials ? <DetailList label="Materialidad" items={project.materials} /> : null}
          {project.techniqueDetails ? (
            <DetailList
              label="Técnicas"
              items={project.techniqueDetails.map(({ label, value }) => `${label}: ${value}`)}
            />
          ) : project.techniques ? (
            <DetailList label="Técnicas" items={project.techniques} />
          ) : null}
          {project.construction ? (
            <DetailList
              label="Construcción"
              items={project.construction.map(({ name, detail }) => `${name}: ${detail}`)}
            />
          ) : null}
          {project.references ? <DetailList label="Obras de referencia" items={project.references} /> : null}
          {project.team ? (
            <DetailList label={`Equipo · ${project.team.count} integrantes`} items={project.team.members} />
          ) : null}
          {project.responsibilities ? <DetailList label="Mi rol" items={project.responsibilities} /> : null}
          {project.collaboration ? (
            <DetailList label="Colaboración LUAU Shoes" items={project.collaboration} />
          ) : null}
          {project.technicalSheets ? <DetailList label="Fichas técnicas" items={project.technicalSheets} /> : null}
          {project.technicalSheetContents ? (
            <DetailList label="Contenido técnico" items={project.technicalSheetContents} />
          ) : null}
        </section>

        {project.highlight ? (
          <aside className={styles.projectHighlight}>
            <span>Hito</span>
            <p>{project.highlight}</p>
          </aside>
        ) : null}

        <section className={`${styles.narrative} ${styles[`narrative_${project.slug.replaceAll('-', '_')}`]}`} aria-labelledby="narrative-title">
          <div className={styles.narrativeHeading}>
            <p className={styles.sectionLabel}>03 / Desarrollo visual</p>
            <h2 id="narrative-title">De la idea<br />a la materia</h2>
          </div>
          {project.narrative.map((module, index) => (
            <Narrative module={module} project={project} key={`${module.kind}-${index}`} />
          ))}
        </section>

        {project.credits.length ? (
          <section className={styles.credits} aria-label="Créditos">
            <p className={styles.sectionLabel}>Créditos</p>
            <dl>
              {project.credits.map((credit) => (
                <div key={credit.label}>
                  <dt>{credit.label}</dt>
                  <dd>{Array.isArray(credit.value) ? credit.value.join(' · ') : credit.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className={styles.followUp} aria-labelledby="follow-up-title">
          <p className={styles.sectionLabel}>04 / Continuidad</p>
          <h2 id="follow-up-title">{project.followUp.label}</h2>
          <div className={styles.followUpGrid}>
            {followUpProjects.map((followUpProject) => {
              const followUpHero = followUpProject.images.find((image) => image.role === 'hero')!;
              return (
                <a href={`${BASE_PATH}${followUpProject.route}`} key={followUpProject.slug}>
                  <div><img src={assetUrl(followUpHero.src)} alt={followUpHero.alt ?? followUpProject.title} loading="lazy" /></div>
                  <span>{followUpProject.number}</span>
                  <h3>{followUpProject.title}</h3>
                  <p>{followUpProject.homeMetadata}</p>
                </a>
              );
            })}
          </div>
        </section>
      </main>
      <PortfolioFooter />
    </div>
  );
}
