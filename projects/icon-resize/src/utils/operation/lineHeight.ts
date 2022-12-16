import { client, env } from 'kiss-core'
import { figmaClient, masterGoClinet } from 'kiss-core/types'
import { Ecommand } from '../../../types/code.d'
import { tipResult } from '../notification'
import { allowFg, allowMg } from './selParse'
type FrameNodeMg = masterGoClinet.FrameNode
type TextNodeMg = masterGoClinet.TextNode

type TextNodeFigma = figmaClient.TextNode

export class LineHeight {
  private textNode: any
  maxWidth: number

  get textNodeFg () {
    return this.textNode as TextNodeFigma
  }

  get textNodeMg () {
    return this.textNode as TextNodeMg
  }

  constructor (textNode: TextNodeMg) {
    this.textNode = textNode
    this.parserMaxCharSize()
  }

  parserMaxCharSize () {
    this.parserMaxCharSizeFigma()
    this.parserMaxCharSizeMg()
  }

  @allowMg
  parserMaxCharSizeMg () {
    const textStyles = this.textNodeMg.textStyles
    const maxCharSize = textStyles.reduce((max: any, now: any) => {
      if (now.textStyle.fontSize > max) { return now.textStyle.fontSize }
      return max
    }
    , 1)
    this.maxWidth = maxCharSize
  }

  @allowFg
  parserMaxCharSizeFigma () {
    const totalCharSize = this.textNodeFg.characters.length
    let maxCharSize = 0
    for (let i = 0; i < totalCharSize; i++) {
      const nowCharSize = this.textNodeFg.getRangeFontSize(i, i + 1) as number
      if (nowCharSize > maxCharSize) {
        maxCharSize = nowCharSize
      }
    }
    this.maxWidth = maxCharSize
  }

  async loadAllFont () {
    if (env.inMg) return Promise.resolve()
    await Promise.all(
      this.textNode.getRangeAllFontNames(0, this.textNodeFg.characters.length)
        .map(figma.loadFontAsync)
    )
  }

  changeLineHeight (rario_ = 1) {
    const ratio = rario_ || 1
    this.loadAllFont().then(() => {
      this.textNode.setRangeLineHeight(0, this.textNodeFg.characters.length, {
        unit: 'PIXELS',
        value: this.maxWidth * ratio
      } as any)
    })
    console.log('this.maxWidth', this.maxWidth)
  }

  async changeAutoLineHeight () {
    await this.loadAllFont()
    console.log('this.textNodeFg.characters.length', this.textNodeFg.characters.length)
    this.textNode.setRangeLineHeight(0, this.textNodeFg.characters.length, {
      unit: 'AUTO'
    } as any)
  }
}

export class TextParser {
  private nodes: Array<FrameNodeMg | TextNodeMg>
  private texts: Array<TextNodeMg> = []
  private successNum = 0
  private _changeWay: Ecommand
  ratio: number // 行高对字号的倍数，构造函数传入，默认为1

  public get changeWay (): Ecommand {
    return this._changeWay
  }

  public set changeWay (value: Ecommand) {
    this._changeWay = value
  }

  findAllComponentCore (node: FrameNodeMg | TextNodeMg, components: Array<TextNodeMg>) {
    if (node.type === 'TEXT') {
      components.push(node)
      return
    }

    if (node?.children && node.children.length > 0) {
      node.children.forEach((child: any) => {
        this.findAllComponentCore(child, components)
      })
    }
  }

  findAllTextNode (node: any) {
    const result = [] as any
    this.findAllComponentCore(node, result)
    return result
  }

  get allTextNodes () {
    return this.nodes.map((node: any) => {
      return this.findAllTextNode(node)
    }).reduce((a: any, b: any) => a.concat(b), [])
  }

  parserALlComponent () {
    this.texts = this.allTextNodes
  }

  constructor (nodes: Array<FrameNodeMg | TextNodeMg>, ratio = 2) {
    this.nodes = nodes
    this.parserALlComponent()
    this.ratio = ratio
  }

  ifNoText () {
    return this.texts.length === 0
  }

  exist () {
    client.mg.closePlugin()
  }

  tipSuccess () {
    tipResult(this.successNum, this.changeWay, this.ratio)
  }

  factoryChangeLineHeight (fn: any) {
    if (this.ifNoText()) { return }
    console.log('12312', this.ifNoText())
    Promise.all(this.texts.map(async (component: any) => {
      try {
        const nowCom = new LineHeight(component)
        fn(nowCom)
        this.successNum += 1
      } catch (e) {
        console.error(e)
      }
    })).then(() => {
      this.tipSuccess()
    }).finally(() => {
      setTimeout(() => {
        this.exist()
      }
      , 1000)
    })
  }

  changeFontSizeLineHeight () {
    if (!(this.changeWay === Ecommand.fontSize)) { return }
    this.factoryChangeLineHeight((nowCom: any) => {
      nowCom.changeLineHeight()
    })
  }

  changeCustomLineHeight () {
    if (!(this.changeWay === Ecommand.custom)) { return }
    this.factoryChangeLineHeight((nowCom: any) => {
      nowCom.changeLineHeight(this.ratio)
    })
  }

  changeAutoLineHeight () {
    if (!(this.changeWay === Ecommand.auto)) { return }
    this.factoryChangeLineHeight((nowCom: any) => {
      nowCom.changeAutoLineHeight()
    })
  }

  detach () {
    if (this.ifNoText()) {
      this.tipSuccess()
      setTimeout(() => {
        this.exist()
      }
      , 1000)
      return
    }
    this.changeCustomLineHeight()
    this.changeFontSizeLineHeight()
    this.changeAutoLineHeight()
  }

  run () {
    this.detach()
  }
}
