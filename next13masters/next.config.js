/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    typedRoutes: false,
    mdxRs: true,
    serverActions: true,
  },
  images: {
    domains: ['media.graphassets.com'],
  },
  redirects: async () => {
    return [
      {
        source: '/products',
        destination: '/products/1',
        permanent: false,
      },
      {
        source: '/categories',
        // TODO
        destination: '/categories/t-shirts',
        permanent: false,
      },
      {
        source: '/categories/:category',
        destination: '/categories/:category/1',
        permanent: false,
      },
    ];
  },
};

const withMDX = require('@next/mdx')();

module.exports = withMDX(nextConfig);
