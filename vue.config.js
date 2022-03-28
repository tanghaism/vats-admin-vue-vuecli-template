const { defineConfig } = require('@vue/cli-service');
const { dependencies } = require('./package.json');
const webpack = require('webpack');
const path = require('path');

const IS_PROD = process.env.NODE_ENV === 'production';

const pathResolve = dir => {
  return path.join(__dirname, dir);
};

const getDependVersion = packageName => {
  try {
    const { version } = require(`./node_modules/${packageName}/package.json`);
    return version;
  } catch (e) {
    return null;
  }
};

const getDNSLinks = () => {
  const rels = ['preconnect', 'dns-prefetch'];
  const hrefs = ['https://cdnjs.cloudflare.com/', 'https://unpkg.com/'];

  return rels.reduce(
    (result, rel) => result.concat(hrefs.map(href => `<link href="${href}" rel="${rel}">`)),
    [],
  );
};

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  pinia: 'Pinia',
  axios: 'axios',
  dayjs: 'dayjs',
  './dayjs': 'dayjs',
  'ant-design-vue': 'antd',
  'ant-design-vue/dist/antd.css': 'antd',
};

const externalsCDN = () => {
  return {
    links: [...getDNSLinks()],
    css: [
      `https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/ant-design-vue/${getDependVersion(
        'ant-design-vue',
      )}/antd.min.css`,
    ],
    js: [
      `https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-y/vue/${getDependVersion(
        'vue',
      )}/vue.global.prod.min.js`,
      `https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/vue-router/${getDependVersion(
        'vue-router',
      )}/vue-router.global.prod.min.js`,
      `https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/pinia/${getDependVersion(
        'pinia',
      )}/pinia.iife.prod.min.js`,
      `https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/vue-i18n/${getDependVersion(
        'vue-i18n',
      )}/vue-i18n.global.prod.min.js`,
      `https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-y/axios/${getDependVersion(
        'axios',
      )}/axios.min.js`,
      `https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/dayjs/${getDependVersion(
        'dayjs',
      )}/dayjs.min.js`,
      `https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/ant-design-vue/${getDependVersion(
        'ant-design-vue',
      )}/antd.min.js`,
    ],
  };
};

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  productionSourceMap: false,
  filenameHashing: IS_PROD,
  configureWebpack: {
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
    externals: IS_PROD ? externals : {},
    plugins: [IS_PROD && new webpack.IgnorePlugin(/^\.\/locale$/, /dayjs$/)].filter(Boolean),
  },
  chainWebpack(config) {
    config.optimization.delete('splitChunks');
    config.plugin(`html`).tap(args => {
      args[0].cdn = IS_PROD ? externalsCDN() : {};
      args[0].info = `version: ${
        process.env.npm_package_version
      } buildAt: ${new Date().toLocaleString()}`;
      args[0].title = dependencies.title;
      return args;
    });
  },
});
