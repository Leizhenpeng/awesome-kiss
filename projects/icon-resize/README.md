# 图标可大可小（icon-resize）
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
- [![Figma Badge][figma-badge]][figma-plugin] 
- [![masterGo Badge][mg-badge]][mg-plugin]
- [![jsDesign Badge][jsDesign-badge]][jsdesign-plugin]


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

##
[figma-badge]:https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=flat-square
[mg-badge]:https://img.shields.io/badge/-masterGo-%20?style=flat-square&color=5279ef&logo=data:image/png;base64,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
[jsDesign-badge]:https://img.shields.io/badge/-jsDesign-%20?style=flat-square&color=273347&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA/CAYAAAC1gwumAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAU0SURBVGiBxZqxa1xHEMbnHVe4UHGFCxUuVCiggAoZHHBhiAqDXbjQHxCwChcqXKgQxIXAZwjEhhQ2SZHCIIFi1ArSBGwQxgEFZLAgBgVkcCABuwjIYMMFZPileO+c0+ntN/v2vTt9leD2m515O9qd+XbNGgIwAWwCPWAfuFyBe7ng9IANYKIpvxoD8JDjeA9MRvAmi7GDeDgOn6MBzAJHnMT9CO79Et4RMDsO36MAbJU42Xd0WvCmAx8GYGucMQQBXAg42Mea4K453AvjjCXk5LbjZGm6AXNi9frYPo2YBp2cdxzs40S6EU7rYcyfQmifnNyNdBIG0g24VIG3e1rBLVRwEgbSDT+th7Ew7uDawIuKTkKe0lcTeL8D7XEGuJjgJMAOaR8GYDHF1ywhuLaZ7ZtZ8HwbEV6Z2edZln2sQmolTLRk4eA+mNldM/stwe7zgvsh8Pu0md1MsBsP4AzwRqTRUjGu44wbxhuKAhu46Yw7M8oAb4nJXzGwEQDLFQJcHuC1C1sh3BpVcB3gUEy8ODTeW+0+TqwKehM7BDqjCLArJt0LcG5EBLhYwmsDe4LTbTq4SfJmNITSg7hw9LXgHUvrIa4qJHpE9JpVAizr2fp4JniV0rqEvyO4bq8ZG9w0evXmBfdbwStN6yG+KuZ7iF6zSoBrYpIngpeU1iV2toWNYK8ZG9wMumebE9wfBC+Y1iV25oSdI2CmToCqZwtKCmgpAir2eKl+eEa9L6e0ljXB/SXBl+RMUkYfC4PrgudJESqtg2UYsC5sVpM28HevKcFV6fST4E0Cm+L35N28zNgzYSh4/gAXBc9L675wrFY46TweNqIqCKlWo7f0oFrN8U0pmG40cfSgO+6u4HlprT7M5tD4eTFW1cQvvOCSq3jnw6i0Ltutg0oaqeUfeWF8IIgrYlKV1t6H+TnAC6YbsCLmO6CsgAeWBEl20uRXXyF0BU9tSsF0I1JZSCcc514TvE9SRIDrpZtaxfgFQS95sGcruOrcWw7xIudW5aAnbazEfsWvHAeHLy/7iBKI0Nnz3uH6myKwKgbJno384jOEVS+4ATt3hR15EYqWNlZbZnZd8LuOb2fFb1W00V8T5zDTPl5vmdmUGOB13UrdeudwB/G3+M17kKB8nGo5A646xlUQVUQhNTakdPehyrO9lpk9EgNuozeKt+K36Gckpj9kcHUL374W3Efx2214ktAO3APOOYEZcE7YOHS4cccb9WrQDcHdQR/0E+jWbENw42tS8lV8KQZ3xUTedfQBcKWEdwVd4gFcEvOqruIPhosTRtcH9vFXMW67+NuD1xeGCgwIlXjoRwWq5ZlBN6JV0UMc8OjOPnwqUE+LSb3WLsMNMU89bYYaSjLV7gRDkAU6WpL01TVqCEcFfwG9u4VwiKOp4OujF90AC0O1lGTgLPn/Scz/Za8Y69WcSX6VvrIgl+52zSzUB57PsizmdqhjeSn1pZnN2v+F8z9m9tLMnprZVpZlbt1a+BTq8j+a2RcxPg0aVEry42hDDQG9N6ynGGz0AqUO0Lu7uy8ow41cgdUF+qb3xzqGG7nErANGfVePlhO0klwT+I/+vmtiEq9qD0qKDcytpMGo9zLuE8Usy94BD8zsdmDI9+TdQhWJIgYdM7smfn8Qc7xEvTYk7+kOrJoMMUq8NbPPsizz5Iy414aFoXt1vWoQ92KCM6vwXpRc/9g3rcKNA39a/m7035jB0e9FC4N3Ep1qEndig0sC8ETsbKNG8OFRkwG2gW/Qj+yaxutizsoP0/8DWwIyu7NF4p8AAAAASUVORK5CYII=

[mg-plugin]:https://mastergo.com/community/plugin/77836422690335
[figma-plugin]:https://www.figma.com/community/plugin/1184814057510773140
[jsdesign-plugin]:https://js.design/pluginDetail?id=639c49b2c4c76a25a8a4279a
