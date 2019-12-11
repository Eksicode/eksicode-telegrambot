const fetch = require("node-fetch");
const errorMessage = require("../utilities/randomErrorMessage");

async function kanalCommand(ctx) {
  const args = ctx.state.command.args;
  if (args) {
    const res = await fetch(
      encodeURI(
        `http://api.eksicode.org/telegrams?name_contains=${
          args === "tümü" || args === "*" ? "" : args
        }`
      )
    );
    const channels = await res.json();
    if (channels.length) {
      ctx.replyWithMarkdown(
        `Sonuçlar:
                \n${channels.map(e => `[${e.name}](${e.link})\n`).join("")}`
      );
    } else {
      ctx.reply(
        `${errorMessage()} Hiç sonuç bulamadık. Hatalı yazmadığınızdan emin olup tekrar deneyebilirsiniz.`,
        {
          "reply_to_message_id": ctx.message.id
        }
      );
    }
  } else {
    ctx.reply("Kullanım: /kanal <sorgu|tümü>", replyConfig);
  }
}

module.exports = kanalCommand;
