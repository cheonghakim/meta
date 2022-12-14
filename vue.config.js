const { defineConfig } = require('@vue/cli-service')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  outputDir: process.env.OUTPUT_DIR,
  indexPath: process.env.INDEX_HTML_PATH,
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.PROXY_TARGET,
        ws: true,
        changeOrigin: true,
        secure: false,
      },
      '^/graphql': {
        target: process.env.PROXY_TARGET,
        ws: true,
        changeOrigin: true,
      },
    },
    allowedHosts: 'auto',
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production' || process.env.DEV_HASH) {
      config.output.filename('js/[name].js?hash=[hash:8]')
      config.output.chunkFilename('js/[name].js?hash=[chunkhash:8]')
      config.plugins.delete('prefetch')
    }
    // config.module
    //   .rule("@open-wc/webpack-import-meta-loader")
    //   .test(/\.js$/)
    //   .use("@open-wc/webpack-import-meta-loader")
    //   .loader("@open-wc/webpack-import-meta-loader");
  },
  configureWebpack: {
    // plugins: [
    //   new WasmPackPlugin({
    //     crateDirectory: path.resolve(__dirname, './wasm'), //rust 프로젝트 경로
    //     outDir: '../public/pkg', // 아웃풋 경로
    //     extraArgs: '--no-typescript --target bundler --mode normal',
    //   }),
    //   new BundleAnalyzerPlugin({
    //     analyzerMode: "disabled",
    //     openAnalyzer: false,
    //     generateStatsFile: true,
    //     statsOptions: { source: false },
    //   }),
    // ],
    optimization: {
      // minimize: true,
      // minimizer: [
      //   new UglifyJsPlugin({
      //     cache: true,
      //   }),
      // ],
      // splitChunks: {
      //   cacheGroups: {
      //     node_vendors: {
      //       test: /[\\/]node_modules[\\/]/,
      //       chunks: "async",
      //       priority: 1,
      //     },
      //   },
      // },
    },
  },
})
