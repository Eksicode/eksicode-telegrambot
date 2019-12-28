function jsSartMiHandler (ctx) {
  if (ctx.message.text.match(/(js [sş]art m[ıi])/gim)) {
    const randomNum = Math.floor(Math.random() * 1000)
    if (randomNum > 995) {
      ctx.reply('Değil.')
    } else {
      ctx.reply('Şart.')
    }
  }
}

module.exports = jsSartMiHandler
