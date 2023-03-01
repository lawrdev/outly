/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // for @svgr/webpack
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
}

module.exports = nextConfig
