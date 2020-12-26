function jsSartMiHandler (ctx) {
  // maybe compile the regex before hand, not like we have a performance problem now but...
  const jsSartMiMatch = ctx.message.text.match(/(js [sş]art m[ıi])/gim)
  const iHaveAQuestionMatch = ctx.message.text.match(/bi(rşey|şey| şey|r şey|şiy| şiy|şi| şi|' şey|'şey) sor(ucam|acağım|acam|cam|ucağım|abilirmiyim|abilir miyim|ammı|am mı|ayım mı|ayımmı)/gmi)
  const boomerMatch = ctx.message.text.match(/(b(o+|0+|ó+|@+|u+)m(e+|ı+|i+)r)/gim)
  try {
    if (jsSartMiMatch) {
      const randomNum = Math.floor(Math.random() * 1000)
      if (randomNum > 995) {
        ctx.reply('Değil.')
      } else {
        ctx.reply('Şart.')
      }
    } else if (iHaveAQuestionMatch) {
      ctx.reply('Haydi, sor sor!')
    } else if (boomerMatch) {
      ctx.reply('Boomer babandır...')
    }
  } catch (err) {
    console.log('unexpected error at easter egg handler.')
  }}

module.exports = jsSartMiHandler
