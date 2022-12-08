const { defineConfig } = require('@vue/cli-service')
const VuePreloadPlugin = require('@vue/preload-webpack-plugin')

const myPreloadPlug = new VuePreloadPlugin({
  rel: 'preload',
  fileBlacklist: [/\.js/]
})
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [myPreloadPlug]
  },
})
