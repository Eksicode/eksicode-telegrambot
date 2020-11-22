const axios = require('axios')
const { errorMessage } = require('../utils')

class GroupBot {
  constructor (ctx) {
    this.args = ctx.message.text.slice(ctx.message.text.split(' ')[0].length + 1)
    this.query = ['tümü', '*'].includes(this.args) ? '' : this.args
    this.groups = []
    this.answer = ''

    this.executeCommand(ctx)
  }

  async executeCommand (ctx) {
    try {
      if (!this.args) {
        ctx.reply('Kullanım: !grup <sorgu|tümü|*>')
        return 1
      }
      await this.fetchGroups()
      this.formatAnswer()
      this.send(ctx)
    } catch (err) {
      console.error(err)
      ctx.reply(`${errorMessage()} Bir hata oluştu. Lütfen daha sonra tekrar deneyin.`)
    }
  }

  async fetchGroups () {
    const groupsRequest = await axios.get(`${process.env.API_URL}/telegrams`, {
      params: {
        _sort: 'name:ASC',
        name_contains: this.query,
      }
    })
    this.groups = await groupsRequest.data
  }

  formatAnswer () {
    if (this.groups.length) {
      this.answer = `*Sonuçlar:*\n\n ${this.groups.map(e => `- [${e.name}](${e.link})`).join('\n')}`
    } else {
      this.answer = `${errorMessage()} Sonuç bulunamadı. 😕`
    }
  }

  send (ctx) {
    ctx.replyWithMarkdown(this.answer)
  }
}

module.exports = GroupBot
