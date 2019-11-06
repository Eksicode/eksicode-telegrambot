const fetch = require("node-fetch");
const { parse } = require("node-html-parser");
const apiAuth = require("../utilities/apiAuth");
const Markup = require("telegraf/markup");
const errorMessage = require("../utilities/randomErrorMessage");

const state = { user: {} };

async function kaynakCommand(ctx) {
  const args = ctx.state.command.args;
  if (args.length) {
    await kaynakEkle(ctx, args);
  } else {
    if (!state.user[ctx.from.id]) {
      state.user[ctx.from.id] = {};
      state.user[ctx.from.id].inlineCommand = "addResource";
    }
    ctx.reply(
      'Eklemek istediğiniz kaynağın bağlantısını yapıştırın. (iptal etmek için "iptal" yazın.)',
      {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: Markup.forceReply().selective()
      }
    );
  }
}

async function kaynakEkle(ctx, link) {
  const url = link.startsWith("http")
    ? link
    : "http://" + link;
  if (link == "iptal") {
    ctx.reply("İşleminiz iptal edildi.");
  } else {
    const loadingMessage = await ctx.reply("Kaynak ekleniyor...", {
      reply_to_message_id: ctx.message.message_id
    });
    let title = "";
    try {
      const titleFetch = await fetch(url);
      const html = await titleFetch.text();
      title = parse(html).querySelector("title").rawText;
    } catch {
      ctx.telegram.deleteMessage(
        loadingMessage.chat.id,
        loadingMessage.message_id
      );
      return ctx.reply(
        `${errorMessage()} Bir hata oluştu. Lütfen geçerli bir bağlantı gönderdiğinizden emin olun.`,
        { reply_to_message_id: ctx.message.message_id }
      );
    }
    const jwt = await apiAuth();
    const requestData = {
      doc_name: title,
      doc_creator_tg: ctx.from.id,
      doc_tg_ch: ctx.message.chat.id,
      doc_link: url
    };
    try {
      const req = await fetch("https://api.eksicode.org/kaynaklars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt
        },
        body: JSON.stringify(requestData)
      });
      if (req.status == 200) {
        ctx.telegram.deleteMessage(
          loadingMessage.chat.id,
          loadingMessage.message_id
        );
        ctx.reply(
          "Kaynak başarıyla eklendi! Yönetici ekibimiz inceleyip onaylayacak.",
          { reply_to_message_id: ctx.message.message_id }
        );
      }
    } catch {
      ctx.telegram.deleteMessage(
        loadingMessage.chat.id,
        loadingMessage.message_id
      );
      ctx.reply(
        `${errorMessage()} Bir hata oluştu. Lütfen daha sonra tekrar deneyin.`,
        {
          reply_to_message_id: ctx.message.message_id
        }
      );
    }
  }
}

async function kaynakListen(ctx) {
  if (
    state.user[ctx.from.id] &&
    state.user[ctx.from.id].inlineCommand == "addResource"
  ) {
    state.user[ctx.from.id] = null;
    await kaynakEkle(ctx, ctx.message.text);
  }
}

module.exports = {
  kaynakCommand,
  kaynakListen
};
