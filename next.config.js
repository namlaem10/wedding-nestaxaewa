/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudinary.com", // adjust this to match your image domain
        port: "",
        pathname: "/**",
      },
      // Add more patterns if you have other image domains
    ],
  },
};

module.exports = nextConfig;
