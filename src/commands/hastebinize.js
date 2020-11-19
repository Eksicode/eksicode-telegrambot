const { hastebinize, errorMessage } = require('../utils')

async function hastebinizeCommand (ctx) {
  try {
    const replyToMessage = ctx.message.reply_to_message // Message Context to be hastebinized.

    const userName = replyToMessage.from.username ||    // Username (first name or last name if username is not available)
                    replyToMessage.from.first_name ||   // of the sender of the message to be hastebinized.
                    replyToMessage.from.last_name

    const hastebinized = await hastebinize(replyToMessage.text)

    await ctx.replyWithMarkdown(`[${userName}](tg://user?id=${replyToMessage.from.id}): ` + hastebinized, { // sends hastebinized message to chat.
      reply_to_message_id: ctx.message.message_id
    })

    await ctx.telegram.deleteMessage(ctx.message.chat.id, replyToMessage.message_id) // Removes hastebinized message
    await ctx.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id) // Removes command message
  } catch (err) {
    console.error(err)
    return ctx.reply(`${errorMessage()} Bir hata oluştu. Lütfen daha sonra tekrar deneyin.`)
  }
}

module.exports = hastebinizeCommand
