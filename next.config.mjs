/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Type-checking (tsc --noEmit) is our authoritative correctness gate.
    // Lint still runs via `npm run lint` during development.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
