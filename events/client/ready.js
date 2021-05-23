const chalk = require(`chalk`)
const fs = require('fs')
const AntiSpam = require('discord-anti-spam');
const Discord = require('discord.js');
module.exports = async (client) => {
    console.log(`
   
888888             db        88""Yb  dP"Yb  888888 
88__   ________   dPYb       88__dP dP   Yb   88   
88""   """"""""  dP__Yb      88""Yb Yb   dP   88   
888888          dP""""Yb     88oodP  YbodP    88   
 `)
 console.log(chalk.red(`All Logging Starts Below`))
    console.log(`${client.user.tag} is online!!`)
client.once("reconnecting", () => {
        console.log("Reconnecting!");
      });
      
client.once("disconnect", () => {
        console.log("Disconnect!");
      });


console.log(`Active Prefix: >> ${chalk.red (`${process.env.prefix}`)} <<`)

client.user.setActivity(`${client.guilds.cache.size} Servers 🗺 | ${client.users.cache.size} Users 👤`, { type: 'WATCHING' })

setInterval(async() => {
  client.user.setActivity(`${client.guilds.cache.size} Servers 🗺 | ${client.users.cache.size} Users 👤`, { type: 'WATCHING' })

}, 600000)

    }