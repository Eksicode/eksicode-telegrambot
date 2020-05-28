const axios = require('axios')

async function apiAuth () {
  try {
    const res = await axios.post(`${process.env.API_URL}/auth/local`, {
      identifier: process.env.API_USER,
      password: process.env.API_PASS
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = res.data

    return data.jwt
  } catch (err) {
    console.log('API Yetkilendirmesi esnasında bir hata oluştu.')
    console.error(err)
  }
}

module.exports = apiAuth
