module.exports = {
  presets: [
    [
      "@vue/babel-preset-jsx",
      {
        "vModel": true,
        "compositionAPI": false
      }
    ],
    [
      '@babel/env',
      {
        targets: {
          browsers: ['> 1% in CN', 'not ie <= 11', 'Android >= 5.0', 'IOS 8'],
        },
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false,
      },
    ],
  ],
  plugins: [
    // 'transform-vue-jsx',
    "@vue/babel-plugin-transform-vue-jsx",
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
  sourceType: 'unambiguous',
};
