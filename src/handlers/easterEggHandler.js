const clean = (piece) => (piece
    .replace(/((^|\n)(?:[^\/\\]|\/[^*\/]|\\.)*?)\s*\/\*(?:[^*]|\*[^\/])*(\*\/|)/g, '$1')
    .replace(/((^|\n)(?:[^\/\\]|\/[^\/]|\\.)*?)\s*\/\/[^\n]*/g, '$1')
    .replace(/\n\s*/g, '')
);

const regex = ({raw}, ...interpolations) => (
    new RegExp(interpolations.reduce(
        (regex, insert, index) => (regex + insert + clean(raw[index + 1])),
        clean(raw[0])
    ), "gmi")
);

// Move above to a utils.js or something

const boomerRegex = regex`
(B|ß)
(o|о|ó|ò|ô|ȯ|ȱ|ö|ȫ|ǒ|ŏ|ō|õ|ȭ|ő|ọ|ǿ|ơ|u|ú|ù|û|ü|ǔ|ŭ|ū|ũ|ű|ů|ụ)+
(m)+
(ğ)*
(e|é|è|ė|ê|ë|ě|ĕ|ē|ẽ|e|ẹ|ı|i|í|ì|i|î|ï|ǐ|ĭ|ī|ĩ|ị)+
(r)
`

const jsSartmiRegex = regex`(js [sş]art m[ıi])`

const iHaveAQuestionRegex = regex`bi(rşey|şey| şey|r şey|şiy| şiy|şi| şi|' şey|'şey) sor(ucam|acağım|acam|cam|ucağım|abilirmiyim|abilir miyim|ammı|am mı|ayım mı|ayımmı)`


function jsSartMiHandler (ctx) {
  const jsSartMiMatch = ctx.message.text.match(jsSartmiRegex)
  const iHaveAQuestionMatch = ctx.message.text.match(iHaveAQuestionRegex)
  const boomerMatch = ctx.message.text.match(boomerRegex)
  // switch-case?
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
