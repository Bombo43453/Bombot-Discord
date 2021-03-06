module.exports = {
    name: "unban",
    description: "Unban a member",
    usage: `ID`,

    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        const invalidembed = new Discord.MessageEmbed()
            .setTitle('Invalid Permissions')
            .setDescription(`${message.author}, You Are Missing The Following Permissions: ${guildProfile.BanPerm}`)
            .setFooter(`If you think this was a mistake, please make a ticket`)

        if (!message.member.permissions.has(`${guildProfile.BanPerm}`)) return message.channel.send(invalidembed);

        const id = args[0];
        if (!id) return message.reply(`You Must Specify An ID Usage: ${guildProfile.prefix}unban (ID)`)

        const bannedMembers = await message.guild.fetchBans();
        if (!bannedMembers.find((user) => user.user.id === id)) return message.reply(`User Is Not Banned In This Server`);

        //Unban Log
        const unbanembed = new Discord.MessageEmbed()
            .setTitle(`UNBANNED MEMBER`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .addFields({
                name: `Member Unbanned:`,
                value: `${id}`,
                inline: false
            }, {
                name: `Unbanned By:`,
                value: `${message.author}`,
                inline: false
            })

        try {
            message.guild.members.unban(id);
            message.reply(`User (${id}) Has Been Unbanned`);
            if (!isNaN(guildProfile.LogChannel)) {
                client.channels.cache.get(`${guildProfile.LogChannel}`).send(unbanembed)
            }
        } catch (err) {
            return;
        }
    }
}