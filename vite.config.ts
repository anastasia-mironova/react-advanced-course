import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json',
        root: './'
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
        dev: {
          logLevel: ['error', 'warning']
        }
      },
      overlay: {
        initialIsOpen: false,
        position: 'tl'
      },
      terminal: true
    })
  ],
  server: {
    open: true
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, './src/shared'),
      entities: path.resolve(__dirname, './src/entities'),
      features: path.resolve(__dirname, './src/features'),
      widgets: path.resolve(__dirname, './src/widgets'),
      pages: path.resolve(__dirname, './src/pages'),
      app: path.resolve(__dirname, './src/app')
    }
  }
})
