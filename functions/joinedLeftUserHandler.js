function joinedLeftUserHandler (ctx) {
  ctx.deleteMessage().catch(() =>
    console.log(
      "Hata: Yetkisiz İşlem. Lütfen eksiCodeBot'a yönetici ayrıcalıkları tanıyın."
    )
  )
}

module.exports = joinedLeftUserHandler
