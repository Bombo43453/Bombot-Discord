module.exports = {
    name: `queue`,
    aliases: [`que`, `q`],
    description: `Current Song Queue`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        let errmbed = new Discord.MessageEmbed()
        .setTitle(`Uh Oh`)
        .setDescription(`You Must Be In A Voice Channel`)
        .setTimestamp()
        .setColor(`${guildProfile.EmbedColor}`)
    if (!message.member.voice.channel) return message.channel.send(errmbed);
    errmbed = new Discord.MessageEmbed()
    .setTitle(`Uh Oh !`)
    .setDescription(`You Are Not In The Same Voice Channel That The Bot Is Currently In`) 
    .setColor(`${guildProfile.EmbedColor}`)
   // .addField(`Bots Current Voice Channel:`, `${message.guild.me.voice.channel.name}`, true)
    .setTimestamp()
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(errmbed);
    errmbed = new Discord.MessageEmbed()
        .setTitle(`Uh Oh!`)
        .setDescription(`No Song Is Currently Playing`)
        .setColor(`${guildProfile.EmbedColor}`)
        .setTimestamP()
        if (!client.player.getQueue(message)) return message.channel.send(errmbed);

    try {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Current Server Queue 📃`)
            .setDescription()
    } catch (err){

    }
    }
}