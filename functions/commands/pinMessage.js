const fetch = require("node-fetch");

function pinMessage(ctx) {
    const args = ctx.state.command.args;
    ctx.telegram
        .getChatMember(process.env.ADMIN_CH_ID, ctx.from.id)
        .then(res => {
            fetch("http://api.eksicode.org/telegrams")
                .then(res => res.json())
                .then(groups => {
                    groups.map(e => {
                        ctx.telegram
                            .sendMessage(e.channelID, args)
                            .then(res => {
                                ctx.telegram.pinChatMessage(
                                    e.channelID,
                                    res.message_id
                                );
                            });
                    });
                });
        })
        .catch(err => console.log("yetkisiz işlem"));
}

module.exports = pinMessage;
