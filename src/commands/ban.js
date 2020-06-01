const axios = require('axios')

function generateBanMessage (ctx, args) {
  const userName = ctx.message.reply_to_message.from.username
  const firstName = ctx.message.reply_to_message.from.first_name
  const lastName = ctx.message.reply_to_message.from.last_name
  const userId = ctx.message.reply_to_message.from.id

  const banned = `[${firstName || lastName || userName}](tg://user?id=${userId})`
  const admin = `[${ctx.from.first_name || ctx.from.last_name || ctx.from.username}](tg://user?id=${ctx.from.id})`

  return `*${userId}* *BAN*  🔨  🛫 \n\n*Banlanan Kişi*: ${banned}\n*Banlayan Admin*: ${admin}\n*Sebep*: ${args || 'Belirtilmemiş'}`
}

async function banCommand (ctx) {
  try {
    await ctx.deleteMessage()

    const args = ctx.message.text.slice(ctx.message.entities[0].length)

    const toBeBanned = await ctx.telegram.getChatMember(
      process.env.ADMIN_CH_ID,
      ctx.message.reply_to_message.from.id
    )

    const isToBeBannedNotAdmin = !toBeBanned || (toBeBanned.status === 'kicked' || toBeBanned.status === 'left')

    if (isToBeBannedNotAdmin && ctx.message.reply_to_message) {
      const userId = ctx.message.reply_to_message.from.id

      const request = await axios.get(`${process.env.API_URL}/telegrams`)
      const groups = request.data

      groups.map(async e => {
        await ctx.telegram.kickChatMember(e.channelID, userId)
      })

      await ctx.telegram.sendMessage(process.env.ADMIN_CH_ID,
        generateBanMessage(ctx, args),
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Geri Al',
                  callback_data: `unban: ${userId}`
                }
              ]
            ]
          }
        })
    } else {
      console.log('Ban Error: Yetkisiz İşlem / Hatalı Kullanım')
    }
  } catch (err) {
    console.log('Ban Error: Hata aşağıdadır.')
    console.error(err)
  }
}

module.exports = banCommand
