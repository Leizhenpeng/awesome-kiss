import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import clientNow from './scripts/clientParse'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'
const config = defineConfig({
  plugins: [
    reactPlugin(),
    viteSingleFile()
  ],
  build: {
    outDir: `plugin/${clientNow}/ui`,
    minify: !isDev,
    sourcemap: isDev,
    cssCodeSplit: false,
    assetsInlineLimit: 100000000000000000,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: 'assets/[name].js'
      }
    }
  }

})

export default config
