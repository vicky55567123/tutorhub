/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // NOTE: do NOT set `unoptimized: true` globally - that disables Next.js's
    // built-in image resizing/compression/caching for every <Image> on the
    // site (including course photos), which was making pages feel slow to
    // load. Components that display arbitrary avatar URLs (Google/Facebook
    // profile pictures, user-uploaded avatars) already pass the `unoptimized`
    // prop individually where needed, so turning this off site-wide is safe.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
