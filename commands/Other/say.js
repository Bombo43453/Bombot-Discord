module.exports = {
    name:"say",
    description: "says what you tell it to",
    usage: `(message)`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
        message.delete();
        if (!message.member.hasPermission(`${guildProfile.SayPerm}`)) return message.channel.send(`${message.author}, You Dont Not Have Permissions... Missing: **${guildProfile.SayPerm}**`);
        const messageToSay = args.join(" ");
        if (messageToSay >0) return message.channel.send(`You Must Send A Longer Message`);
        const logembed = new Discord.MessageEmbed()
            
            .setTitle(`Say Command Used`)
            .addField(`Used By:`, `${message.author}`, true)
            .addField(`Channel`, `${message.channel}`, true)
            .addField(`Content`, `${message.content}`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
        try {
            await message.channel.send(messageToSay);
            client.channels.cache.get(`${guildProfile.LogChannel}`).send(logembed)
        }catch (err){
            errorlog.send(`${err}`)
            message.channel.send(`${message.author}, I am not Able To Send That Message \n It is Either Over 2000 Characters or \n You Have Not Setup A Log Channel. Do ${guildProfile.prefix}setup For more information`)
        }

    }
}
