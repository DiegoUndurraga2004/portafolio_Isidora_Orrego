import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'portafolio';
const repositoryOwner =
  process.env.GITHUB_REPOSITORY?.split('/')[0] ?? 'isiorregov';
const isUserOrOrganizationPage = repositoryName.toLowerCase().endsWith('.github.io');
const basePath = isGitHubPages && !isUserOrOrganizationPage ? `/${repositoryName}` : '';
const siteUrl =
  process.env.SITE_URL ??
  (isGitHubPages
    ? `https://${repositoryOwner.toLowerCase()}.github.io${basePath}`
    : 'http://localhost:3000');

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  trailingSlash: false,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
