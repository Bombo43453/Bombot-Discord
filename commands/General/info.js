

module.exports = {
    name: `info`,
    description: `Bot Info`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const embed = new Discord.MessageEmbed()
        .setTitle(`This is Bombot`)
        .addField(`Developer Info`, `I am Bombo43453 <@338040350465851394>, I made bombot and hope to have this bot as a project to teach me and hopefully for you to enjoy.`)
        .addField(`Support Discord:`,  `https://discord.gg/6JeQyafh`)
        .addField(`About me`, `I am a bot that should help you and the developer. I am a learning project and reporting bugs will be appreciated (${guildProfile.prefix}botbug (report))`)
        .setColor(`${guildProfile.EmbedColor}`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
    message.channel.send(embed)
}
}