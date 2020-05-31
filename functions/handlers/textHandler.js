const cmd = require('../commands')
const easterEggHandler = require('./easterEggHandler')

const commands = {
  // Maybe rename the commands to abcCommand instead of abcBot,
  // so that their names are consistent.
  '!kaynak': cmd.SourceBot,
  '!grup': cmd.GroupBot,
  '!yardim': cmd.helpCommand,
  '!help': cmd.helpCommand,
  '!discord': cmd.discordCommand,
  '!duyuru': cmd.announcementCommand,
  '!youtube': cmd.youtubeCommand,
  '!twitter': cmd.twitterCommand,
  '!github': cmd.githubCommand,
  '!report': cmd.reportCommand
} 

function textHandler (ctx) {
  const message = ctx.message.text
  const command = message.split(' ')[0] // There probably is a better way to parse the messages here.
  if (command in commands) {
    commands[command](ctx)
  } else {
    easterEggHandler(ctx)
  }
}

module.exports = textHandler
