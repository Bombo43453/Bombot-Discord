const chalk = require(`chalk`)
const moment = require(`moment`)
const fs = require('fs')
// const AntiSpam = require('discord-anti-spam');
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

  client.user.setActivity(`${client.guilds.cache.size} Servers 🗺 | ${client.users.cache.size} Users 👤`, {
    type: 'WATCHING'
  })

  setInterval(async () => {
    client.user.setActivity(`${client.guilds.cache.size} Servers 🗺 | ${client.users.cache.size} Users 👤`, {
      type: 'WATCHING'
    })
  }, 600000)
  const duration1 = moment.duration(client.uptime).format("M [Months], D [days], H [hrs], m [mins], s [sec]");
  const arr1 = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
  arr1.reverse();
  const used1 = process.memoryUsage().heapUsed / 1024 / 1024;
  let logembed = new Discord.MessageEmbed()
    .setTitle(`Bot Online!`)
    .setColor(`GREEN`)
    .addField(`Uptime:`, `\`\`\`css\n${duration1}\`\`\``)
    .addField(`Ram Usage:`, `\`\`\`css\n${Math.round(used1 * 100)/ 100} MB\`\`\``)
    .setTimestamp()
    .setFooter(`Updates Every Ten Min`)
  let logchannel = client.channels.cache.get(`846194502720946186`)
  const sentmsg = await logchannel.send(`** **`)
  setInterval(async () => {
  const duration = moment.duration(client.uptime).format("M [Months], D [days], H [hrs], m [mins], s [sec]");
  const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
  arr.reverse();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
 logembed = new Discord.MessageEmbed()
    .setTitle(`Bot Online!`)
    .setColor(`GREEN`)
    .addField(`Uptime:`, `\`\`\`css\n${duration}\`\`\``)
    .addField(`Ram Usage:`, `\`\`\`css\n${Math.round(used * 100)/ 100} MB\`\`\``)
    .setTimestamp()
    .setFooter(`Updates Every 5 Min`)
    sentmsg.edit(logembed).catch(err => {
      return;
    })
  }, 300000)
}