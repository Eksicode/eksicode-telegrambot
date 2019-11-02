function helpCommand(ctx) {
    ctx.replyWithMarkdown(
`• **Bot Komutları**

-  \`/help\` veya \`/yardım\`: Bot komutlarını listeler.
    
-   \`/kaynak\`: Ekşicode kaynak arayüzünü açar.
    
-   \`/kanal <sorgu | tümü>\`: EksiCode kanalları arasında arama yapar. 
    
-   \`/discord\`: Discord sunucusunun linkini gönderir.

• **Kanal Bulunamadı hatası**

Siz de [bu repoyu forklayıp](https://github.com/Eksicode/eksicode-telegrambot) \`kanalBulunamadi.txt\` dosyası içerisine hata mesajı için ünlem ekleyebilirsiniz.`
    );
}

module.exports = helpCommand;
