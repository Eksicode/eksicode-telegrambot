const fs = require('fs')

const helpText = fs.readFileSync('help.md', 'utf-8')

const helpTextAdmin = fs.readFileSync('helpAdmin.md', 'utf-8')

function helpCommand (ctx) {
  if (ctx.message.chat.id === process.env.ADMIN_CH_ID) {
    ctx.replyWithMarkdown(helpTextAdmin)
  } else {
    ctx.replyWithMarkdown(helpText)
  }
}

module.exports = helpCommand
