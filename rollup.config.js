import babel from 'rollup-plugin-babel' // rollup 的 babel 插件，ES6转ES5
import resolve from 'rollup-plugin-node-resolve'  // 帮助寻找node_modules里的包
import commonjs from 'rollup-plugin-commonjs' // 将非ES6语法的包转为ES6可用
import json from 'rollup-plugin-json' // 允许引入 json 格式的文件
import nodePolyfills from 'rollup-plugin-node-polyfills'
// import replace from 'rollup-plugin-replace' // 替换待打包文件里的一些变量，如 process在浏览器端是不存在的，需要被替换
// import { uglify } from 'rollup-plugin-uglify' // 压缩包
import { terser } from 'rollup-plugin-terser' // rollup-plugin-uglify 的替代方案, 因为 uglify 不支持 es5

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default [
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        globals: {
          axios: 'axios',
          fingerprintjs2sync: 'Fingerprint2'
        }
      },
      {
        file: 'dist/es/index.js',
        format: 'es',
        globals: {
          axios: 'axios',
          fingerprintjs2sync: 'Fingerprint2'
        }
      },
      {
        file: 'dist/umd/index.js',
        format: 'umd',
        name: 'upload-toolkit',
        globals: {
          axios: 'axios',
          fingerprintjs2sync: 'Fingerprint2'
        }
      }
    ],
    external: ['axios', 'fingerprintjs2sync'],
    // globals: {
    //   // http: 'http',
    //   // https: 'https',
    //   // url: 'url',
    //   // assert: 'assert',
    //   // stream: 'stream',
    //   // tty: 'tty',
    //   // util: 'util',
    //   // os: 'os$1',
    //   // zlib: 'zlib',
    //   axios: 'axios',
    //   fingerprintjs2sync: 'Fingerprint2'
    // },
    plugins: [
      resolve({ extensions, preferBuiltins: true }),
      babel({
        exclude: '**/node_modules/**',
        extensions
      }),
      json({
        // All JSON files will be parsed by default,
        // but you can also specifically include/exclude files
        include: 'node_modules/**',
        // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],
        // for tree-shaking, properties will be declared as
        // variables, using either `var` or `const`
        preferConst: true, // Default: false
        // specify indentation for the generated default export —
        // defaults to '\t'
        indent: '  ',
        // ignores indent and generates the smallest code
        compact: true, // Default: false
        // generate a named export for every property of the JSON object
        namedExports: true // Default: true
      }),
      nodePolyfills({ crypto: true }),
      commonjs(),
      terser({
        warnings: false,
        compress: {
          collapse_vars: false
        }
      })
    ]
  }
]
