const axios = require('axios')

async function announcementCommand (ctx) {
  try {
    const args = ctx.state.command.args

    const channelsReq = await axios.get(
      'https://api.eksicode.org/telegrams'
    )
    const channels = channelsReq.data

    if ((ctx.message.chat.id.toString() === process.env.ADMIN_CH_ID) && args) {
      console.log('admin')
      channels.map(async e => {
        await ctx.telegram.sendMessage(e.channelID, args)
      })
    } else {
      console.log('Duyuru komutunda yetkisiz işlem.')
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = announcementCommand
