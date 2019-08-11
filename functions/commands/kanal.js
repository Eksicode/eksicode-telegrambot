const fetch = require("node-fetch");
const Fuse = require("fuse.js");
const { parse } = require("node-html-parser");

const kanalCommand = ctx => {
    const args = ctx.state.command.args;
    ctx.getChatMember(ctx.from.id).then(res => {
        fetch(`http://api.eksicode.org/telegrams`)
            .then(res => res.json())
            .then(channels => {
                const fuse = new Fuse(channels, {
                    shouldSort: true,
                    threshold: 0.3,
                    minMatchCharLength: 1,
                    keys: ["name"]
                });
                const searchResults = fuse.search(args);
                if (searchResults.length) {
                    ctx.reply(
                        `Sonuçlar:
                        \n${searchResults
                            .map(e => `${e.name}: ${e.link}\n`)
                            .join("")}`
                    );
                } else {
                    ctx.reply("Wow! Hiç sonuç yok.");
                }
            });
    });
};

module.exports = kanalCommand;
