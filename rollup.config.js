import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  preserveSymlinks: true,
  input: [ 'navigation-menu.js' ],
  output: {
    file: 'dist/navigation-menu.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    babel(),
    terser({
      output: {
        comments: false
      }
    })
  ]
};