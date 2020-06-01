const axios = require('axios')

function generateUnbanMessage (ctx, userId) {
  const unbanned = `[${userId}](tg://user?id=${userId})`
  const admin = `[${ctx.from.first_name || ctx.from.last_name || ctx.from.username}](tg://user?id=${ctx.from.id})`

  return `*${userId}* *UNBAN*  ◀️  🛬\n\n*Banı Açılan Kişi*: ${unbanned}\n*İşlemi Gerçekleştiren Admin*: ${admin}`
}

async function unbanCommand (ctx, id) {
  try {
    if (id || (ctx.message.chat.id.toString() === process.env.ADMIN_CH_ID && ctx.message.reply_to_message)) {
      const request = await axios.get(`${process.env.API_URL}/telegrams`)
      const groups = request.data

      const userId = id || ctx.message.reply_to_message.text.split(' ')[0]

      groups.map(async e => {
        await ctx.telegram.unbanChatMember(e.channelID, userId)
      })
      await ctx.telegram.sendMessage(process.env.ADMIN_CH_ID, generateUnbanMessage(ctx, userId), { parse_mode: 'Markdown' })
    } else {
      console.log('Unban Error: Yetkisiz İşlem / Hatalı Kullanım')
    }
  } catch (err) {
    console.log('Unban Error: Yetkisiz İşlem')
    console.error(err)
  }
}

module.exports = unbanCommand
