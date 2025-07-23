/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**', // Lebih spesifik jika memungkinkan
      },
      {
        protocol: 'http',
        hostname: 'localhost', // Tambahkan ini untuk jaga-jaga
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },

    ],
  },
}

module.exports = nextConfig