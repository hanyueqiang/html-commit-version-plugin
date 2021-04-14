# Html git version plugin

Simple [webpack](https://webpack.js.org/) plugin that generates `VERSION` and `commitInfo` finsert index.html during build.

## Usage

Given a **webpack 4** project, install it as a local development dependency:

```bash
npm install html-git-version-plugin --save-dev
```

Then, simply configure it as a plugin in the webpack config:

```javascript
var HtmlGitVersionPlugin = require("html-git-version-plugin");

module.exports = {
  plugins: [new HtmlGitVersionPlugin()],
};
```

It outputs a `VERSION` and `commitInfo` such as:

```
v0.0.0-34-g7c16d8b
```

## Plugin API

The `VERSION`, `COMMITINFO` are also exposed through a public API.

```javascript
const webpack = require("webpack");
const GitRevisionPlugin = require("html-git-version-plugin");

module.exports = {
  plugins: [
    gitRevisionPlugin,
    new webpack.DefinePlugin({
      user: true, // latest commit author, default:true
      hash: true, // latest commit hash, default:true
      tag: true, //  latest commit tag, default:true
      remote: true, // commit remote, default:false
      gitUrl: true, // commit gitUrl, default:false
      branch: true, // build commit branch, default:false
      email: true, // commit gitUrl, default:false
    }),
  ],
};
```

## Configuration

The plugin requires no configuration by default, but it is possible to configure it to support custom commitInfo.
