const cmd = require('../commands')
const { forAdmins } = require('../utils')
const easterEggHandler = require('./easterEggHandler')

const commands = {
  '!kaynak': cmd.SourceBot,
  '!grup': cmd.GroupBot,
  '!yardim': cmd.helpCommand,
  '!help': cmd.helpCommand,
  '!discord': cmd.discordCommand,
  '!duyuru': cmd.announcementCommand,
  '!youtube': cmd.youtubeCommand,
  '!twitter': cmd.twitterCommand,
  '!github': cmd.githubCommand,
  '!report': cmd.reportCommand,
  '!hastebinize': cmd.hastebinizeCommand
}

const adminOnly = [
  '!hastebinize'
]

function textHandler (ctx) {
  const message = ctx.message.text
  const command = message.split(' ')[0]
  if (command in commands) {
    if (adminOnly.includes(command)) {
      return forAdmins(ctx, commands[command])
    } else {
      try {
        return new commands[command](ctx)
      } catch (e) {
        return commands[command](ctx)
      }
    }
  } else {
    return easterEggHandler(ctx)
  }
}

module.exports = textHandler
