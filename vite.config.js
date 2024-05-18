import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import dotenv from 'dotenv';

dotenv.config();

// ----------------------------------------------------------------------
export default ({ mode }) => {
  // Extends 'process.env.*' with VITE_*-variables from '.env.(mode=production|development|staging)'
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  console.log("mode", mode)
  return defineConfig({
    plugins: [
      react(),
      checker({
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), 'node_modules/$1'),
        },
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), 'src/$1'),
        },
      ],
      extensions: ['.js', '.mjs', '.ts', '.jsx', '.tsx', '.json'],
    },
    // define: {
    //   REACT_APP_BASE_URL: import.meta.env.DEV ? import.meta.env.,
    // },
    server: {
      port: 3030,
    },
    preview: {
      port: 3030,
    },
    base: '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
  });
};
