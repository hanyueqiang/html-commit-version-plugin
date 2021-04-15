# Html commit version plugin

一个简单的plugin插件，支持在打包后生成`commitI`信息和版本`Tag`，作为注释插入到`index.html`头部

简体中文 | [English](./README.md)

## 使用

在`webpack4+`项目中，作为开发依赖安装

```bash
npm install html-commit-version-plugin --save-dev
```

然后，在`webpack`配置中将其配置在`plugins`内：

```javascript
var HtmlGitVersionPlugin = require("html-commit-version-plugin");

module.exports = {
  plugins: [
    new HtmlGitVersionPlugin()
  ],
};
```

打包后输出 `VERSION` and `commitInfo` 例如:

```html
<!--
    "commitId": "1b461c43dc868511d5e19e3ea05c2f3d3ecac7fb",
    "version": "v1.0.2",
    "commitName": "Frank",
    "buildDate": "2021-4-15 10:6"
-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Management platform</title>
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <link href="/main.47b5ac25.css?1e0c7c7a42e21948252e" rel="stylesheet"></head>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript" src="/runtime.1e0c7c7a.js?1e0c7c7a42e21948252e"></script>
    <script type="text/javascript" src="/vendors~main.1e0c7c7a.js?1e0c7c7a42e21948252e"></script>
    <script type="text/javascript" src="/main.1e0c7c7a.js?1e0c7c7a42e21948252e"></script>
  </body>
</html>
```
## 配置

该插件默认情况下不需要配置，但是可以通过配置支持自定义`commitInfo`内容

## Plugin API

```javascript
const webpack = require("webpack");
const HtmlVersionPlugin = require("html-commit-version-plugin");

module.exports = {
  plugins: [
    new HtmlVersionPlugin({
      commitId: true, // 显示commitId，默认显示
      version: true, // 显示tag版本，如果没有打版本tag，则显示当前分支名，默认显示
      commitName: true, // 显示最后提交人名称，默认显示
      buildDate: true, // 显示打包时间，默认显示
      email: false, // 显示最后提交人邮箱，默认不显示
    }),
  ],
};
```