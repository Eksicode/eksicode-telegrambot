
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

const newChatMemberHandler = async (ctx) => {

    const names = ctx.message.new_chat_members.filter(({ is_bot }) => !is_bot).map(({ first_name, last_name }) => `${first_name} ${last_name}`)

    await ctx.deleteMessage()
}

const removeJoinedHandler = async (ctx) => {
  await ctx.deleteMessage().catch(() => console.log("Hata: Yetkisiz İşlem. Lütfen eksiCodeBot'a yönetici ayrıcalıkları tanıyın."))
}

bot.command('kaynak', (ctx) => {
    fetch("http://api.eksicode.org/auth/local", {
      'method': 'POST',
      'body': JSON.stringify({
        'identifier': process.env.API_USER,
        'password': process.env.API_PASS
      })
    })
    .then(res => res.json())
    .then(info => {
      const args = ctx.state.command.splitArgs;
      const url = args[0].startsWith("http") ? args[0] : "http://" + args[0]
      fetch(url)
        .then(res => res.text())
        .then(html => {
          const title = parse(html).querySelector('title').rawText;
          const requestData = {
            "doc_name": title,
            "doc_link": url,
            "doc_creator_tg": ctx.from.id
          }
          fetch("http://api.eksicode.org/kaynaklars", {
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + info.jwt
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
    })
});

bot.on(["new_chat_members", "left_chat_member"], removeJoinedHandler)

bot.on('new_chat_members', newChatMemberHandler)

bot.launch()