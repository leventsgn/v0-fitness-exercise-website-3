/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? 'v0-fitness-exercise-website-3'
const isGitHubPages = Boolean(process.env.GITHUB_PAGES)

const nextConfig = {
  // GitHub Pages için static export
  output: 'export',
  basePath: isGitHubPages ? `/${repoName}` : '',
  assetPrefix: isGitHubPages ? `/${repoName}/` : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
