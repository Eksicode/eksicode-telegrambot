const axios = require('axios')
const errorMessage = require('../utilities/randomErrorMessage')

async function kanalCommand (ctx) {
  const args = ctx.state.command.args
  if (args) {
    const res = await axios.get(
      encodeURI(
        `http://api.eksicode.org/telegrams?name_contains=${
          args === 'tümü' || args === '*' ? '' : args
        }`
      )
    )
    const channels = res.data
    if (channels.length) {
      ctx.replyWithMarkdown(
        `Sonuçlar:
                \n${channels.map(e => `[${e.name}](${e.link})\n`).join('')}`
      )
    } else {
      ctx.reply(
        `${errorMessage()} Hiç sonuç bulamadık. Hatalı yazmadığınızdan emin olup tekrar deneyebilirsiniz.`, {
          reply_to_message_id: ctx.message.message_id
        }
      )
    }
  } else {
    ctx.reply('Kullanım: /kanal <sorgu|tümü>', {
      reply_to_message_id: ctx.message.message_id
    })
  }
}

module.exports = kanalCommand
