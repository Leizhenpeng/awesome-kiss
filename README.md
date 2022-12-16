<br>

<h1 align="center">Awesome Kiss</h1>
<p align="center">
  Kiss-driven collection of design plug-ins
</p>

<p align="center">
<a href="https://www.npmjs.com/package/kiss-core"><img src="https://img.shields.io/npm/v/kiss-core?color=CF0A0A&amp;label=kiss" alt="NPM version"></a></p>


## 🍔 Choose Project

- [画矩形 (Rectangle Creator)](./projects/rectangle-creator) - 🥱 应该没有比它更简单的上手项目了吧 
- [字高 (Text Lineheight)](./projects/text-lineheight) - 🧘🏻‍♂️ 修改选区内文本层行高
- [图标可大可小 (Icon Resize)](./projects/icon-resize) - 🤾‍♂️ 规范图标尺寸

## 📦 How to Use

```bash
npx degit Leizhenpeng/awesome-kiss/projects/PROJECT__NAME kiss-project
cd kiss-project

pnpm install
```

## 🔨DEV

### In Figma

1. `pnpm run dev-figma`
2. open `Figma` > `Plugins` > `Development` > `import plugin from manifest...` > `/plugin/figma/manifest.json`


### In JsDesign

1. `pnpm run dev-js`
2. open `即时设计` > `插件` > `开发者` > `从manifest导入插件` > `/plugin/jsDesign/manifest.json`

### In MasterGo

1. `pnpm run dev-mg`
2. open `MasterGO` > `插件` > `开发者` >`创建/添加插件` > `从manifest导入插件` > `/plugin/mastergo/manifest.json`



## 🦪 Build 

一次性全平台打包

`pnpm run build-all`

或者单独打包

`pnpm run build-figma` 


`pnpm run build-mg`


`pnpm run build-js`

## 🚀 Features
- **Kiss**: Power By [Kiss](https://github.com/Leizhenpeng/design-tooltik-cn/tree/main/packages/kiss-core).
- **Hmr**: Support HMR(Hot Module Replacement) of Plugin
- **Vite**: Bundle user interface and js code using ViteJs

## 📄 License

[MIT](LICENSE).



