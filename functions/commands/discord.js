const fetch = require("node-fetch");
const replyConfig = require("./replyConfig");

function discordCommand(ctx) {
    ctx.replyWithMarkdown("[Discord kanalımız için tıklayın.](https://discord.gg/cZRhbuJ)", replyConfig(ctx.message.message_id))
}

module.exports = discordCommand;
