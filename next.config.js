/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: "/appledger",

  async redirects() {
    return [
      {
        source: "/",
        destination: "/appledger/login",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
