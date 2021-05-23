module.exports = {
    name: 'volume',
    aliases: ['v'],
    usage: (`(1-100)`),
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
    const volume = args[0];
    errmbed = new Discord.MessaggeEmbed()
        .setTitle(`Uh Oh`)
        .setDescription(`You Did Not State A Number (volume)`)
        .addField(`Usage`, `${guildProfile.prefix}volume (Amount 1-100 )`)
        .setColor(`${guildProfile.EmbedColor}`)
    if(!volume) return message.channel.send(errmbed)
    errmbed = new Discord.MessageEmbed()
        .setTitle(`Uh Oh`)
        .setDescription(`You Must State A Valid Amount`)
        .addField(`Usage`, `${guildProfile.prefix}volume (Amount 1-100 )`)
        .setColor(`${guildProfile.EmbedColor}`)

    if(isNan(volume)) return message.channel.send(errmbed)
    if(volume === `Infinity`) return message.channel.send(errmbed)
    if(Math.round(parseInt(volume)) < 1) return message.channel.send(errmbed)
    if(Math.round(parseInt(volume)) > 100) return message.channel.send(errmbed);
    try{
        let work = client.player.setVolume(message, parseInt(volume));
            const embed = new Discord.MessageEmbed()
                .setTitle(`Volume Set!`)
                .setDescription(`Volume Has Been Set To **${parseInt(volume)}/100**`)
                .setColor(`${guildprofile.EmbedColor}`)
            if(work) message.channel.send(embed)
    } catch (err){
        errorlog.send(`An Error Has Occured With The Volume Music Command \n Error: \n ${err}`)
            message.channel.send(`**An Error Has Occured** \n The Current Error Is Being Recorded And Sent To the Developers \n Please Try Again Later`)
    }
}
}