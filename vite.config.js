import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import dotenv from 'dotenv';

dotenv.config();
// ----------------------------------------------------------------------

export default defineConfig({
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
  },
  define: {
    // REACT_APP_BASE_URL: import.meta.env,
  },
  server: {
    port: 3030,
    // https: true,
    // key: path.resolve(__dirname, 'server.key') ,
    // cert: path.resolve(__dirname, 'server.crt')  ,
  },
  preview: {
    port: 3030,
    // https: true,
    // key: path.resolve(__dirname, 'server.key') ,
    // cert: path.resolve(__dirname, 'server.crt')  ,
  },
});
