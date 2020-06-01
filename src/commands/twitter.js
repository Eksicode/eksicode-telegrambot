function twitterCommand (ctx) {
  ctx.reply('Twitter hesabımızı takip edin.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '👉 Twitter Hesabımız',
            url: 'https://twitter.com/Eksicode'
          }
        ]
      ]
    }
  })
}

module.exports = twitterCommand
