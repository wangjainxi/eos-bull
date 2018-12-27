module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      },
      "element-ui"
    ],
    [
      "component",
      {
        libraryName: "mint-ui",
        style: true
      },
      "mint-ui"
    ],
  ]
};
