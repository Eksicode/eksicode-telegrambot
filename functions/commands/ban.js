const axios = require('axios')

async function banCommand (ctx) {
  await ctx.deleteMessage()
  const request = await axios.get('http://api.eksicode.org/telegrams')
  const groups = request.data

  try {
    const member = await ctx.telegram.getChatMember(
      ctx.chat.id,
      ctx.from.id
    )

    if ((member.status === 'administrator' || member.status === 'creator') && ctx.message.reply_to_message) {
      groups.map(async e => {
        await ctx.telegram.kickChatMember(e.channelID, ctx.message.reply_to_message.from.id)
      })
      ctx.telegram.sendMessage(process.env.ADMIN_CH_ID,
        `${ctx.message.reply_to_message.from.id} numaralı kullanıcı (${ctx.message.reply_to_message.from.username} ${ctx.message.reply_to_message.from.first_name} ${ctx.message.reply_to_message.from.last_name}) başarıyla tüm gruplardan uçuruldu.`)
    } else {
      console.log('Ban Error: Yetkisiz İşlem / Hatalı Kullanım')
    }
  } catch (err) {
    console.log('Ban Error: Yetkisiz İşlem')
    console.error(err)
  }
}

module.exports = banCommand
