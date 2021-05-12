module.exports = {
    name:"say",
    description: "says what you tell it to",
    async execute(client, message, args, Discord){
        message.delete();
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${message.author}, You Dont Not Have Permissions...`);
        const messageToSay = args.join(" ");
        const logembed = new Discord.MessageEmbed()
            .setTitle(`${process.env.PREFIX}say Used:`)
            .setColor(`BLUE`)
            .addFields(
                {name: `Author`, value: `${message.author}`, inline: true},
                {name: `Channel`, value: `${message.channel}`, inline: true},
                {name: `Content`, value: `${messageToSay}`, inline: false},
            )
            
        try {
            await message.channel.send(messageToSay);
            client.channels.cache.get(`${process.env.LOG}`).send(logembed)
        }catch (err){
            console.log(err);
            message.channel.send(`${message.author}, I am not Able To Send That Message`)
        }

    }
}