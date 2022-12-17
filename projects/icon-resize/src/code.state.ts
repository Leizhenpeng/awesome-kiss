
import { IAppConfig } from '../types/code.d'
import { getConfig } from './utils/operation/cache'
import { ref } from 'vue'
const initConfig: IAppConfig = {
  boxSize: 24,
  iconSize: 20
}

const cacheName = 'icon-resize-config'
export const cache = ref<IAppConfig>()

export async function firstParserConfig () {
  if (!cache.value) {
    getConfig(cacheName, initConfig).then((config) => {
      cache.value = config
    })
  }
}
