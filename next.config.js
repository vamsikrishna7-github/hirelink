/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'api.hirelink.com',
      'hirelink-api.onrender.com',
      'images.unsplash.com',
      'upload.wikimedia.org',
      '1000logos.net',
      'encrypted-tbn0.gstatic.com',
      'assets.stickpng.com',
      'w7.pngwing.com',
      'encrypted-tbn0.gstatic.com',
      'img.icons8.com',
      'encrypted-tbn1.gstatic.com',
      'logo.clearbit.com', 
      'res.cloudinary.com',
      'google.com',
      'icons.duckduckgo.com',
      'www.google.com',
      'res.cloudinary.com',
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
}

module.exports = nextConfig;
