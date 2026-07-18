/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // src/middleware.ts fronts a few engine (SSA-engine repo) demo pages
    // under /demo/<slug> on this domain — their images are absolute URLs
    // pointing at the engine (see that engine repo's src/lib/asset-url.ts)
    // rather than local paths, so next/image's optimizer needs this host
    // explicitly allowlisted or it rejects them as an unrecognized
    // external source.
    remotePatterns: [{ protocol: 'https', hostname: 'engine.summitstudioagency.com' }],
  },
};

export default nextConfig;
