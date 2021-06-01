const { GuildSettingsHelper } = require("discord.js-commando");

module.exports = {
    name: `queue`,
    aliases: [`que`, `q`, `q1`],
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
    const queue = client.player.getQueue(message);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(errmbed);
    errmbed = new Discord.MessageEmbed()
        .setTitle(`Uh Oh!`)
        .setDescription(`No Song Is Currently Playing`)
        .setColor(`${guildProfile.EmbedColor}`)
        .setTimestamp()
        if (!client.player.getQueue(message)) return message.channel.send(errmbed);

    try {
        
            const embed = new Discord.MessageEmbed()
            .setTitle(`Current Server Queue 📃`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setDescription(`${client.player.getQueue(message).loopMode ? `(looped)` : ``}\n [Current Song: ${queue.playing.title} By ${queue.playing.author}](${queue.playing.url})\n\n` + (queue.tracks.map((track, i) => {
                return `**#${i + 1}** - [${track.title} By ${track.author} ${track.duration}](${track.url}) (Requestd: ${track.requestedBy})`
            }).slice(0, 10).join(`\n`) + `\n\n\n${queue.tracks.length > 10 ? `And \`${queue.tracks.length - 15}\`other songs`: `In The Playlist \`${queue.tracks.length}\` Songs..`}`))
                message.channel.send(embed)
        
        
        
        
            
    } catch (err){
        console.log(err)
        let emby = new Discord.MessageEmbed()
            .setTitle(`Uh Oh`)
            .setDescription(`A Fatal Error Has Occured \n Do .botbug to report the error \n Error: \n ${err}`)
            message.channel.send(emby)
            return;
            
    }
    }
}