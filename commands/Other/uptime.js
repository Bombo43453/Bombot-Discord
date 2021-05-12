const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: `uptime`,
    description: `Show Bot Uptime`,
async execute(client, message, args, Discord){
    if (!message.member.roles.cache.some(role => role.name === `BOTPERM`)){
        message.channel.send(`You do not have permissions (make sure you have the role "BOTPERM")`)
        return;
        }
        const duration = moment.duration(client.uptime).format("M [Months], D [days], H [hrs], m [mins], s [sec]");
    const upembed = new Discord.MessageEmbed()
    .setTitle(` UpTime: `)
    .setDescription(`${duration}`)
    .setColor(`BLUE`)
    .setTimestamp()
    .setThumbnail(`${process.env.SERVERLOGO}`)
    message.channel.send(upembed)
    }
}