<script setup lang="ts">
import { darkTheme, GlobalThemeOverrides } from 'naive-ui';
import { io_ui as io } from 'kiss-msg'
import { event as e } from './event'
const iconSize = ref(18)
const boxSize = ref(22)
const triggerOne = ref('This works!')
const resizeIcon = () => {
    parent.postMessage({
        type: 'resize', triggerOne: triggerOne.value, data: JSON.stringify({
            boxSize: boxSize.value,
            iconSize: iconSize.value,
        })
    }
        , '*')
}
const cancel = () => {
    parent.postMessage({ type: 'cancel' }, '*')
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

// window.addEventListener('message', (event: any) => {
//     const { data } = event
//     if (data.name === 'saveDefaults') {
//         const { boxSize: boxSizeCache, iconSize: iconSizeCache } = data
//         if (boxSizeCache) {
//             boxSize.value = boxSizeCache
//         }
//         if (iconSizeCache) {
//             iconSize.value = iconSizeCache
//         }
//     }
//     if (data.name === 'setTheme') {
//         const { ifDark } = data
//         isDark.value = ifDark
//     }
// })
onMounted(() => {
  io?.send(e.UI_INIT,'')
})
const formatValue = (lengthValue: any) => {
    if (lengthValue === null) return ''
    return `${lengthValue} px`
}

const parseValue = (lengthValue: any) => {
    if (lengthValue === null) return null
    //regex filter not number
    const value = lengthValue.replace(/[^\d.]/g, '')
    return Number(value)
}

const validatorValue = (value: any) => {
    if (value === null) return true
    return /^\d+(\.(\d+)?)?$/.test(value)
}
const goHome = () => {
    window.open("https://mastergo.com/community/plugin/72353391572009", '_blank');
}
onKeyStroke('Escape', (e) => {
    e.preventDefault()
    cancel()
})
</script>

<template>
    <div>
        <n-config-provider :theme-overrides="themeOverrides" :theme="ifUseDarkTheme">
            <div flex="~ center col">
                <img src="./assets/logo.png" alt="logo" cursor-pointer w-30 h-30 mt-2 @click="goHome">
                <div mt-2 mb--2>
                    <n-form>
                        <n-form-item label="ICON SIZE">
                            <template #label>
                                <div flex="~ row center " justify-start>
                                    <img src="./assets/icon.png" alt="icon" w-20px h-20px>
                                    <h2 font-bold>图标大小</h2>
                                </div>
                            </template>
                            <n-input-number v-model:value="iconSize" clearable :validator="validatorValue" :format="formatValue"
                                :parse="parseValue" />
                        </n-form-item>
                        <n-form-item>
                            <template #label>
                                <div flex="~ row center " justify-start>
                                    <img src="./assets/box.png" alt="icon" w-20px h-20px>
                                    <h2 font-bold>盒子大小</h2>
                                </div>
                            </template>
                            <n-input-number v-model:value="boxSize" clearable :validator="validatorValue" :format="formatValue"
                                :parse="parseValue" />
                        </n-form-item>
                    </n-form>
                </div>
                <div flex="~ row gap-2 center">
                    <button @click="resizeIcon" btn min-w-160px @keydown.enter="resizeIcon">修改大小</button>
                    <button btn bg-warn @click="cancel">取消</button>
                </div>
            </div>
        </n-config-provider>
    </div>

</template>

<style>

</style>
