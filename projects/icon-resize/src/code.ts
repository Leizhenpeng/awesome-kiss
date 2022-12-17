import { client } from 'kiss-core'
import { io_hook as io } from 'kiss-msg'
import './utils/notification'
import { event } from './event'
import { SelParser } from './utils/operation/selParse'
import { firstParserConfig } from './code.state'
import { IconResizer } from '@/utils/operation/resize'


client.mg.showUI(__html__, {
  width: 300,
  height: 440,
  visible: true
})

io?.on(event.UI_CLOSE, () => {
  client.mg.closePlugin()
})

io?.on(event.UI_INIT, () => {
  firstParserConfig().then((config) => {
    console.log('config', config)
    io?.send(event.CODE_INIT_CONFIG, config)
  })
})

io?.on(event.UI_CHANGE_SIZE, (data) => {
  const sel = new SelParser().sel
  console.log(sel)
  const resizer = new IconResizer(sel, data)
  resizer.run()
})
