module.exports = {
    name:"say",
    description: "says what you tell it to",
    usage: `(message)`,
    async execute(client, message, args, Discord, errorlog){
        message.delete();
        if (!message.member.hasPermission(`${process.env.SAYPERM}`)) return message.channel.send(`${message.author}, You Dont Not Have Permissions... Missing: **${process.env.SAYPERM}**`);
        const messageToSay = args.join(" ");
        if (messageToSay >0) return message.channel.send(`You Must Send A Longer Message`);
        const logembed = new Discord.MessageEmbed()
            
            .setTitle(`Say Command Used`)
            .addField(`Used By:`, `${message.author}`, true)
            .addField(`Channel`, `${message.channel}`, true)
            .addField(`Content`, `${message.content}`)
            .setColor(`${process.env.EMBEDCOLOR}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
        try {
            await message.channel.send(messageToSay);
            client.channels.cache.get(`${process.env.LOG}`).send(logembed)
        }catch (err){
            errorlog.send(`${err}`)
            message.channel.send(`${message.author}, I am not Able To Send That Message (Error Code 103)`)
        }

    }
}
