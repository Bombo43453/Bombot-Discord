module.exports = {
    name: 'loop',
    description: `loop a song / playlist`,
    aliases: ['lp', 'repeat'],
    usage:(''),

  async  execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
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

        if (!client.player.getQueue(message)) return message.channel.send(``);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Loop Mode Disabled 🎵`)
                        .setTimestamp()
                        .setColor(`${guildProfile.EmbedColor}`)
                return message.channel.send(embed);
            } else {
                client.player.setLoopMode(message, true);
                let embed1 = new Discord.MessageEmbed()
                        .setTitle(`Loop Mode Enabled`)
                        .setDescription(`The Current Queue Will Play Forever (Or Until Something Happens)`)
                        .setTimestamp()
                        .setColor(`${guildProfile.EmbedColor}`)
                        message.channel.send(embed1)
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                let embed12 = new Discord.MessageEmbed()
                        .setTitle(`Loop Mode Disabled 🎵`)
                        .setTimestamp()
                        .setColor(`${guildProfile.EmbedColor}`)
                return message.channel.send(embed12);
            } else {
                client.player.setRepeatMode(message, true);
                let embed13 = new Discord.MessageEmbed()
                    .setTitle(`Loop Mode Enabled`)
                    .setDescription(`The Current Song Will Loop Forever`)
                    .setColor(`${guildProfile.EmbedColor}`)
                return message.channel.send(embed13);
            };
        };
    },
};