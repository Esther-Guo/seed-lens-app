/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
// import { createProxyMiddleware } from 'http-proxy-middleware';
/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "124.221.52.47",
        port: "9000",
        pathname: "/lens/**",
      },
    ],
    domains: ["https://seed-api.pfp-dao.io"]

  // async rewrites() {
  //   return [
  //     {
  //       source: '/post/:path*',
  //       destination: 'http://101.200.91.164:8080/post/:path*', // 替换为目标域名
  //       // 将请求路径中的 /api/ 替换为目标域名的 /api/ ，例如 /api/posts -> http://example.com/api/posts
  //     },
  //   ];

  },
};
export default config;
