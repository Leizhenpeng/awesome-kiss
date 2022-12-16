import clientNow from './scripts/clientParse'
import { defineConfig } from 'vite'
import packageJson from './package.json'
import { commonConfig } from './vite.config'
import { obfuscator } from 'rollup-obfuscator'
const config = defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const ifCompress = (fn: () => any, defaultVal: any = {}) => {
    if (!isDev) { return fn() }
    return defaultVal
  }

  return {
    ...commonConfig(),
    plugins: [
      ifCompress(() => obfuscator({
        optionsPreset: 'default'
      }))
    ],
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log', 'console.error', 'console.warn', 'console.debug', 'console.trace']
    },
    build: {
      target: 'es2015',
      outDir: `plugin/${clientNow}/code`,
      minify: ifCompress(() => 'esbuild', false),
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
