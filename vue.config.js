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
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon:  null,
      msTileImage: null
    }
  }
}
