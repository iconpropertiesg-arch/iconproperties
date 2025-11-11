const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    _next_intl_trailing_slash: 'false'
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  transpilePackages: ['lucide-react'],
};

module.exports = withNextIntl(nextConfig);
