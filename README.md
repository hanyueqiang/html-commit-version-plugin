# Html commit version plugin

Simple [webpack](https://webpack.js.org/) plugin that generates `CommitInfo` and `VERSION` insert index.html during build.

English | [简体中文](./zh_CN.md)
## Usage

Given a **webpack 4** project, install it as a local development dependency:

```bash
npm install html-commit-version-plugin --save-dev
```

Then, simply configure it as a plugin in the webpack config:

```javascript
var HtmlGitVersionPlugin = require("html-commit-version-plugin");

module.exports = {
  plugins: [
    new HtmlGitVersionPlugin()
  ],
};
```

It outputs a `VERSION` and `commitInfo` such as:

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
## Configuration

The plugin requires no configuration by default, but it is possible to configure it to support custom commitInfo.

## Plugin API

The `COMMITINFO`, `VERSION` are also exposed through a public API.

```javascript
const webpack = require("webpack");
const HtmlVersionPlugin = require("html-commit-version-plugin");

module.exports = {
  plugins: [
    new HtmlVersionPlugin({
      commitId: true, // show commitId
      version: true, // show commit tag，if no tag, show branch
      commitName: true, // show commitName
      buildDate: true, // show buildDate
      email: false, // show email, default false
    }),
  ],
};
```