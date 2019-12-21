const axios = require('axios')

async function unbanCommand (ctx) {
  const request = await axios.get('http://api.eksicode.org/telegrams')
  const groups = request.data

  try {
    const member = await ctx.telegram.getChatMember(
      process.env.ADMIN_CH_ID,
      ctx.from.id
    )

    if ((member.status === 'administrator' || member.status === 'creator') && ctx.message.reply_to_message) {
      const userId = ctx.message.reply_to_message.text.split(' ')[0]
      groups.map(async e => {
        await ctx.telegram.unbanChatMember(e.channelID, userId)
      })
      ctx.telegram.sendMessage(process.env.ADMIN_CH_ID, `${userId} numaralı kullanıcının banı başarıyla kaldırıldı.`)
    } else {
      console.log('Unban Error: Yetkisiz İşlem / Hatalı Kullanım')
    }
  } catch (err) {
    console.log('Unban Error: Yetkisiz İşlem')
    console.error(err)
  }
}

module.exports = unbanCommand
