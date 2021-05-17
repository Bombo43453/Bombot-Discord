module.exports = {
    name: "purge",
    description: "removes some messages",
    async execute(client, message, args, Discord){
        const reason = args.join(" ");
        if (!message.guild) return;
        if (!message.member.hasPermission(`${process.env.PURGE}`)) return message.channel.send(`${message.author}, You Dont Not Have Permissions Missing: **MANAGE_MESSAGES**`);
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I Am Missing Permissions (Error Code 102)");
        if (!args[0]) return message.channel.send(`You Must State An Amount To Purge Usage: ${process.env.PREFIX}purge (amount)`);
        const amountToDelete = Number(args[0], 10);

        if (isNaN(amountToDelete)) return message.channel.send("Number Stated Is Not A Valid Number");
        if (!Number.isInteger(amountToDelete)) return message.channel.send("Number Stated Must Be A Whole Number.");
        if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send(`The Number Must Be Between 2 and 100`);
        const fetched = await message.channel.messages.fetch({
            limit: amountToDelete
        });


        try {
            await message.channel.bulkDelete(fetched)
                .then(messages => {
                    const deletembed2 = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setTitle(`Purged Messages`)
                        .setDescription(`${message.author}, Purged ${messages.size} Messages!`)
                        .setTimestamp()
                        .setColor(`${process.env.EMBEDCOLOR}`)
                        .addFields(
                            {name: `Channel:`, value: `<#${message.channel.id}>`, inline: false}
                        )
                    const deleteembed = new Discord.MessageEmbed()
                        .setDescription(`Deleted ${messages.size} messages!`)
                    message.channel.send(deleteembed).then (async (msg) => {
                        setTimeout(() => {msg.delete(); }, 1000);
                    });
                    client.channels.cache.get(`${process.env.LOG}`).send(deletembed2);
                });
        }catch (err){
            console.log(err);
            message.channel.send(`I was Unable To Delete The Amount Stated. Error Code 101`)
        }
    }
}

// message.channel.send (`Deleted ${messages.size} messages!`));
