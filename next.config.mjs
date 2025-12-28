/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? ''
const isGitHubPages = Boolean(process.env.GITHUB_PAGES)

const nextConfig = {
  // Note: Static export disabled for authentication features
  // basePath and assetPrefix are also disabled for local development
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
