const path = require('path')

require('dotenv').config({
  path: path.join(__dirname, '.env')
})

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const { cmd, utils, handlers } = require('./src')

bot.command('ban', ctx => utils.forAdmins(ctx, cmd.banCommand))
bot.command('unban', ctx => utils.forAdmins(ctx, cmd.unbanCommand))
bot.command('pin', ctx => utils.forAdmins(ctx, cmd.pinCommand))
bot.command('yardim', ctx => cmd.helpCommand(ctx))
bot.command('help', ctx => cmd.helpCommand(ctx))

bot.on(['new_chat_members', 'left_chat_member'], ctx => handlers.joinedLeftUserHandler(ctx))

bot.on('text', ctx => handlers.textHandler(ctx))

bot.on('callback_query', handlers.callbackHandler)

bot.launch()
