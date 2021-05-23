module.exports = {
    name: 'pause',
    description: `Pause A Song`,
    usage: (``),

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
      //  .addField(`Bots Current Voice Channel:`, `${message.guild.me.voice.channel.name}`, true)
        .setTimestamp()
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(errmbed);
        errmbed = new Discord.MessageEmbed()
            .setTitle(`Uh Oh`)
            .setDescription(`I am not Currently Playing Any Music`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setTimestamp()
        if (!client.player.getQueue(message)) return message.channel.send(errmbed);
        errmbed = new Discord.MessageEmbed()
            .setTitle(`Uh Oh`)
            .setDescription(`Music Is Already Paused`)
            .setColor(`${guildProfile.EmbedColor}`)
        if (client.player.getQueue(message).paused) return message.channel.send(errmbed);

       try{
        const pausework = client.player.pause(message);
        let doneEmbed = new Discord.MessageEmbed()
            .setTitle(`Song Paused !`)
            .setDescription(`\`${client.player.getQueue(message).playing.title}\` Has Been Paused`)
            .setColor(`${guildProfile.EmbedColor}`)
        if (pausework) message.channel.send(doneEmbed);
       } catch (err){
           errorlog.send(`Error With Pause Command IN (${message.guild.name}) \n ${err}`)
           message.channel.send(`An Error Has Occured, Error Is Being Uploaded to Developers. Please Try Again Later`)
       }
    },
};