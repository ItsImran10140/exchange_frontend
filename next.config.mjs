/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://exchange-backend-proxy.vercel.app/api/:path*', // Proxy to your API server
      },
    ];
  },
};

export default nextConfig;
