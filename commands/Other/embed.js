module.exports = {
    name:"embed",
    description: "says what you tell it to",
    usage: `(message)`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
        message.delete();
        if (!message.member.hasPermission(`${guildProfile.SayPerm}`)) return message.channel.send(`${message.author}, You Dont Not Have Permissions... Missing: **${guildProfile.SayPerm}**`);
        const messageToSay = args.join(" ");
        const sayEmbed = new Discord.MessageEmbed()
            .setDescription(messageToSay)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(`${guildProfile.EmbedColor}`)
            .setTimestamp();
        const logembed = new Discord.MessageEmbed()
        .setTitle(`Say Command (embed) Used`)
            .addField(`Used By:`, `${message.author}`, true)
            .addField(`Channel`, `${message.channel}`, true)
            .addField(`Content`, `${message.content}`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
        try {
            await message.channel.send(sayEmbed);
            if (!isNaN(guildProfile.LogChannel)) {
                client.channels.cache.get(`${guildProfile.LogChannel}`).send(logembed)
            }
            
        }catch (err){
           // console.log(err);
          // errorlog.log(`${err}`)
            message.channel.send(`${message.author}, I am not Able To Send That Message \n This Is Most Likely Because Of A Message Being Over 2000 Characters.`)
            errorlog.send(`${err}`)
        }

    }
}
var str = 'abcdefghijkl';
console.log(str.match(/.{1,3}/g));
