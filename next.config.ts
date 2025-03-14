/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    domains: [
      "img.clerk.com",
      "source.unsplash.com",
      "unsplash.com",
      "images.unsplash.com",
      "ox9boek9u7.ufs.sh",
      "utfs.io",
      "adfbhphpzpvrphafeqfh.supabase.co",
    ],
  },
};

module.exports = nextConfig;
