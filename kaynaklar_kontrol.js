const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '.env')
})
const axios = require('axios')
const { apiAuth } = require('./src/utils')

let allSourcess;

(async () => {

  const jwt = await apiAuth()

  const changeApprove = async (id) => {
    try {
      const requestData = {
        approved: false
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt
        }
      }
      axios.put('https://api.eksicode.org/kaynaklars/' + id, requestData, config)
    } catch (err) {
      console.error(err)
    }
  }

  axios.get('https://api.eksicode.org/kaynaklars?_limit=10000000&_sort=id:ASC')
    .then(async (response) => {
      allSourcess = response.data
    })
    .then(() => {
      console.log('total links: ' + allSourcess.length)

      let number = 0;

      allSourcess.forEach(async (source) => {

        axios.get(source.doc_link)
          .then((response) => {
            console.log(number + " - " + response.status + " " + source.doc_link + " is up");
            number++
          }, async (error) => {
            await changeApprove(source.id);
            console.log(number + " " + error.response.status);
            number++
          });

      });
    })
    .catch((error) => {
      console.log(error)
    })

})()