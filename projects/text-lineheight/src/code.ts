import { client, env } from 'kiss-core'
import type { figmaClient } from 'kiss-core/types'
import { io_hook as io } from 'kiss-msg'
import { Ecommand } from '../types/code.d'
import './utils/notification'

import { event } from './event'
import { TextParser } from './utils/operation/lineHeight'
import { SelParser } from './utils/operation/selParse'

client.mg.showUI(__html__, {
  visible: false
})

// if (!env.inMg) {
//   client.figma.showUI(__html__, {
//     width: 200,
//     height: 120
//   })
// } else {
//   client.mg.showUI(__html__, {
//     width: 200,
//     height: 160
//   })
// }

io?.on(event.EXIST, () => {
  client.mg.closePlugin()
})

client.on('run', ({ command }: { command: any }) => {
  // 超时10s 自动关闭
  const timer = setTimeout(() => {
    client.mg.closePlugin()
    timer && clearTimeout(timer)
  }, 10000)

  const selElements = new SelParser().sel
  const aTextParser = new TextParser(selElements)
  aTextParser.changeWay = command
  aTextParser.run()
})
