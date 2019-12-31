const fs = require('fs')

const hataMesaji = fs
  .readFileSync('hataMesaji.txt')
  .toString()
  .split('\r\n')

module.exports = () => hataMesaji[Math.floor(Math.random() * hataMesaji.length)]
