import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { obfuscator } from 'rollup-obfuscator'
import clientNow from './scripts/clientParse'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'
const ifCompress = (fn: () => any, defaultVal: any = {}) => {
  if (!isDev) { return fn() }
  return defaultVal
}
export const commonConfig = () => {
  return {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`
      }
    }
  }
}
const config = defineConfig({
  ...commonConfig(),
  plugins: [
    Vue(
      {
        reactivityTransform: true
      }
    ),
    Unocss(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core'
      ],
      dts: true
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: true
    }),
    viteSingleFile(),
    ifCompress(() => obfuscator({
      optionsPreset: 'low-obfuscation'
    }))
  ],
  build: {
    outDir: `plugin/${clientNow}/ui`,
    minify: ifCompress(() => 'terser', false),
    terserOptions: ifCompress(() => ({
      compress: {
        drop_console: true
      }
    }), null),
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
