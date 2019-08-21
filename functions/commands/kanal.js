const fetch = require("node-fetch");
const Fuse = require("fuse.js");

function kanalCommand(ctx, kanalBulunamadi) {
    const args = ctx.state.command.args;
    fetch(`http://api.eksicode.org/telegrams`)
        .then(res => res.json())
        .then(channels => {
            if (args == "tümü") {
                ctx.replyWithMarkdown(
                    `Tüm Kanallar:
                    \n${channels.map(e => `[${e.name}](${e.link})\n`).join("")}`
                );
            } else {
                const fuse = new Fuse(channels, {
                    shouldSort: true,
                    threshold: 0.3,
                    minMatchCharLength: 1,
                    keys: ["name"]
                });
                const searchResults = fuse.search(args);
                if (searchResults.length) {
                    ctx.replyWithMarkdown(
                        `Sonuçlar:
                        \n${searchResults
                            .map(e => `[${e.name}](${e.link})\n`)
                            .join("")}`
                    );
                } else {
                    const rand = Math.floor(
                        Math.random() * kanalBulunamadi.length
                    );
                    ctx.reply(
                        `${
                            kanalBulunamadi[rand]
                        } Hiç sonuç yok. Kullanım: /kanal <sorgu>`
                    );
                }
            }
        });
}

module.exports = kanalCommand;
