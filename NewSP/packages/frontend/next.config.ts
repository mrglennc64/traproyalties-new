import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(), // Explicitly sets the root to the current directory
  },
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
