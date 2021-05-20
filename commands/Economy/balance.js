const profileModel = require(`../../database/models/profileSchema`)
module.exports = {
    name: 'balance',
    aliases: ['bal', 'bl', `wallet`],
    description: `Check the user balance`,
     async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        
        const embed = new Discord.MessageEmbed()
            .setTitle(`Balance`)
            .addField(`Wallet:`, `\`\`\`css\n${profileData.coins} coins\`\`\``)
            .addField(`Bank:`, `\`\`\`css\n${profileData.bank} coins\`\`\``)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
        message.channel.send(embed)
    }
}