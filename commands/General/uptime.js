const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: `uptime`,
    description: `Show Bot Uptime`,
    usage: ``,
async execute(client, message, args, Discord){
        const duration = moment.duration(client.uptime).format("M [Months], D [days], H [hrs], m [mins], s [sec]");
    const upembed = new Discord.MessageEmbed()
    .setTitle(` UpTime: `)
    .setDescription(`${duration}`)
    .setColor(`${process.env.EMBEDCOLOR}`)
    .setTimestamp()
    .setThumbnail(`${process.env.SERVERLOGO}`)
    message.channel.send(upembed)
    }
}