const fs = require('fs')
const axios = require('axios')

const exceptions = fs
  .readFileSync('.pinignore')
  .toString()
  .split('\r\n')

async function pinCommand (ctx) {
  const args = ctx.state.command.args
  try {
    const member = await ctx.telegram.getChatMember(
      process.env.ADMIN_CH_ID,
      ctx.from.id
    )

    if (member.status === 'administrator' || member.status === 'creator') {
      const groupsReq = await axios.get('http://api.eksicode.org/telegrams')
      const groups = groupsReq.data
      groups.map(async e => {
        if (exceptions.includes(e.channelID)) {
          console.log(`${e.name} kanalına .pinignore dosyası sebebiyle gönderilmeyecektir.`)
        } else {
          const message = await ctx.telegrams.sendMessage(e.channelID, args, {
            disable_notification: true
          })

          ctx.telegram.pinChatMessage(
            e.channelID,
            message.message_id,
            { disable_notification: true }
          )
        }
      })
    } else {
      console.log('Pin Error: Yetkisiz İşlem')
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = pinCommand
