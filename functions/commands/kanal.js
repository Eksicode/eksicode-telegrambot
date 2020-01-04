const axios = require('axios')
const { errorMessage } = require('../utilities')

async function kanalCommand (ctx) {
  const args = ctx.state.command.args
  try {
    if (args) {
      const res = await axios.get('http://api.eksicode.org/telegrams', {
        params: {
          name_contains: args
        }
      })
      const channels = res.data
      if (channels.length) {
        ctx.replyWithMarkdown(
        `*Sonuçlar:*
                \n${channels.map(e => `- [${e.name}](${e.link})\n`).join('')}`
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
  } catch (err) {
    console.log('Kanal komutunda beklenmedik bir hata oluştu.')
    console.error(err)
  }
}

module.exports = kanalCommand
