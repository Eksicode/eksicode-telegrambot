const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

const token = process.env.BOT_TOKEN;
const fs = require("fs");
const Telegraf = require("telegraf");
const CommandParser = require("telegraf-command-parts");
const bot = new Telegraf(token);

const fn = require("./functions");

const errorMessage = fs
    .readFileSync("hataMesaji.txt")
    .toString()
    .split("\r\n");

bot.use(CommandParser());

bot.command("kaynak", ctx => fn.cmd.kaynakCommand(ctx, errorMessage));
bot.command("kanal", ctx => fn.cmd.kanalCommand(ctx, errorMessage));
bot.command("pin", ctx => fn.cmd.pinCommand(ctx));
bot.command("ban", ctx => fn.cmd.banCommand(ctx));
bot.command(["yardim", "help"], ctx => fn.cmd.helpCommand(ctx));
bot.command("discord", ctx => fn.cmd.discordCommand(ctx));

bot.on(["new_chat_members", "left_chat_member"], fn.joinedLeftUserHandler);

bot.launch();
