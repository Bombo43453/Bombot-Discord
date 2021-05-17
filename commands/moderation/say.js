module.exports = {
    name:"say",
    description: "says what you tell it to",
    usage: `(message)`,
    async execute(client, message, args, Discord){
        message.delete();
        if (!message.member.hasPermission(`${process.env.SAYPERM}`)) return message.channel.send(`${message.author}, You Dont Not Have Permissions... Missing: **${process.env.SAYPERM}**`);
        const messageToSay = args.join(" ");
        if (messageToSay >0) return message.channel.send(`You Must Send A Longer Message`);
        const logembed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle(`${message.author.username}, Used ${process.env.PREFIX}say in  #${message.channel.name}, Message Below:`)
            .setDescription(messageToSay)
        try {
            await message.channel.send(messageToSay);
            client.channels.cache.get(`${process.env.LOG}`).send(logembed)
        }catch (err){
            message.channel.send(`${message.author}, I am not Able To Send That Message (Error Code 103)`)
        }

    }
}
