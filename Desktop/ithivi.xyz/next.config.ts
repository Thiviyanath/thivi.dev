import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.20.20.176', 'localhost:3000'],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;