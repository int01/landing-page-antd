import { defineConfig } from "umi";
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const prodGzipList = ['js', 'css'];

const staticDir = "static";

export default defineConfig({
  routes: [
    { exact: true, path: "/", component: "@/pages/index" },
    // { exact: true, path: '/hm1', component: '@/pages/hm2' },
  ],
  targets: {
    ie: 11,
  },
  // mfsu: { production: { output: '.mfsu-production' } },
  dynamicImport: {},
  // exportStatic: {
  //   htmlSuffix: true,
  //   dynamicRoot: true,
  // },
  chainWebpack(config, { webpack }) {
    // 修改css输出目录
    config.plugin("extract-css").tap(() => [
      {
        filename: `${staticDir}/css/[name].[contenthash:8].css`,
        chunkFilename: `${staticDir}/css/[name].[contenthash:8].chunk.css`,
        ignoreOrder: true,
      },
    ]);

    // 修改js输出目录
    config.output
      .filename(`${staticDir}/js/[name].[hash:8].js`)
      .chunkFilename(`${staticDir}/js/[name].[contenthash:8].chunk.js`);
  },
});
