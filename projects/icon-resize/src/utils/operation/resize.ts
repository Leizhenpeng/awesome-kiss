import { IAppConfig } from '../../../types/code'
import { io_hook } from 'kiss-msg'
import { event } from '@/event'
import { updateConfig } from '@/utils/operation/cache'
import { cacheName } from '@/code.state'

export class IconResizer {
  nodes: any
  config:IAppConfig

  constructor(nodes: any, config: IAppConfig) {
    this.nodes = nodes
    this.config = config
  }

  get frameAndComponentNodes() {
    return this.nodes.filter((node: any) => {
      return node.type === 'FRAME' || node.type === 'COMPONENT'
    })
  }

  checkNoSelection() {
    if (this.frameAndComponentNodes.length === 0) {
      io_hook?.emit(event.WARN, '🥱没有找到可变换的图标')
      return true
    }
    return false
  }

  successTip(num=1){
    console.log(num)
    io_hook?.emit(event.NOTIFY, `🎉 ${num} 份图标已完成规范`)
  }
  updateCacheConfig(){
    updateConfig(cacheName,this.config).then()
  }

  run() {
    if (this.checkNoSelection()) return
    const num = this.frameAndComponentNodes.length
    this.frameAndComponentNodes.forEach((node: any) => {
      const aNodeResize = new NodeResizer(node,this.config)
      aNodeResize.run()
    })
    this.updateCacheConfig()
    this.successTip(num)
  }

}

class NodeResizer {
  node: any
  cloneNode: any
  iconSize: number
  boxSize: number

  constructor(node: any, config: IAppConfig) {
    this.node = node
    this.iconSize = config.iconSize
    this.boxSize = config.boxSize
    this.cloneNode = this.clone(node)
  }

  clone(node: any) {
    return node.clone()
  }

  groupChildren() {
    const childrenLength = this.cloneNode.children.length
    if (childrenLength > 1) {
      mg.group(this.cloneNode.children as any);
    }
  }

  get firstChild() {
    return this.cloneNode.children[0]
  }

  changeWH() {
    const child = this.firstChild
    const resizeValue = this.iconSize
    if (child.height > child.width) {
      let sizeRatio = child.height / child.width;
      child.width = resizeValue / sizeRatio;
      child.height = resizeValue;
    } else {
      let sizeRatio = child.width / child.height;
      child.height = resizeValue / sizeRatio;
      child.width = resizeValue;
    }
  }

  changeCenter(){
    const child = this.firstChild
    const frameWidth = this.boxSize
    const frameHeight = this.boxSize
    let groupWidth = child.width;
    let groupHeight = child.height;
    let centerValue = (frameWidth - groupWidth) / 2;
    child.relativeTransform = [[1, 0, centerValue], [0, 1, (frameHeight - groupHeight) / 2]];
  }

  jsonClone(val:any) {
    return JSON.parse(JSON.stringify(val));
  }




  traverseConstraint(node: any) {
    if ("children" in node) {
      if (node.type !== "INSTANCE") {
        for (const child of node.children) {
          if (child.constraints) {
            let constraints = this.jsonClone(child.constraints);
            constraints.vertical = 'SCALE';
            constraints.horizontal = 'SCALE';
            child.constraints = constraints;
          }
          this.traverseConstraint(child);
        }
      }
    }
  }


  changeBox(){
    const node_clone = this.cloneNode
    node_clone.flexMode = 'VERTICAL'
    node_clone.mainAxisAlignItems = 'CENTER'
    node_clone.crossAxisAlignItems = 'CENTER'
    node_clone.mainAxisSizingMode = 'FIXED'
    node_clone.crossAxisSizingMode = 'FIXED'
    node_clone.width = this.boxSize;
    node_clone.height = this.boxSize;
  }

  delNode(){
    this.node.remove()
  }
  run() {
    this.groupChildren()
    this.changeWH()
    this.traverseConstraint(this.firstChild)
    this.changeCenter()
    this.changeBox()
    this.delNode()
  }


}
