module.exports = {
    name: `serverinfo`,
    aliases: [`server-info`, `infoserver`],
    description: `display server info`,
    usage: ``,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle("**Server Information**")
        .setColor(`${guildProfile.EmbedColor}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField(` Name of server:`, message.guild.name, true)
        .addField(`Server Owner`, message.guild.owner, true)  
        .addField(`Server Region`, message.guild.region, true)
        .addField(`Members:`, message.guild.members.cache.size, true)
        .addField(`Bots:`, message.guild.members.cache.filter(member => member.user.bot).size, true)
        .addField(`Emojis:`, message.guild.emojis.cache.size, true)
        .addField(`Animated Emoji\'s:`,message.guild.emojis.cache.filter(emoji => emoji.animated).size,true )
        .addField(`Total Text Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
        .addField(`Total Voice Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
        .addField(`Total Amount of Roles:`, message.guild.roles.cache.size, true)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL())
        message.channel.send(embed);  
}

}