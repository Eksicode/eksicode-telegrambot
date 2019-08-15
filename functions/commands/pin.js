const fs = require("fs");
const fetch = require("node-fetch");

const exceptions = fs
    .readFileSync(".pinignore")
    .toString()
    .split("\r\n");

function pinCommand(ctx) {
    const args = ctx.state.command.args;
    ctx.telegram
        .getChatMember(process.env.ADMIN_CH_ID, ctx.from.id)
        .then(res => {
            if (res.status == "administrator" || res.status == "creator") {
                fetch("http://api.eksicode.org/telegrams")
                    .then(res => res.json())
                    .then(groups => {
                        groups.map(e => {
                            if (exceptions.includes(e.channelID)) {
                                console.log(
                                    `${
                                        e.name
                                    } kanalına .pinignore dosyası sebebiyle gönderilmeyecektir.`
                                );
                            } else {
                                ctx.telegram
                                    .sendMessage(e.channelID, args, {
                                        disable_notification: true
                                    })
                                    .then(res => {
                                        ctx.telegram.pinChatMessage(
                                            e.channelID,
                                            res.message_id,
                                            { disable_notification: true }
                                        );
                                    });
                            }
                        });
                    });
            } else {
                console.log("yetkisiz işlem");
            }
        })
        .catch(err => console.log("yetkisiz işlem"));
}

module.exports = pinCommand;
