function helpCommand (ctx) {
  ctx.replyWithMarkdown(
`• **Bot Komutları**

-  \`/help\` veya \`/yardım\`: Bot komutlarını listeler.
    
-   \`/kaynak <URL>\`: Kaynak URL'sini Ekşicode veritabanına ekler.
    
-   \`/kanal <sorgu | * | tümü>\`: EksiCode kanalları arasında arama yapar. 
    
-   \`/discord\`: Discord sunucusunun linkini gönderir.

• **Hata mesajı**

Siz de [bu repoyu forklayıp](https://github.com/Eksicode/eksicode-telegrambot) \`HataMesaji.txt\` dosyası içerisine hata mesajı için ünlem ekleyebilirsiniz.`
  )
}

module.exports = helpCommand
