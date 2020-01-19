const path = require('path')

require('dotenv').config({
  path: path.join(__dirname, '.env')
})

const Telegraf = require('telegraf')
const CommandParser = require('telegraf-command-parts')
const bot = new Telegraf(process.env.BOT_TOKEN)

const { cmd, handlers } = require('./functions')

bot.use(CommandParser())

bot.command('ban', ctx => cmd.banCommand(ctx))
bot.command('unban', ctx => cmd.unbanCommand(ctx))
bot.command('pin', ctx => cmd.pinCommand(ctx))
bot.command('yardim', ctx => cmd.helpCommand(ctx))
bot.command('help', ctx => cmd.helpCommand(ctx))

bot.on(['new_chat_members', 'left_chat_member'], ctx => handlers.joinedLeftUserHandler(ctx))

bot.on('text', ctx => handlers.textHandler(ctx))

bot.launch()
