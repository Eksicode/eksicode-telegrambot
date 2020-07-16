const fs = require('fs')

function parseLog (ctx, date, event) {
    const chat = `${ctx.chat.title} (${ctx.chat.id})`
    const time = `${
        (date.getHours() + "").padStart(2, "0")
        }:${
        (date.getMinutes() + "").padStart(2, "0")
        }:${
        (date.getSeconds() + "").padStart(2, "0")
        } UTC`
  if (event === 'ban') {
    console.log("selam")
    const banned = ctx.message.reply_to_message.from
    const admin = ctx.from
    const reason = ctx.message.text.slice(ctx.message.entities[0].length + 1)
    const bannedParsed = `${banned.first_name || banned.last_name || banned.username} (${banned.id})`
    const adminParsed = `${admin.first_name || admin.last_name || admin.username} (${admin.id})`
    
    return `[BAN] ${time} - ${bannedParsed} - ${adminParsed} - ${reason || "No reason"}\n`
  } else if (event?.type === 'unban') {
    const unbanned = `${event.userId}`
    const admin = `${ctx.from.first_name || ctx.from.last_name || ctx.from.username} (${ctx.from.id})`
    
    return `[UNBAN] ${time} - ${unbanned} - ${admin}\n`
  }
  if (ctx.message) {
    const text = ctx.message?.text || 'ATTACHMENT ONLY'
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

async function log (ctx, event) {
    try {
        const date = new Date()
        const fileName = `logs/log_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.txt`
        fs.appendFile(fileName, parseLog(ctx, date, event), (err) => {
            if (err) throw err
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports = log
