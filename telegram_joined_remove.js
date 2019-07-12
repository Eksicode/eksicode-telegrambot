
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname,'.env')
});

const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const removeJoinedHandler = async (ctx) => {
    if (ctx.updateSubTypes.includes("left_chat_member") || ctx.updateSubTypes.includes("new_chat_members")) {
      await ctx.deleteMessage()
    }
}

bot.use(removeJoinedHandler)
bot.launch()