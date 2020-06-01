async function announcementCommand (ctx) {
  ctx.reply('Duyuru Kanalımıza Girin.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '📣 Duyuru Kanalı',
            url: 'https://t.me/joinchat/AAAAAE9tV17jUdYexFPQXg'
          }
        ]
      ]
    }
  })
}

module.exports = announcementCommand
