module.exports = {
    name: `add`,
    description: `Add People To Tickets`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if(!message.channel.name.includes(`ticket-`)) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        await message.channel.createOverwrite(member, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true, 
            SEND_TTS_MESSAGES: false
        })
        let embed = new Discord.MessageEmbed()
            .setTitle(`Added Member`)
            .setDescription(`Added ${member} To This Ticket \n Added By: ${message.author}`)
            .setColor(`${guildProfile.EmbedColor}`)
        message.channel.send(embed)
    }
}