import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

const input = 'src/smd.ts';
const output = type => `dist/smd.${type}`;

export default [{
  input,
  plugins: [
    esbuild({
      target: 'esnext'
    })
  ],
  output: [{
    file: output('js'),
    format: 'esm'
  }, {
    file: output('cjs'),
    format: 'cjs'
  }]
}, {
  input,
  plugins: [dts()],
  external: [
    'fs'
  ],
  output: {
    file: output('d.ts'),
    format: 'es'
  }
}];
