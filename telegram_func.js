const path = require('path')

require('dotenv').config({
  path: path.join(__dirname, '.env')
})

const Telegraf = require('telegraf')
const CommandParser = require('telegraf-command-parts')
const bot = new Telegraf(process.env.BOT_TOKEN)

const fn = require('./functions')

bot.use(CommandParser())

bot.command('kaynak', ctx => fn.cmd.kaynak.kaynakCommand(ctx))
bot.command('kanal', ctx => fn.cmd.kanalCommand(ctx))
bot.command('pin', ctx => fn.cmd.pinCommand(ctx))
bot.command('ban', ctx => fn.cmd.banCommand(ctx))
bot.command('yardim', ctx => fn.cmd.helpCommand(ctx))
bot.command('help', ctx => fn.cmd.helpCommand(ctx))
bot.command('discord', ctx => fn.cmd.discordCommand(ctx))
bot.command('jssartmi', ctx => fn.cmd.jssartmiCommand(ctx))

bot.on(['new_chat_members', 'left_chat_member'], fn.joinedLeftUserHandler)

bot.launch()
