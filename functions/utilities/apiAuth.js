const axios = require('axios')

async function apiAuth () {
  const res = await axios.post('https://api.eksicode.org/auth/local', {
    identifier: process.env.API_USER,
    password: process.env.API_PASS
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = res.data

  return data.jwt
}

module.exports = apiAuth
