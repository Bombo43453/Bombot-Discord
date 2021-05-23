module.exports = {
    name: `stop`,
    description: `Stop The Current Song`,
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
        client.player.setRepeatMode(message, false)
        errmbed = new Discord.MessageEmbed()
            .setTitle(`Uh Oh`)
            .setDescription(`I am not Currently Playing Any Music`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setTimestamp()
        if (!client.player.getQueue(message)) return message.channel.send(errmbed);

        try {
            let work = client.player.stop(message)
            const embed = new Discord.MessageEmbed()
                .setTitle(`Stopped Music`)
                .setDescription(`The Current Song A Queue Have Been Stopped`)
                .setTimestamp()
            if(work) message.channel.send(embed)
        } catch (err) {
            errorlog.send(`An Error Has Occured With The Stop Music Command \n Error: \n ${err}`)
            message.channel.send(`**An Error Has Occured** \n The Current Error Is Being Recorded And Sent To the Developers \n Please Try Again Later`)
        }

}
}