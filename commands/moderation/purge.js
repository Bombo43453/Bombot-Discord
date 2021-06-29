module.exports = {
    name: "purge",
    description: "removes some messages",
    usage: `(amount of messages)`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        const reason = args.join(" ");
        if (!message.guild) return;
        if (!message.member.hasPermission(`${guildProfile.PurgePerm}`)) return message.channel.send(`${message.author}, You Dont Not Have Permissions Missing: **${guildProfile.PurgePerm}**`);
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
                        .setColor(`${guildProfile.EmbedColor}`)
                        .addFields({
                            name: `Channel:`,
                            value: `<#${message.channel.id}>`,
                            inline: false
                        })
                    const deleteembed = new Discord.MessageEmbed()
                        .setDescription(`Deleted ${messages.size} messages!`)
                    message.channel.send(deleteembed).then(async (msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 1000);
                    });
                    if (!isNaN(guildProfile.LogChannel)) {
                        client.channels.cache.get(`${guildProfile.LogChannel}`).send(deletembed2)
                    }
                });
        } catch (err) {
            //console.log(err);
            message.channel.send(`I was Unable To Delete The Amount Stated, Please Make Sure Messages Are Under 14 Days Old. Please the support discord for more info.`)
        }
    }
}

// message.channel.send (`Deleted ${messages.size} messages!`));