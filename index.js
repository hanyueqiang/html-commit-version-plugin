const child_process = require('child_process')
const fs = require('fs')
const { resolve } = require('path')

const pluginName = {
  name: 'html-commit-version-plugin',
}
const mapCommands = {
  commitId: "git show -s --format=%H",
  version: "git name-rev --name-only HEAD",
  commitName: "git show -s --format=%cn",
  email: "git show -s --format=%ce",
  buildDate: true,
}
class HtmlCommitVersionPlugin {
  constructor(options) {
    const defaultOptions = {
      // 是否显示commitId
      commitId: true,
      // 是否显示commit版本，如果没有打版本会显示分支名
      version: true,
      // 是否显示git提交者姓名
      commitName: true,
      // 是否显示打包时间
      buildDate: true,
      // 是否显示git提交者邮箱
      email: false,
    }
    this.options = Object.assign(defaultOptions, options)
  }
  handleDone() {
    try {
      const contentInfo = {}
      for (const command in this.options) {
        if (this.options[command] && mapCommands[command]) {
          contentInfo[command] = command === 'buildDate' ? this.getDate() : this.getCommandInfo(command)
        }
      }
      return contentInfo
    } catch (error) {
      throw error
    }
  }
  getDate() {
    const nowDate = new Date()
    const year = nowDate.getFullYear()
    const month = nowDate.getMonth() + 1
    const day = nowDate.getDate()
    const hours = nowDate.getHours()
    const minutes = nowDate.getMinutes()
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
  getCommandInfo(command) {
    return child_process.execSync(mapCommands[command]).toString().trim()
  }
  apply(compiler) {
    // webpack4.39.0+
    compiler.hooks.assetEmitted.tap(pluginName, (file, buffer) => {
      if (/index\.html?$/.test(file)) {
        const info = this.handleDone()
        let res = ''
        res =
          `<!--${JSON
            .stringify(info, null, 4)
            .replace(/^\{/, '')
            .replace(/\}$/, '')
          }-->\r\n${buffer.toString()}`
        fs.writeFileSync(resolve(compiler.outputPath, file), res)
      }
    })
  }
}
module.exports = HtmlCommitVersionPlugin
