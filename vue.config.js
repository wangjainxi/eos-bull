module.exports = {
  pages: {
    index: {
      entry: 'src/web/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
    mobile: 'src/mobile/main.ts'
  },
  productionSourceMap: false
}
