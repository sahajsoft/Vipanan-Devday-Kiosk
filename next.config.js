/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true // This forces the use of SWC
  }
};

module.exports = nextConfig; 