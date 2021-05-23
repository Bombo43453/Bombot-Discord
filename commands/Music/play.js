module.exports = {
    name: `play`,
    aliases: [`p`],
    usage: [`(song)`],
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
            .setTitle(`Uh Oh !`)
            .setDescription(`You Have Not Mentioned A Song Title / URL`)
            .addField(`Usage`, `${guildProfile.prefix}play (Song Title / Prefix)`)
            .setColor(`${guildProfile.EmbedColor}`)
        if (!args[0]) return message.channel.send(errmbed);
        const songname = args.join(' ');
        try{
            client.player.play(message, songname, { firstResult: true });
        } catch (err){
            errorlog.send(`An Error Has Occured With The Play Command \n Error: \n \`${err}\` `)
            message.channel.send(`An Error Has Occured And Is Being Uploaded To Developer(S) \n Please Try Again Later`)
        }
    }
}