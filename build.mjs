// Build script: bundles the card into a single dist/ha-template-visualizer-card.js
// using esbuild. Run with `node build.mjs` or `node build.mjs --watch`.
import * as esbuild from 'esbuild';

const watch = process.argv.includes('--watch');

const options = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/ha-template-visualizer-card.js',
  format: 'esm',
  target: 'es2021',
  sourcemap: true,
  minify: !watch,
  logLevel: 'info',
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(options);
}
