/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Natro hosting için statik dışa aktarma ayarları
  images: {
    unoptimized: true,
  },
  // Tarayıcı yolunu düzeltmek için
  basePath: '',
  trailingSlash: true,
}

module.exports = nextConfig
