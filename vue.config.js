module.exports = {
  devServer: {
    overlay: false,
    proxy: {
      '/' : {
        target: 'http://localhost:8009/'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
