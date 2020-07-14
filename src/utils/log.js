const fs = require('fs')

function parseLog (ctx, date) {
    const chat = `${ctx.chat.title} (${ctx.chat.id})`
    const time = `${
        (date.getHours() + "").padStart(2, "0")
        }:${
        (date.getMinutes() + "").padStart(2, "0")
        }:${
        (date.getSeconds() + "").padStart(2, "0")
        } UTC`
  if (ctx.message) {
    const text = ctx.message?.text || "ATTACHMENT ONLY"
    const user = ctx?.from
    const userParsed = `${user.first_name || user.last_name || user.username} (${user.id})`
    
    if (ctx.message.new_chat_members) {
      return ctx.message.new_chat_members.map(user => {
        const userParsed = `${user.first_name || user.last_name || user.username} (${user.id})`
        return `[NEW MEMBER] ${time} - ${chat}: ${userParsed}`
      }).join('\n') + '\n'
    } else if (ctx.message.left_chat_member) {
        const user = ctx.message.left_chat_member
        const userParsed = `${user.first_name || user.last_name || user.username} (${user.id})`
        return `[LEFT MEMBER] ${time} - ${chat}: ${userParsed}\n`
    } else {
        return `[MESSAGE] ${time} - ${chat} - ${userParsed}: ${text}\n`
    }
  }
}

async function log (ctx) {
    try {
        const date = new Date()
        const fileName = `logs/log_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.txt`
        fs.appendFile(fileName, parseLog(ctx, date), (err) => {
            if (err) throw err
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports = log
