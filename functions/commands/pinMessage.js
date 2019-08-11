const fetch = require("node-fetch");

function pinMessage(ctx) {
    const args = ctx.state.command.args;
    ctx.getChatMember(ctx.from.id).then(res => {
        if (res.status != "member") {
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
        }
    });
}

module.exports = pinMessage;
