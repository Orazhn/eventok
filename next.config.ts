/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    domains: ["img.clerk.com", "adfbhphpzpvrphafeqfh.supabase.co"],
  },
};

module.exports = nextConfig;
