# icon-resize
![Vue.js Badge](https://img.shields.io/badge/Vue.js-4FC08D?logo=vuedotjs&logoColor=fff&style=flat)
![UnoCSS Badge](https://img.shields.io/badge/UnoCSS-333?logo=unocss&logoColor=fff&style=flat)
![Vite Badge](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=flat)
![rollup.js Badge](https://img.shields.io/badge/rollup.js-EC4A3F?logo=rollupdotjs&logoColor=fff&style=flat)

> ⛽️选中一个或者多个图标, 快速规范 BOX SIZE + ICON SIZE
> 
> ⭐️支持无鼠标操作: TAB+ARROW+ENTER+ESC
> 
> 🍙更多介绍: https://www.bilibili.com/video/bv1de411T713
  

## 上线地址
- [MasterGo](https://mastergo.com/community/plugin/72353391572009) 
<!-- - [Figma](https://www.figma.com/community/plugin/1184814057510773140)  -->
<!-- - [即时设计](https://mastergo.com/community/plugin/77836422690335)  -->

## 📦 Install

```bash
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

或单独打包

`pnpm run build-figma` 


`pnpm run build-mg`


`pnpm run build-js`

## 🚀 Features
- **KISS**: Power By [Kiss](https://github.com/Leizhenpeng/design-tooltik-cn/tree/main/packages/kiss-core).
- **HMR**: Support HMR(Hot Module Replacement) of Plugin
- **Vite**: Bundle user interface and js code using ViteJs
- **React**: Use ReactJs to write the user interface

## 📄 License

[MIT](LICENSE).



[build-src]: https://flat.badgen.net/github/checks/bokub/gradient-string?label=tests
[version-src]: https://runkit.io/bokub/npm-version/branches/master/gradient-string?style=flat
[codecov-src]: https://flat.badgen.net/codecov/c/github/bokub/gradient-string
[downloads-src]: https://flat.badgen.net/npm/dm/gradient-string?color=FF9800
[xo-src]: https://flat.badgen.net/badge/code%20style/XO/5ed9c7
[awesome-src]: https://awesome.re/mentioned-badge-flat.svg

[build-href]: https://github.com/bokub/gradient-string/actions/workflows/run.yml
[version-href]: https://www.npmjs.com/package/gradient-string
[codecov-href]: https://codecov.io/gh/bokub/gradient-string
[downloads-href]: https://www.npmjs.com/package/gradient-string
[xo-href]: https://github.com/sindresorhus/xo
[awesome-href]: https://github.com/sindresorhus/awesome-nodejs
