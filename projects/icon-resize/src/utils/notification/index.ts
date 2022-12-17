import { e } from '@/event'
import { io_hook as io } from 'kiss-msg'
import { client, env } from 'kiss-core'

function dataToString (data: any) {
  if (typeof data !== 'string') {
    data = JSON.stringify(data)
  }
  return data
}

io?.on(e.NOTIFY, (data) => {
  data = dataToString(data)
  if (env.inMg) {
    client.mg.notify(data, {
      position: 'bottom',
      type: 'normal'
    })
  } else {
    client.figma.notify(data, {
      timeout: 3000,
      error: false
    })
  }
})

io?.on(e.WARN, (data) => {
  data = dataToString(data)
  if (env.inMg) {
    client.mg.notify(data, {
      position: 'bottom',
      type: 'warning'
    })
  } else {
    client.figma.notify(data, {
      timeout: 3000,
      error: true
    })
  }
})

// eport const tipResult = (successNum: number, changeType = Ecommand.fontSize, ratio = 1) => {
//   if (!successNum) {
//     io?.emit(e.WARN, '👀 没有发现文本层')
//     return
//   }
//   switch (changeType) {
//     case Ecommand.auto:
//       io?.emit(e.NOTIFY, `🎉 已修改 ${successNum} 份文本层为自动行高`)
//       break
//     case Ecommand.fontSize:
//       io?.emit(e.NOTIFY, `🎉 已修改 ${successNum} 份文本层的行高与字号相等`)
//       break
//     case Ecommand.custom:
//       io?.emit(e.NOTIFY, `🎉 已修改 ${successNum} 份文本层行高为 ${ratio} 倍字号`)
//   }
// }
