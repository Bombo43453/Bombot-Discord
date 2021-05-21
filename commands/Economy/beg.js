const profileModel = require(`../../database/models/profileSchema`)
module.exports = {
    name: `beg123131`,
    description: `beg for coins`,
    hidden: true,
    cooldown: 10,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
       // if(message.channel.id !== (`${process.env.BOTCOMMANDS}`)) return message.reply(`This must be done in <#${process.env.BOTCOMMANDS}>`)
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id, serverID: message.guild.id

        }, {
            $inc: {
                coins: randomNumber
            }
        }
        );
        const embed = new Discord.MessageEmbed()
            .setTitle(`Beg`)
            .setDescription(`${message.author}`)
            .addField(`You begged and recieved:`, `\`\`\`css\n${randomNumber} coins\`\`\``)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
        return message.channel.send(embed)
    }
}