const axios = require('axios')
const { parse } = require('node-html-parser')
const { apiAuth, errorMessage } = require('../utilities')

class Source {
  constructor (url, tgChannel, tgUser, title, headers) {
    this.url = url
    this.title = title
    this.headers = headers
    this.tgChannel = tgChannel
    this.tgChannel = tgUser
  }
}

class SourceBot {
  constructor (ctx) {
    this.tgChannel = ctx.message.chat.id
    this.tgUser = ctx.message.from.id
    this.messageId = ctx.message.message_id
    this.entities = ctx.message.entities
    this.text = ctx.message.text
    this.sources = []

    this.executeCommand(ctx)
  }

  async executeCommand (ctx) {
    let message
    try {
      this.createSourcesFromLinks()

      if (!this.sources.length) {
        ctx.reply('Kullanım: !kaynak <link(ler) içeren mesaj>')
        return 1
      }

      message = await ctx.reply('Kaynak ekleniyor...', { reply_to_message_id: this.messageId })

      await this.addHeadersToSources()
      await this.addTitlesToSources()
      await this.postToAPI()

      ctx.telegram.editMessageText(message.chat.id, message.message_id, undefined, 'Teşekkürler! Kaynaklar başarıyla eklendi.')
    } catch (err) {
      console.error(err)
      ctx.telegram.editMessageText(message.chat.id, message.message_id, undefined, `${errorMessage()} Bir hata oluştu. Lütfen daha sonra tekrar deneyin.`)
    }
  }

  createSourcesFromLinks () {
    try {
      this.entities.map(e => {
        if (e.type === 'url') {
          const link = this.text.slice(e.offset, e.offset + e.length)
          const linkHttpAdded = link.startsWith('http://') || link.startsWith('https://') ? link : 'http://' + link
          this.sources.push(new Source(linkHttpAdded, this.tgChannel, this.tgUser))
        }
      })
    } catch (err) {
      this.sources = []
    }
  }

  async addHeadersToSources () {
    await Promise.all(this.sources.map(async e => {
      const headRequest = await axios.head(e.url)
      e.headers = headRequest.headers
    }))
  }

  async addTitlesToSources () {
    await Promise.all(this.sources.map(async e => {
      if (e.headers['content-type'].match('text/html')) {
        const getRequest = await axios.get(e.url)
        const html = getRequest.data
        e.title = parse(html).querySelector('title').text || e.url
      } else {
        const fileName = e.headers['content-disposition'].match(/(filename=)(")(?<fileName>.*?)(")/).groups.fileName
        e.title = fileName || e.url
      }
    }))
  }

  async postToAPI () {
    const jwt = await apiAuth()
    await Promise.all(this.sources.map(async e => {
      await axios.post('https://api.eksicode.org/kaynaklars', {
        doc_name: e.title,
        doc_link: e.url,
        doc_creator_tg: e.tgUser,
        doc_tg_ch: e.tgChannel
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt
        }
      })
    }))
  }
}

module.exports = SourceBot
