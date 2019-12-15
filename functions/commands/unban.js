const axios = require('axios')

async function unbanCommand (ctx) {
  const request = await axios.get('http://api.eksicode.org/telegrams')
  const groups = request.data

  console.log(groups)

  try {
    const member = await ctx.telegram.getChatMember(
      process.env.ADMIN_CH_ID,
      ctx.from.id
    )

    if ((member.status === 'administrator' || member.status === 'creator') && ctx.message.reply_to_message.forward_from) {
      console.log('begin command')
      groups.map(async e => {
        await ctx.telegram.unbanChatMember(e.channelID, ctx.message.reply_to_message.forward_from.id)
        console.log('unbanned')
      })
    } else {
      console.log('Unban Error: Yetkisiz İşlem / Hatalı Kullanım')
    }
  } catch (err) {
    console.log('Unban Error: Yetkisiz İşlem')
    console.error(err)
  }
}

module.exports = unbanCommand
