/**
 * Bu script, eksicode.org telegram grupları üzerinde ki kayıtlı üye sayılarını ölçmek
 * ve ilerde chat vb geliştirmeler için yapılmıştır.
 */
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, ".env")
});
const mysql = require("mysql");
const config = require("../config.js");
const axios = require("axios");

async function telegramBot(bot) {
    let allGroups;

    axios
        .get("http://api.eksicode.org/telegrams?_sort=ListOrder:ASC")
        .then(async function(response) {
            allGroups = response.data;
            console.log(response.data.length);

            for (let i = 0; i < allGroups.length; i++) {
                await bot.telegram
                    .getChatMembersCount(allGroups[i].channelID)
                    .then(data => {
                        allGroups[i].members = data;
                    })
                    .catch(err =>
                        console.log(
                            `${allGroups[i].name} için data çekilemedi.`
                        )
                    );

                delete allGroups[i].channelID;
            }

            let connection = mysql.createConnection(config);

            let sql, data;
            for (let i = 0; i < allGroups.length; i++) {
                console.log(allGroups[i].name + ": " + allGroups[i].members);

                data = [allGroups[i].members, allGroups[i].id];

                sql = "UPDATE eksicode SET members = ? WHERE id = ?";

                connection.query(sql, data, (error, results, fields) => {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("Rows affected:", results.affectedRows);
                });
            }

            connection.end();
        })
        .catch(function(error) {
            console.log(error);
        });
}

module.exports = telegramBot;
