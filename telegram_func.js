const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

const token = process.env.BOT_TOKEN;
const Telegraf = require("telegraf");
const CommandParser = require("telegraf-command-parts");
const bot = new Telegraf(token);

const fn = require("./functions");

bot.use(CommandParser());

bot.command("kaynak", ctx => fn.cmd.kaynakCommand(ctx));
bot.command("kanal", ctx => fn.cmd.kanalCommand(ctx));
bot.command("pin", ctx => fn.cmd.pinCommand(ctx));
bot.command("ban", ctx => fn.cmd.banCommand(ctx));

bot.on(["new_chat_members", "left_chat_member"], fn.joinedLeftUserHandler);

bot.launch();