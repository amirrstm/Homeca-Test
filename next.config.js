/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'statics.basalam.com',
        port: '',
        pathname: '/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
