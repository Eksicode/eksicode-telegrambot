function jsSartMiHandler (ctx) {
  try {
    if (ctx.message.text.match(/(js [sş]art m[ıi])/gim)) {
      const randomNum = Math.floor(Math.random() * 1000)
      if (randomNum > 995) {
        ctx.reply('Değil.')
      } else {
        ctx.reply('Şart.')
      }
    }
  } catch (err) {
    console.log('unexpected error at js şart mı handler.')
  }
}

module.exports = jsSartMiHandler
