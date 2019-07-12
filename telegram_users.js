
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname,'.env')
});

const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const newChatMemberHandler = async (ctx) => {

    const names = ctx.message.new_chat_members.filter(({ is_bot }) => !is_bot).map(({ first_name, last_name }) => `${first_name} ${last_name}`)

    await ctx.deleteMessage()
}

const removeJoinedHandler = async (ctx) => {
  if (ctx.updateSubTypes.includes("left_chat_member") || ctx.updateSubTypes.includes("new_chat_members")) {
    await ctx.deleteMessage()
  }
}

bot.use(removeJoinedHandler)
bot.on('new_chat_members', newChatMemberHandler)
bot.launch()