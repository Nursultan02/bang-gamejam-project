const { defineConfig } = require('@vue/cli-service')
const VuePreloadPlugin = require('@vue/preload-webpack-plugin')

const myPreloadPlug = new VuePreloadPlugin({
  rel: 'preload',
  fileBlacklist: [/\.js/],
  as(entry) {
    if (/\.css$/.test(entry)) return 'style';
    if (/\.woff$/.test(entry)) return 'font';
    if (/\.png$/.test(entry)) return 'image';
    return 'script';
  }
})
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [myPreloadPlug]
  },
})
