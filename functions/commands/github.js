function githubCommand (ctx) {
  ctx.reply('Github hesabımıza göz atın.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '👨‍💻 Github',
            url: 'https://github.com/Eksicode'
          }
        ]
      ]
    }
  })
}

module.exports = githubCommand
