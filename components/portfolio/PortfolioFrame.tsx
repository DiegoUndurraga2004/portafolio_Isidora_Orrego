import type { ReactNode } from 'react';
import { PortfolioFooter } from './PortfolioFooter';
import { PortfolioNavigation } from './PortfolioNavigation';
import styles from './portfolio-chrome.module.css';

export function PortfolioFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <PortfolioNavigation />
      <div className={styles.pageOffset}>{children}</div>
      <PortfolioFooter />
    </>
  );
}
