module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    compress: true
  },
  productionSourceMap: false,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.webp',
      favicon16: 'favicon.webp',
      appleTouchIcon: null,
      maskIcon:  null,
      msTileImage: null
    }
  }
}
