/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    externalDir: true,
    esmExternals: "loose",
  },
  images: {
    disableStaticImages: false,
  }
};
module.exports = nextConfig;