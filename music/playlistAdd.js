const Discord = require(`discord.js`)
module.exports = (client, message, queue, playlist) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`Song Added To Queue`)
        .setDescription(`I have Added The Song \`${playlist.title}\` To The Que \n Current Que Size: \`${playlist.tracks.length}\``)
        .setColor(`RED`)
    message.channel.send(embed);
};