const Discord = require(`discord.js`)
module.exports = (client, message, queue) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`No More Users Left If VC`)
        .setDescription(`I Disconnected, As There Are No More Users On the VC`)
        .setColor(`RED`)
    message.channel.send(embed);
};