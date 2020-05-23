const cmd = require('../commands')
const easterEggHandler = require('./easterEggHandler')

function textHandler (ctx) {
  const message = ctx.message.text
  const commands = ['!kaynak', '!grup', '!yardim', '!help', '!discord', '!duyuru', '!youtube', '!twitter', '!github', '!report']
  if (commands.includes(message.split(' ')[0])) {
    switch (message.split(' ')[0]) {
      case '!kaynak':
        new cmd.SourceBot(ctx)
        break
      case '!grup':
        new cmd.GroupBot(ctx)
        break
      case '!yardim':
        cmd.helpCommand(ctx)
        break
      case '!help':
        cmd.helpCommand(ctx)
        break
      case '!discord':
        cmd.discordCommand(ctx)
        break
      case '!duyuru':
        cmd.announcementCommand(ctx)
        break
      case '!youtube':
        cmd.youtubeCommand(ctx)
        break
      case '!twitter':
        cmd.twitterCommand(ctx)
        break
      case '!github':
        cmd.githubCommand(ctx)
        break
      case '!report':
        cmd.reportCommand(ctx)
        break
    }
  } else {
    easterEggHandler(ctx)
  }
}

module.exports = textHandler
