import { masterGoClinet, figmaClient } from 'kiss-core/types'
import { Ecommand } from '../../../types/code.d'
import { tipResult } from '../notification'

type FrameNodeMg = masterGoClinet.FrameNode
type TextNodeMg = masterGoClinet.TextNode

export class LineHeight {
  private textNode: TextNodeMg
  maxWidth: number

  constructor (textNode: TextNodeMg) {
    this.textNode = textNode
    this.parserMaxCharSize()
  }

  parserMaxCharSize () {
    const textStyles = this.textNode.textStyles
    const maxCharSize = textStyles.reduce((max: any, now: any) => {
      if (now.textStyle.fontSize > max) { return now.textStyle.fontSize }

      return max
    }
    , 1)
    this.maxWidth = maxCharSize
  }

  changeSize () {
    this.textNode.width = this.maxWidth
  }

  changeAlign () {
    this.textNode.textAlignHorizontal = 'CENTER'
    this.textNode.textAlignVertical = 'TOP'
    this.textNode.textAutoResize = 'HEIGHT'
  }

  changeLineHeight (rario_ = 1) {
    const ratio = rario_ || 1
    this.textNode.setRangeLineHeight(0, this.textNode.characters.length, {
      unit: 'PIXELS',
      value: this.maxWidth * ratio
    } as any)
  }

  changeAutoLineHeight () {
    this.textNode.setRangeLineHeight(0, this.textNode.characters.length, {
      unit: 'AUTO'
    } as any)
  }

  run () {
    this.changeLineHeight()
    // this.changeAlign()
    // this.changeSize()
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
