const replyConfig = require("./replyConfig");

function helpCommand(ctx) {
    ctx.replyWithMarkdown(
        `• **Bot Komutları**

-  \`/help\` veya \`/yardım\`: Bot komutlarını listeler.
    
-   \`/kaynak <url>\`: Verilen URL kaynak veritabanına sayfa başlığı ile birlikte eklenir.
    
-   \`/kanal <sorgu>\`: EksiCode kanalları arasında arama yapar. 
    
-   \`/discord\`: Discord sunucusunun linkini gönderir.

• **Kanal Bulunamadı hatası**

Siz de [bu repoyu forklayıp](https://github.com/Eksicode/eksicode-telegrambot) \`kanalBulunamadi.txt\` dosyası içerisine hata mesajı için ünlem ekleyebilirsiniz.`,
        replyConfig(ctx.message.message_id)
    );
}

module.exports = helpCommand;
