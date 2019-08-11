const fetch = require("node-fetch");
const stringSimilarity = require("string-similarity");
const { parse } = require("node-html-parser");

const kanalCommand = ctx => {
    const args = ctx.state.command.args;
    ctx.getChatMember(ctx.from.id).then(res => {
        if (res.status != "member") {
            fetch(`http://api.eksicode.org/telegrams`)
                .then(res => res.json())
                .then(channels => {
                    const searchResults = channels.filter(e => {
                        return (
                            stringSimilarity.compareTwoStrings(
                                args.toLowerCase(),
                                e.name.toLowerCase()
                            ) > 0.25
                        );
                    });
                    if (searchResults.length) {
                        ctx.reply(
                            `Sonuçlar:
                        \n${searchResults
                            .map(e => `${e.name}: ${e.link}`)
                            .join("")}`
                        );
                    } else {
                        ctx.reply("Wow! Hiç sonuç yok.");
                    }
                });
        }
    });
};

module.exports = kanalCommand;
