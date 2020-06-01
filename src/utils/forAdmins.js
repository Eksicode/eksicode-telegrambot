async function forAdmins (ctx, cb) {
    const check = await ctx.telegram.getChatMember(
        process.env.ADMIN_CH_ID,
        ctx.from.id
    )
    if (check && check.status !== "kicked" && check.status !== "left") {
        return await cb(ctx)
    }
}

module.exports = forAdmins