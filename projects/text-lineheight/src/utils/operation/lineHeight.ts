import { client, env } from 'kiss-core'
import { masterGoClinet, figmaClient } from 'kiss-core/types'
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
    // step 1;get rangefontsize ;get max
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
      this.textNodeFg.getRangeAllFontNames(0, this.textNodeFg.characters.length)
        .map(figma.loadFontAsync)
    )
  }

  changeLineHeight (rario_ = 1) {
    const ratio = rario_ || 1
    this.loadAllFont().then(() => {
      this.textNodeFg.setRangeLineHeight(0, this.textNode.characters.length, {
        unit: 'PIXELS',
        value: this.maxWidth * ratio
      } as any)
    })
    console.log('this.maxWidth', this.maxWidth)
  }

  async changeAutoLineHeight () {
    await this.loadAllFont()
    this.textNodeFg.setRangeLineHeight(0, this.textNode.characters.length, {
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

  tipSuccess () {
    tipResult(this.successNum, this.changeWay, this.ratio)
  }

  changeFontSizeLineHeight () {
    if (!(this.changeWay === Ecommand.fontSize)) { return }

    this.texts.forEach((component: any) => {
      try {
        const nowCom = new LineHeight(component)
        nowCom.changeLineHeight()
        this.successNum += 1
      } catch (e) {
        console.error(e)
      }
    })
    this.tipSuccess()
  }

  changeCustomLineHeight () {
    if (!(this.changeWay === Ecommand.custom)) { return }

    this.texts.forEach((component: any) => {
      try {
        const nowCom = new LineHeight(component)
        nowCom.changeLineHeight(this.ratio)
        this.successNum += 1
      } catch (e) {
        console.error(e)
      }
    })
    this.tipSuccess()
  }

  changeAutoLineHeight () {
    if (!(this.changeWay === Ecommand.auto)) { return }

    this.texts.forEach((component: any) => {
      try {
        const nowCom = new LineHeight(component)
        nowCom.changeAutoLineHeight()
        this.successNum += 1
      } catch (e) {
        console.error(e)
      }
    })
    this.tipSuccess()
  }

  detach () {
    if (this.ifNoText()) {
      this.tipSuccess()
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
