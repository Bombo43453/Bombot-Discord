

module.exports = {
    name: `shuffle`,
    aliases: [`sh`],
    description: `Shuffle A Playlist`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
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
      //  .addField(`Bots Current Voice Channel:`, `${message.guild.me.voice.channel.name}`, true)
        .setTimestamp()
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(errmbed);
        errmbed = new Discord.MessageEmbed()
            .setTitle(`Uh Oh`)
            .setDescription(`I am not Currently Playing Any Music`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setTimestamp()
        if (!client.player.getQueue(message)) return message.channel.send(errmbed);
    try{
        let work = client.player.shuffle(message);
            const embed = new Discord.MessageEmbed()
                .setTitle(`Current Que Has Been Shuffled`)
                .setDescription(`I Have Shuffled \`${client.player.getQueue(message).tracks.length}\` Songs`)
                .setColor(`${guildProfile.EmbedColor}`)
                .setTimestamp()
        if (work) message.channel.send(embed)
    } catch (err){
        errorlog.send(`An Error Has Occured With The Shuffle Command \n Error: \n ${err}`)
        message.channel.send(`Uh Oh! \n \`An Error Has Occured And Is Currently Being Reported To The Developer(s)\` \n Please Try Again Later`)
    }

}
}