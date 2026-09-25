import type { Metadata } from 'next';
import { PortfolioFrame } from '@/components/portfolio/PortfolioFrame';
import styles from '@/components/portfolio/portfolio-pages.module.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contacto — Isidora Orrego',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <PortfolioFrame>
        <main className={styles.contactPage}>
          <div className={styles.contactTopline}>
            <p className={styles.contactLabel}>Isidora Orrego</p>
            <p className={styles.contactLocation}>Santiago, Chile</p>
          </div>

          <h1 className={styles.contactTitle}>Contacto</h1>

          <dl className={styles.contactDetails}>
            <div className={styles.contactRow}>
              <dt className={styles.contactLabel}>Correo</dt>
              <dd>
                <a className={styles.contactLink} href="mailto:iorregovc@gmail.com">
                  iorregovc@gmail.com
                </a>
              </dd>
            </div>
            <div className={styles.contactRow}>
              <dt className={styles.contactLabel}>Teléfono</dt>
              <dd>
                <a className={styles.contactLink} href="tel:+56974462678">
                  +56 9 7446 2678
                </a>
              </dd>
            </div>
            <div className={styles.contactRow}>
              <dt className={styles.contactLabel}>Instagram</dt>
              <dd>
                <a
                  className={styles.contactLink}
                  href="https://www.instagram.com/iorregov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @iorregov
                </a>
              </dd>
            </div>
          </dl>
        </main>
      </PortfolioFrame>
    </div>
  );
}
