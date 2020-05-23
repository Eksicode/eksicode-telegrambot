function youtubeCommand (ctx) {
  ctx.reply('Youtube kanalımıza abone olun.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '▶️ Youtube Kanalımız',
            url: 'https://www.youtube.com/channel/UCZ6y4r9MMv7jT79FzEn3JxA'
          }
        ]
      ]
    }
  })
}

module.exports = youtubeCommand
