// Custom port for dev server
// Note: Next.js does not support setting port in next.config.js directly.
// You must set the port via the npm script or command line.
// For example: "dev": "next dev -p 3001"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['flagcdn.com'],
  },
  // Add other config options here if needed
};

module.exports = nextConfig;
