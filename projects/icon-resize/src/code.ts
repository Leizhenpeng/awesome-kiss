import { client } from 'kiss-core'
import { io_hook as io } from 'kiss-msg'
import './utils/notification'

import { event } from './event'
import { SelParser } from './utils/operation/selParse'
import { firstParserConfig } from './code.state'
const a = ref(231)
console.log('a', a.value)
console.log('123213', 123213)
client.mg.showUI(__html__, {
  width: 300,
  height: 410,
  visible: true
})

// io?.on(event.UI_CLOSE, () => {
//   client.mg.closePlugin()
// })

io?.on(event.UI_INIT, () => {
  // firstParserConfig().then((config) => {
  //   console.log('config', config)
  //   // io?.send(event.CODE_INIT_CONFIG, config)
  // })
})

// io?.on(event.UI_CHANGE_SIZE, (data) => { })
