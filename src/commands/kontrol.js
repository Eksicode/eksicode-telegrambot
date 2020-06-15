const axios = require('axios')

const { apiAuth, errorMessage } = require('../utils')

async function fetchUnapprovedResources () {
  const res = await axios.get(`${process.env.API_URL}/kaynaklars`)
  return res.data.filter(e => !e.approved)
}

function parseResources (resources) {
  if (resources.length) {
    return resources.map(e => `*${e.id}:* [${e.doc_name}](${e.doc_link})`).join('\n')
  } else {
    return '*Tüm kaynaklar onaylandı.*'
  }
}

async function approveResources (ids) {
  ids.forEach(async e => {
    const jwt = await apiAuth()
    console.log(e[0] === '!')
    const config = {
      url: `${process.env.API_URL}/kaynaklars/${e[0] === '!' ? e.slice(1) : e}`,
      method: e[0] === '!' ? 'delete' : 'put',
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      data: {
        approved: e[0] !== '!'
      }
    }
    axios(config)
  })
}

async function kontrolCommand (ctx) {
  const args = ctx.message.text.slice(ctx.message.entities[0].length + 1)
  try {
    if (args) {
      await approveResources(args.split(' '))
      await ctx.reply('İşlem başarılı!')
    } else {
      const resources = await fetchUnapprovedResources()
      const parsed = parseResources(resources)
      ctx.replyWithMarkdown(`*Onaylanmamış Kaynaklar:*\n\n${parsed}\n\n*Kaynakları onaylamak için:* /kontrol <kaynak-numaralarını-boşlukla-ayır>`)
    }
  } catch (err) {
    console.error(err)
    ctx.reply(errorMessage() + ' Bir hata oluştu. Lütfen tekrar deneyiniz.')
  }
}

module.exports = kontrolCommand
