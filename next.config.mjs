/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    //  API_URL: 'http://localhost:3333',
    API_URL: 'https://c9c1-2001-8a0-c78e-1f00-b5a4-6cad-6a80-90bf.ngrok-free.app',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
