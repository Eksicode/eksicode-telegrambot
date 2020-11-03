const { hastebinize, errorMessage } = require('../utils')

async function hastebinizeCommand (ctx) {
  try {
    const hastebinized = await hastebinize(ctx.message.reply_to_message.text)
    return ctx.reply(hastebinized, {
      reply_to_message_id: ctx.message.message_id
    })
  } catch (err) {
    console.error(err)
    return ctx.reply(`${errorMessage()} Bir hata oluştu. Lütfen daha sonra tekrar deneyin.`)
  }
}

module.exports = hastebinizeCommand
