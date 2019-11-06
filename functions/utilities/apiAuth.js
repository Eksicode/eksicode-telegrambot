const fetch = require('node-fetch');

async function apiAuth() {
  const res = await fetch('https://api.eksicode.org/auth/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: process.env.API_USER,
      password: process.env.API_PASS,
    }),
  });

  const data = await res.json();

  return data.jwt;
}

module.exports = apiAuth;
