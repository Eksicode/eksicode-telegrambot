const fetch = require('node-fetch');

// Will turn `text` into a hastebin document. 
// Should return a Hastebin URL.

async function hastebinize(text) { // Message.reply_to_message.text as argument.
  try {
    const requestToHastebin = await fetch('https://hastebin.com/documents', { // POSTs message to hastebin. Should return an object
      method: 'POST',                                                         // that contains hastebin document id.
      body: text                                                              // Example: {key: 'ezuhusunaq'}
    })

    const response = await requestToHastebin.json()

    return `https://hastebin.com/${response?.key}`

  } catch (err) {
    return err
  }
}

module.exports = hastebinize