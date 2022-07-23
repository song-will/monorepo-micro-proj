const path = require('path')
import extensions from 'rollup-plugin-extensions'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'

export default {
 input: path.resolve(__dirname, '../src/index.js'),
 output: {
    file: path.resolve(__dirname, '../lib/xt-vue-components.common.js'), 
    format: 'cjs',
    exports: 'auto'
 },
 plugins: [
    extensions({
      extensions: ['.js', '.vue', '.json'],
      resolveIndex: true,
    }),
    babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true 
    }),
    commonjs(),
    vue()
  ]
}