import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@apis', replacement: path.resolve(__dirname, './src/apis') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@features', replacement: path.resolve(__dirname, './src/features') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: '@redux', replacement: path.resolve(__dirname, './src/redux') },
      { find: '@routes', replacement: path.resolve(__dirname, './src/routes') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 5173, // or any other port you want
    strictPort: true, // optional: fails if the port is taken
  },
});
