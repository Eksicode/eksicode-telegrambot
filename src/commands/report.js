async function reportCommand (ctx) {
  const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id)
  const out = admins.map(e => `[${e.user.username || e.user.first_name || e.user.last_name}](tg://user?id=${e.user.id})`).join(' ')
  ctx.replyWithMarkdown(out)
}

module.exports = reportCommand
