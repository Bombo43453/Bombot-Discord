module.exports = {
    name: `Remove`,
    description: `Remove Users From Tickets`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if(!message.channel.name.includes(`ticket-`)) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        await message.channel.createOverwrite(member, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false, 
            SEND_TTS_MESSAGES: false
        })
        let embed = new Discord.MessageEmbed()
            .setTitle(`Removed Member`)
            .setDescription(`Removed ${member} From This Ticket \n Removed By: ${message.author}`)
            .setColor(`${guildProfile.EmbedColor}`)
        message.channel.send(embed)
    }
}