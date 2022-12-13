import clientNow from './scripts/clientParse'
import { defineConfig } from 'vite'
import packageJson from './package.json'
const config = defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  return {
    build: {
      outDir: `plugin/${clientNow}/code`,
      minify: !isDev,
      watch: isDev ? {} : null,
      sourcemap: isDev,
      lib: {
        entry: './src/code.ts',
        name: packageJson.name,
        formats: ['es']
      },
      rollupOptions: {
        output: {
          entryFileNames: 'index.js',
          extend: true
        }
      }
    }
  }
})

export default config
