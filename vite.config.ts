import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import electron from 'vite-plugin-electron';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

export default defineConfig({
  plugins: [
    solid(),
    electron([
      {
        entry: 'src/main/index.ts',
        vite: {
          build: {
            outDir: 'dist/main',
            rollupOptions: {
              external: [
                'electron',
              ]
            }
          }
        }
      },
      {
        entry: 'src/main/preload.ts',
        onstart(options) {
          options.reload();
        },
        vite: {
          build: {
            outDir: 'dist/main',
            rollupOptions: {
              external: [
                'electron',
              ],
              output: {
                format: 'cjs',
                entryFileNames: '[name].js'
              }
            }
          }
        }
      }
    ])
  ],
  build: {
    target: 'esnext',
    outDir: 'dist/renderer'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
