import { terser } from 'rollup-plugin-terser';

export default {
  input: 'music-for-business/scripts/main.js',
  output: { 
    dir: 'public/music-for-business/'
  },
  plugins: [
    terser()
  ]
}