
module.exports = {
    name: `nowplaying`,
    description: `Show The Current Playing Song`,
    aliases: [`np`],
    usage: ``,

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
            //.addField(`Bots Current Voice Channel:`, `${message.guild.me.voice.channel.name}`, true)
            .setTimestamp()
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(errmbed);
        errmbed = new Discord.MessageEmbed()
            .setTitle(`Uh Oh`)
            .setDescription(`I am not Currently Playing Any Music`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setTimestamp()
        if (!client.player.getQueue(message)) return message.channel.send(errmbed);

        const track = client.player.nowPlaying(message);
        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        
        let embed = new Discord.MessageEmbed()
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${track.thumbnail}`)
            .setTimestamp()
            .addFields({
                    name: `Currently Playing:`,
                    value: `[${track.title}](${track.url}) - (${track.duration})`,
                    inline: false
                }, {
                    name: `By:`,
                    value: `${track.author}`,
                    inline: false
                }, {
                    name: `Views:`,
                    value: `👁‍🗨${track.views.toLocaleString(`en-US`)}`,
                    inline: true
                }, {
                    name: `From Playlist:`,
                    value: `${track.fromPlayliist ? 'Yes' : 'No'}`,
                    inline: true
                }, {
                    name: `Requested By:`,
                    value: `${track.requestedBy}`,
                    inline: false
                }, {
                    name: `Volume`,
                    value: client.player.getQueue(message).volume,
                    inline: true
                }, {
                    name: 'Repeat mode',
                    value: client.player.getQueue(message).repeatMode ? 'Yes' : 'No',
                    inline: true
                }, {
                    name: 'Currently paused',
                    value: client.player.getQueue(message).paused ? 'Yes' : 'No',
                    inline: true
                }, {
                    name: `Playback Position`,
                    value: `${client.player.createProgressBar(message, {timecodes: true})}`,
                    inline: false
                }

            )
        message.channel.send(embed)
    }
}