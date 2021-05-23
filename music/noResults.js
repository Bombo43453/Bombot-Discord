const Discord = require(`discord.js`)
module.exports = (client, message, query) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`Uh Oh`)
        .setDescription(`I Have Not Found Results For The Song Title (\`${query}\`) You Mentioned \n Make Sure It Is Spelled Correctly`)
    message.channel.send(embed);
};