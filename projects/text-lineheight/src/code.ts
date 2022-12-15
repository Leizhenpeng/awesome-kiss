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

io?.send('hook:hello', 'hello from hook')

io?.on('create-rectangles', (count) => {
  const nodes: figmaClient.SceneNode[] = []
  for (let i = 0; i < count; i++) {
    const rect = client.createRectangle() as any
    rect.x = i * 150
    if (!env.inMg) {
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }]
      client.figma.currentPage.appendChild(rect)
    } else {
      rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0.5, b: 1, a: 1 } }]
      client.mg.document.currentPage.appendChild(rect)
    }
    nodes.push(rect)
  }
  if (!env.inMg) {
    client.figma.currentPage.selection = nodes as any
  } else {
    client.mg.document.currentPage.selection = nodes as any
  }
  client.viewport.scrollAndZoomIntoView(nodes)
})

io?.on('ui:cancel', () => {
  client.closePlugin()
})

client.on('run', ({ command }: { command: any }) => {
  const selElements = new SelParser().sel
  const aTextParser = new TextParser(selElements)
  aTextParser.changeWay = command
  aTextParser.run()
  console.log('command', command)
  setTimeout(() => {
    io?.emit(event.EXIST)
  }, 1400)
})
