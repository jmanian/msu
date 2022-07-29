import { terser } from 'rollup-plugin-terser';

export default {
  input: 'music-for-business/scripts/main.js',
  output: { 
    file: 'public/assets/mfb-main.js'
  },
  plugins: [
    terser()
  ]
}