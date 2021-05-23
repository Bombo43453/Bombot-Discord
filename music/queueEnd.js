const Discord = require('discord.js');
module.exports = (client, message, queue) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`Music Has Stopped Playing`)
        .setDescription(`The Current Playlist Que Ended.`)
        .setColor(`Green`)
        message.channel.send(embed)
};