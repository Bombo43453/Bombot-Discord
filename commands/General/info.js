

module.exports = {
    name: `info1`,
    cooldown: 5,
    description: `Bot Info`,
    
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const embed = new Discord.MessageEmbed()
        .setTitle(`This is Bombot (Press To Donate)`, )
        .addField(`Developer Info`, `I am Bombo43453 <@338040350465851394>, I made bombot and hope to have this bot as a project to teach me and hopefully for you to enjoy. I am paying out of pocket for hosting and would love help with a donation.`)
        .addField(`Support Discord:`,  `https://discord.gg/navpvRsFYh`)
        .addField(`About me`, `I am a bot that should help you and the developer. I am a learning project and reporting bugs will be appreciated (${guildProfile.prefix}botbug (report))`)
        .setColor(`${guildProfile.EmbedColor}`)
        .setURL(`https://www.paypal.com/donate?business=QK845HKCQWKSL&item_name=Bombot+Donating&currency_code=USD`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
    message.channel.send(embed)
}
}