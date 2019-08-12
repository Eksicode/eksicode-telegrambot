const fetch = require("node-fetch");

function banCommand(ctx) {
    const args = ctx.state.command.args;
    ctx.telegram
        .getChatMember(process.env.ADMIN_CH_ID, ctx.from.id)
        .then(res => {
            fetch("http://api.eksicode.org/telegrams")
                .then(res => res.json())
                .then(groups => {
                    groups.map(e => {
                        ctx.kickChatMember(
                            e.channelID,
                            ctx.message.reply_to_message.forward_from.id
                        );
                    });
                });
        });
}

module.exports = banCommand;
