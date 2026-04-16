/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora errores de ESLint durante el build de producción
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
