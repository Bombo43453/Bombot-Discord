const Discord = require('discord.js');
module.exports = (client, message, track) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`Now Playing...`)
        .setDescription(`Now Playing \`${track.title}\` into channel: ${message.member.voice.channel.name}`)
        .setColor(`GREEN`)
        .setTimestamp()
    message.channel.send(embed);
};