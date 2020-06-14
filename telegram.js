/**
 * Bu script, eksicode.org telegram grupları üzerinde ki kayıtlı üye sayılarını ölçmek
 * ve chat geliştirmeleri için yapılmıştır.
 */
const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '.env')
})
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const axios = require('axios')
const { apiAuth } = require('./src/utils')

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

(async () => {
  const jwt = await apiAuth()

  const updateMembers = async (id, members) => {
    try {
      const requestData = {
        members: members
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt
        }
      }
      axios.put(`${process.env.API_URL}/telegrams/` + id, requestData, config)
    } catch (err) {
      console.error(err)
    }
  }

  let allGroups

  axios.get(`${process.env.API_URL}/telegrams?_sort=ListOrder:ASC`)
    .then(async function (response) {
      allGroups = response.data
    })
    .then(async () => {
      console.log('toplam kanal sayısı: ' + allGroups.length)

      for (let i = 0; i < allGroups.length; i++) {
        await bot.telegram
          .getChatMembersCount(allGroups[i].channelID)
          .then(data => { allGroups[i].members = data })
          .then(async () => {
            await sleep(2000)
            updateMembers(allGroups[i].id, allGroups[i].members)

            console.log(allGroups[i].name + ' Güncellendi...')
          })
          .catch(() => console.log(`${allGroups[i].name} için data çekilemedi.`))

        delete allGroups[i].channelID
      }
    })
    .catch((error) => {
      console.log(error)
    })
})()
