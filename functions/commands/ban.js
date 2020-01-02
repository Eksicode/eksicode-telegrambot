const axios = require('axios')

async function banCommand (ctx) {
  await ctx.deleteMessage()

  const args = ctx.state.command.args

  try {
    const member = await ctx.telegram.getChatMember(
      process.env.ADMIN_CH_ID,
      ctx.from.id
    )

    if (member && ctx.message.reply_to_message) {
      const userName = ctx.message.reply_to_message.from.username
      const firstName = ctx.message.reply_to_message.from.first_name
      const lastName = ctx.message.reply_to_message.from.last_name
      const userId = ctx.message.reply_to_message.from.id

      const request = await axios.get('http://api.eksicode.org/telegrams')
      const groups = request.data

      groups.map(async e => {
        await ctx.telegram.kickChatMember(e.channelID, userId)
      })

      ctx.telegram.sendMessage(process.env.ADMIN_CH_ID,
        `${userId} numaralı kullanıcı (${userName || (firstName + '' + lastName ? lastName : '')}) başarıyla tüm gruplardan uçuruldu. ${args ? `Sebep: ${args}` : ''}`)
    } else {
      console.log('Ban Error: Yetkisiz İşlem / Hatalı Kullanım')
    }
  } catch (err) {
    console.log('Ban Error: Yetkisiz İşlem')
    console.error(err)
  }
}

module.exports = banCommand
