/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api-portal.uryonym.com/api/v1/:path*',
      },
    ]
  },
}

module.exports = nextConfig
