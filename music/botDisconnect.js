const Discord = require(`discord.js`)
module.exports = (client, message, queue) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`I Have Been Disconnected`)
        .setDescription(`A User Has Disconnected Me`)
        .setColor(`RED`)
    message.channel.send(embed);
};