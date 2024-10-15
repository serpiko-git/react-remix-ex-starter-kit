import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

installGlobals();

export default defineConfig({
  server: {
    host: process.env.HOST ?? '0.0.0.0',
    port: Number(process.env.PORT) ?? 3002,
  },
  plugins: [
    remix(),
    tsconfigPaths(),
    ...(process.env.SKIP_LINT === 'true'
      ? []
      : [
          checker({
            typescript: true,
            eslint: {
              lintCommand: 'eslint .',
            },
          }),
        ]),
  ],
  build: {
    target: 'esnext',
    sourcemap: process.env.GENERATE_SOURCEMAP === 'true' ? true : false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  define: { 'process.env': process.env },
});
