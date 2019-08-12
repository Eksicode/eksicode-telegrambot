const fetch = require("node-fetch");

function banCommand(ctx) {
    const args = ctx.state.command.args;
    ctx.telegram
        .getChatMember(process.env.ADMIN_CH_ID, ctx.from.id)
        .then(res => {
            if (res.status == "administrator" || res.status == "creator") {
                fetch("http://api.eksicode.org/telegrams")
                    .then(res => res.json())
                    .then(groups => {
                        groups.map(e => {
                            ctx.telegram.kickChatMember(
                                chatId = e.channelID,
                                userId = ctx.message.reply_to_message.forward_from.id
                            );
                        });
                    });
            } else {
                console.log("yetkisiz işlem");
            }
        })
        .catch(err => console.log("yetkisiz işlem"));
}

module.exports = banCommand;
