const fs = require('fs')
const configFileName = '.xt-testing.config.js'
const configFilePath = `${process.env.PWD}/${configFileName}`

module.exports = {
  useConfigFile: (run = () => {}) => {
    if (!fs.existsSync(configFilePath)) {
      console.error('请先创建配置文件')
    } else {
      const configInFile = require(configFilePath)
      run(configInFile)
    }
  }
}
