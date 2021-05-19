module.exports = {
    name:"embed",
    description: "says what you tell it to",
    usage: `(message)`,
    async execute(client, message, args, Discord){
        message.delete();
        if (!message.member.hasPermission(`${process.env.SAYPERM}`)) return message.channel.send(`${message.author}, You Dont Not Have Permissions... Missing: **${process.env.SAYPERM}**`);
        const messageToSay = args.join(" ");
        const sayEmbed = new Discord.MessageEmbed()
            .setDescription(messageToSay)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(`${process.env.EMBEDCOLOR}`)
            .setTimestamp();
        const logembed = new Discord.MessageEmbed()
        .setTitle(`Say Command (embed) Used`)
            .addField(`Used By:`, `${message.author}`, true)
            .addField(`Channel`, `${message.channel}`, true)
            .addField(`Content`, `${message.content}`)
            .setColor(`${process.env.EMBEDCOLOR}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
        try {
            await message.channel.send(sayEmbed);
            client.channels.cache.get(`${process.env.LOG}`).send(logembed)
        }catch (err){
            console.log(err);
            message.channel.send(`${message.author}, I am not Able To Send That Message`)
        }

    }
}
var str = 'abcdefghijkl';
console.log(str.match(/.{1,3}/g));
