const axios = require('axios')

const { apiAuth, errorMessage } = require('../utils')

async function fetchUnapprovedResources() {
  const res = await axios.get(`${process.env.API_URL}/kaynaklars`)
  return res.data.filter(e => !e.approved)
}

function parseResources(resources) {
  if (resources.length) {
    return resources.map(e => `*${e.id}:* [${e.doc_name}](${e.doc_link})`).join('\n')
  } else {
    return '*Tüm kaynaklar onaylandı.*'
  }
}

async function approveResources(ids) {
  ids.forEach(async e => {
    const jwt = await apiAuth()
    const data = {
      approved: true
    }
    await axios.put(`${process.env.API_URL}/kaynaklars/${e}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt
      }
    })
  })
}

async function kontrolCommand(ctx) {
  const args = ctx.message.text.slice(ctx.message.entities[0].length + 1)
  try {
    if (args) {
      await approveResources(args.split(' '))
      await ctx.reply('Kaynaklar başarıyla onaylandı!')
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
