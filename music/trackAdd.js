const Discord = require('discord.js');
module.exports = (client, message, queue, track) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`Song Added to Que`)
        .setDescription(`Added \`${track.title}\` To The Queue`)
        .setColor(`GREEN`)
    message.channel.send(embed);
};