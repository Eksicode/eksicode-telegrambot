const fetch = require("node-fetch");
const replyConfig = require("./replyConfig");

async function kanalCommand(ctx, kanalBulunamadi) {
  const args = ctx.state.command.args;
  if (args) {
    const res = await fetch(
      `http://api.eksicode.org/telegrams?name_contains=${
        args == "tümü" ? "" : args
      }`
    );
    const channels = await res.json();
    if (channels.length) {
      ctx.replyWithMarkdown(
        `Sonuçlar:
                \n${channels.map(e => `[${e.name}](${e.link})\n`).join("")}`
      );
    } else {
      const rand = Math.floor(Math.random() * kanalBulunamadi.length);
      ctx.reply(
        `${kanalBulunamadi[rand]} Hiç sonuç yok. Kullanım: /kanal <sorgu|tümü>`,
        replyConfig
      );
    }
  } else {
      ctx.reply("Kullanım: /kanal <sorgu|tümü>", replyConfig);
  }
}

module.exports = kanalCommand;
