const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.module.rule('optimize-images')
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use('file-loader')
      .loader('image-webpack-loader')
      .options({
        disable: true,
      });
  },
});
