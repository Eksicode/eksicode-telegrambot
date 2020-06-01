function discordCommand (ctx) {
  ctx.reply('Discord Sunucumuza Girin.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🎙 Discord Sunucumuz',
            url: 'https://discord.gg/cZRhbuJ'
          }
        ]
      ]
    }
  })
}

module.exports = discordCommand
