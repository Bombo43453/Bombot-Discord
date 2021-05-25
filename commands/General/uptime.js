const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: `uptime`,
    description: `Show Bot Uptime`,
    usage: ``,
async execute(client, message, args, Discord){
        const duration1 = moment.duration(client.uptime).format("M [Months], D [days], H [hrs], m [mins], s [sec]");
       // const duration1 = moment.duration(client.uptime).format("M [Months], D [days], H [hrs], m [mins], s [sec]");
  
        const arr1 = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
        arr1.reverse();
        const used1 = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used1 * 100) / 100} MB`);
        const embed = new Discord.MessageEmbed()
          .setTitle(`Bot Status`)
          .setColor(`GREEN`)
          .addField(`Uptime:`, `\`\`\`css\n${duration1}\`\`\``)
          .addField(`Ram Usage:`, `\`\`\`css\n${Math.round(used1 * 100)/ 100} MB\`\`\``)
    message.channel.send(embed)
    }
}