const fs = require('fs')
const axios = require('axios')

const exceptions = fs
  .readFileSync('.pinignore')
  .toString()
  .split('\r\n')

async function pinCommand (ctx) {
  const args = ctx.message.text.slice(ctx.message.text.split(' ')[0].length)
  try {
    const groupsReq = await axios.get('http://api.eksicode.org/telegrams')
    const groups = groupsReq.data
    groups.map(async e => {
      if (exceptions.includes(e.channelID)) {
        console.log(`${e.name} kanalına .pinignore dosyası sebebiyle gönderilmeyecektir.`)
      } else {
        const message = await ctx.telegram.sendMessage(e.channelID, args, {
          disable_notification: true
        })

        ctx.telegram.pinChatMessage(
          e.channelID,
          message.message_id,
          { disable_notification: true }
        )
      }
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = pinCommand
