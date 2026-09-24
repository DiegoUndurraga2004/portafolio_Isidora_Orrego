import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'portafolio_Isidora_Orrego';
const isUserOrOrganizationPage = repositoryName.toLowerCase().endsWith('.github.io');
const basePath = isGitHubPages && !isUserOrOrganizationPage ? `/${repositoryName}` : '';

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  trailingSlash: false,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
