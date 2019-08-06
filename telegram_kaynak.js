
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname,'.env')
});

const token = process.env.BOT_TOKEN;
const Telegraf = require('telegraf');
const CommandParser = require('telegraf-command-parts');
const fetch = require('node-fetch');
const { parse } = require('node-html-parser');
const bot = new Telegraf(token);

bot.use(CommandParser());

bot.command((ctx) => {
    const args = ctx.state.command.splitArgs;
    fetch(args[0])
      .then(res => res.text())
      .then(html => {
        const title = parse(html).querySelector('title').rawText;
        const requestData = {
          "doc_name": title,
          "doc_link": args[0],
          "doc_creator_tg": ctx.from.id
        }
        fetch("http://api.eksicode.org/kaynaklars", {
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": JSON.stringify(requestData)
        })
        .then(res => res.json())
        .then(() => {
          ctx.reply(`Teşekkürler ${ctx.from.first_name}! Yönetici ekibimiz en kısa zamanda inceleyip onaylayacak.`)
        })
        .catch(err => ctx.reply("Eksicode sunucularıyla bağlantı kuramıyoruz. Lütfen daha sonra deneyin."))
      })
      .catch(err => {
        if(err.name == "TypeError") {
          ctx.reply("Geçersiz kullanım. Kullanım: /kaynak <link>")
        } else if (err.name == "FetchError") {
          ctx.reply("Link geçersiz. Lütfen tekrar deneyin.")
        }
      })
});

bot.launch();