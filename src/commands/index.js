const SourceBot = require('./kaynak')
const GroupBot = require('./group')
const banCommand = require('./ban')
const unbanCommand = require('./unban')
const helpCommand = require('./help')
const discordCommand = require('./discord')
const youtubeCommand = require('./youtube')
const githubCommand = require('./github')
const twitterCommand = require('./twitter')
const announcementCommand = require('./announcement')
const pinCommand = require('./pin')
const reportCommand = require('./report')
const kontrolCommand = require('./kontrol')
const hastebinizeCommand = require('./hastebinize')

module.exports = {
  SourceBot,
  GroupBot,
  banCommand,
  helpCommand,
  discordCommand,
  unbanCommand,
  announcementCommand,
  pinCommand,
  youtubeCommand,
  githubCommand,
  twitterCommand,
  reportCommand,
  kontrolCommand,
  hastebinizeCommand
}
