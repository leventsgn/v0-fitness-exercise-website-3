/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? ''
const isGitHubPages = Boolean(process.env.GITHUB_PAGES)

const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  // When deploying to GitHub Pages under a repository (e.g. https://<user>.github.io/<repo>),
  // set basePath and assetPrefix so generated assets reference the repo path correctly.
  basePath: isGitHubPages && repoName ? `/${repoName}` : '',
  assetPrefix: isGitHubPages && repoName ? `/${repoName}/` : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
