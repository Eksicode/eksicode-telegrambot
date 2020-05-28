const { unbanCommand } = require('../commands')

module.exports = async function (ctx) {
  const matchedData = ctx.callbackQuery.data.match(/^(?<type>.+): (?<data>.+)$/).groups
  if (matchedData && matchedData.type === 'unban') {
    await unbanCommand(ctx, matchedData.data)
    await ctx.answerCbQuery()
  }
}
