<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { io_ui as io } from 'kiss-msg'
import type { IAppConfig } from 'types/code'
import type { Dto_Resize } from './event'
import { event as e } from './event'
import { configApp } from './app.state'

const resizeIcon = () => {
  io?.query<Dto_Resize>('UI_CHANGE_SIZE', toRaw(configApp))
}
const cancel = () => {
  io?.send(e.UI_CLOSE, '')
}
const isDark = ref(false)
const ifUseDarkTheme = computed(() => {
  if (isDark.value)
    return darkTheme
  return undefined
})
const el = ref(null)
const mainColor = useCssVar('--c-primary', el)
useTitle('masterGo Plugin UI')
const themeOverrides = computed(() => {
  /**
   * js 文件下使用这个做类型提示
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const custom: GlobalThemeOverrides = {
    common: {
      primaryColor: mainColor.value,
      primaryColorHover: mainColor.value,
      successColor: mainColor.value,
    },
    Button: {
      textColor: mainColor.value,
      textColorFocus: mainColor.value,
      color: mainColor.value,
      borderHover: mainColor.value,
      borderPressed: mainColor.value,
    },
  }
  return custom
})

io?.on(e.CODE_INIT_CONFIG, (data: IAppConfig) => {
  configApp.boxSize = data.boxSize
  configApp.iconSize = data.iconSize
})

onMounted(() => {
  io?.send(e.UI_INIT, '')
})
const formatValue = (lengthValue: any) => {
  if (lengthValue === null)
    return ''
  return `${lengthValue} px`
}
const parseValue = (lengthValue: any) => {
  if (lengthValue === null)
    return null
  // regex filter not number
  const value = lengthValue.replace(/[^\d.]/g, '')
  return Number(value)
}

const validatorValue = (value: any) => {
  if (value === null)
    return true
  return /^\d+(\.(\d+)?)?$/.test(value)
}
const goHome = () => {
  window.open('https://mastergo.com/community/plugin/72353391572009', '_blank')
}
onKeyStroke('Escape', (e) => {
  e.preventDefault()
  cancel()
})
</script>

<template>
  <div>
    <n-config-provider :theme-overrides="themeOverrides" :theme="ifUseDarkTheme">
      <div flex="~ center col" pt-2>
        <img src="./assets/logo.png" alt="logo" cursor-pointer w-30 h-30 mt-2 @click="goHome">
        <div my-4 mb--2>
          <n-form>
            <n-form-item label="ICON SIZE">
              <template #label>
                <div flex="~ row center " justify-start>
                  <img src="./assets/icon.png" alt="icon" w-20px h-20px>
                  <h2 font-bold ml-1>
                    图标大小
                  </h2>
                </div>
              </template>
              <n-input-number
                v-model:value="configApp.iconSize" clearable :validator="validatorValue" :format="formatValue"
                :parse="parseValue"
              />
            </n-form-item>
            <n-form-item>
              <template #label>
                <div flex="~ row center " justify-start>
                  <img src="./assets/box.png" alt="icon" w-20px h-20px>
                  <h2 font-bold ml-1>
                    盒子大小
                  </h2>
                </div>
              </template>
              <n-input-number
                v-model:value="configApp.boxSize" clearable :validator="validatorValue" :format="formatValue"
                :parse="parseValue"
              />
            </n-form-item>
          </n-form>
        </div>
        <div flex="~ row gap-2 center" mt-2>
          <button btn min-w-160px @click="resizeIcon" @keydown.enter="resizeIcon">
            修改大小
          </button>
          <button btn bg-warn @click="cancel">
            取消
          </button>
        </div>
      </div>
    </n-config-provider>
  </div>
</template>

<style>

</style>
