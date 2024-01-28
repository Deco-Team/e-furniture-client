/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    CLIENT_ID: process.env.CLIENT_ID
  }
}

export default nextConfig
