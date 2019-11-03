const fetch = require("node-fetch");
const { parse } = require("node-html-parser");
const apiAuth = require("../utilities/apiAuth");
const Markup = require("telegraf/markup");
const errorMessage = require("../utilities/randomErrorMessage");

const state = { user: {} };

function kaynakCommand(ctx) {
  ctx.reply(`Ekşicode kaynak arşivine hoşgeldiniz!`, {
    reply_to_message_id: ctx.message.message_id,
    reply_markup: Markup.keyboard([["🔎 Kaynak Ara", "ℹ️ Kaynak Ekle"]])
      .oneTime()
      .selective()
      .resize()
  });
}

function kaynakEkle(ctx) {
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

function kaynakAra(ctx) {
  if (!state.user[ctx.from.id]) {
    state.user[ctx.from.id] = {};
    state.user[ctx.from.id].inlineCommand = "searchResource";
  }
  ctx.reply('Sorgunuzu yazın. (iptal etmek için "iptal" yazın.)', {
    reply_to_message_id: ctx.message.message_id,
    reply_markup: Markup.forceReply().selective()
  });
}

async function kaynakEkleApi(ctx) {
  const url = ctx.message.text.startsWith("http")
    ? ctx.message.text
    : "http://" + ctx.message.text;
  if (ctx.message.text == "iptal") {
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
      const req = await fetch("http://api.eksicode.org/kaynaklars", {
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
      ctx.reply(`${errorMessage()} Bir hata oluştu. Lütfen daha sonra tekrar deneyin.`, {
        reply_to_message_id: ctx.message.message_id
      });
    }
  }
}

async function kaynakAraApi(ctx) {
  if (ctx.message.text == "iptal") {
    ctx.reply("İşleminiz iptal edildi.");
  } else {
    const resultArray = await pagination(ctx.message.text, 0);
    if (resultArray.length > 1) {
      ctx.reply(`Sayfa: 1`, {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: Markup.inlineKeyboard(resultArray)
      });
    } else {
      ctx.reply(
        `${errorMessage()} Hiç sonuç bulamadık. Hatalı yazmadığınızdan emin olup tekrar deneyebilirsiniz.`,
        { reply_to_message_id: ctx.message.message_id }
      );
    }
  }
}

async function pageSwitch(ctx) {
  const query = ctx.callbackQuery.message.reply_to_message.text;
  const pageNum = parseInt(ctx.callbackQuery.data);
  if (pageNum + 1 !== parseInt(ctx.callbackQuery.message.text.split(": ")[1])) {
    const resultArray = await pagination(query, pageNum);
    ctx.editMessageText(`Sayfa: ${pageNum + 1}`, {
      reply_to_message_id: query.message_id,
      reply_markup: Markup.inlineKeyboard(resultArray)
    });
  } else {
    ctx.answerCbQuery();
  }
}

async function pagination(query, pageNum) {
  const data = await fetchResources(query, pageNum);
  let resultArray = [];
  data.resources.map(e => {
    resultArray.push([
      {
        text: e.doc_name,
        url: e.doc_link
      }
    ]);
  });
  resultArray.push([{ text: `« 1`, callback_data: `${0}` }]);
  resultArray[resultArray.length - 1].push({
    text: `‹ ${pageNum > 0 ? pageNum : 1}`,
    callback_data: `${pageNum > 0 ? pageNum - 1 : 0}`
  });
  resultArray[resultArray.length - 1].push({
    text: `• ${pageNum + 1} •`,
    callback_data: `${pageNum}`
  });
  resultArray[resultArray.length - 1].push({
    text: `${pageNum + 2} ›`,
    callback_data: `${pageNum + 1}`
  });
  resultArray[resultArray.length - 1].push({
    text: `${data.pageCount} »`,
    callback_data: `${data.pageCount - 1}`
  });
  return resultArray;
}

async function fetchResources(query, pageNum) {
  const request = await fetch(
    encodeURI(
      `http://api.eksicode.org/kaynaklars?doc_name_contains=${query}&_start=${pageNum *
        5}&_limit=5`
    )
  );
  const resources = await request.json();
  const pageCountReq = await fetch(
    encodeURI(
      `http://api.eksicode.org/kaynaklars/count?doc_name_contains=${query}`
    )
  );
  const pageCount = await pageCountReq.text();
  return { resources, pageCount: Math.ceil(parseInt(pageCount) / 5) };
}

async function kaynakListen(ctx) {
  if (
    state.user[ctx.from.id] &&
    state.user[ctx.from.id].inlineCommand == "searchResource"
  ) {
    state.user[ctx.from.id] = null;
    await kaynakAraApi(ctx);
  } else if (
    state.user[ctx.from.id] &&
    state.user[ctx.from.id].inlineCommand == "addResource"
  ) {
    state.user[ctx.from.id] = null;
    await kaynakEkleApi(ctx);
  }
}

module.exports = {
  kaynakAra,
  kaynakCommand,
  kaynakEkle,
  kaynakListen,
  pageSwitch
};
