import esbuild from 'esbuild';
import fsp from 'fs/promises';
import path from 'path';

const outdir = 'build';

await fsp.rm(path.join(process.cwd(), outdir), {
  recursive: true,
  force: true
});

await esbuild.build({
  entryPoints: ['src/**/*.spec.ts'],
  outdir,
  bundle: true,
  format: 'esm',
  platform: 'node',
  external: [
    'tape'
  ],
  plugins: [{
    name: 'log',
    setup: build => {
      const label = '[esbuild] tape';

      build.onStart(() => console.time(label));
      build.onEnd(() => console.timeEnd(label));
    }
  }]
});
