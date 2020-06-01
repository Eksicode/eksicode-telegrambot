async function forAdmins (ctx, cb) {
  try {
    const check = await ctx.telegram.getChatMember(
      process.env.ADMIN_CH_ID,
      ctx.from.id
    )
    if (check && check.status !== 'kicked' && check.status !== 'left') {
      return cb(ctx)
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = forAdmins
