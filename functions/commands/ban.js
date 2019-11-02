const fetch = require("node-fetch");

async function banCommand(ctx) {
  const groups = await fetch("http://api.eksicode.org/telegrams").json();

  try {
    const member = await ctx.telegram.getChatMember(
      process.env.ADMIN_CH_ID,
      ctx.from.id
    );

    if (member.status == "administrator" || member.status == "creator") {
      groups.map(e => {
        ctx.telegram.kickChatMember(
          (chatId = e.channelID),
          (userId = ctx.message.reply_to_message.forward_from.id)
        );
      });
    } else {
      console.log("yetkisiz işlem");
    }
  } catch (err) {
    console.log("yetkisiz işlem");
  }
}

module.exports = banCommand;
