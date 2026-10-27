import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/work.html', destination: '/work', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/skills.html', destination: '/skills', permanent: true },
    ];
  },
};

export default nextConfig;
