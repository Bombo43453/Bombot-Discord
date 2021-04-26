module.exports = {
    name: "unban",
    description: "Unban a member",

async execute(client, message, args, Discord){
    const invalidembed = new Discord.MessageEmbed()
    .setTitle('Invalid Permissions')
    .setDescription(`${message.author}, You Are Missing The Following Permissions: ${process.env.BANPERM}`)
    .setFooter(`If you think this was a mistake, please make a ticket`)

        if (!message.member.permissions.has(`${process.env.BANPERM}`)) return message.channel.send(invalidembed);

        const id = args[0];
        if(!id) return message.reply (`You Must Specify An ID Usage: ${process.env.PREFIX}unban (ID)`)

        const bannedMembers = await message.guild.fetchBans();
        if(!bannedMembers.find((user) => user.user.id === id)) return message.reply(`User Is Not Banned In This Server`);

        //Unban Log
        const unbanembed = new Discord.MessageEmbed()
            .setTitle(`UNBANNED MEMBER`)
            .addFields(
                {name: `Member Unbanned:`, value: `${id}`, inline: false},
                {name: `Unbanned By:`, value: `${message.author}`, inline: false}
            )

        message.guild.members.unban(id);
        message.reply(`User Has Been Unbanned`);
        client.channels.cache.get(`${process.env.LOG}`).send(unbanembed)
    }
}
