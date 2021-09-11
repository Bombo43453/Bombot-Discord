module.exports = {
    name: "ban",
    description: "Ban A Member",
    usage: `(user) (reason)`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if (!message.member.permissions.has(`${guildProfile.BanPerm}`)) return message.channel.send(`You Don't Have Permissions!!!!!`);

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        // if (message.mentions.users.first() === `581584824326684672` || `533036968884568065` || `317748198158630913`) return message.channel.send(`Cmon you tried to ban a director!!!`);
        if (!member) return message.channel.send(`You Must Mention A Member ${guildProfile.prefix}ban (User) (reason)`).then(msg => msg.delete({
            timeout: 3000
        }));

        
        const reason = args.slice(1).join(" ") || "No Reason Provided";

        //PUBLIC MESSAGE BELOW
        const banembed = new Discord.MessageEmbed()
            .setTitle('Banned Member')
            .setDescription(`Banned By: ${message.author}`)
            .setColor(`RED`)
            .setTimestamp()
            .addFields({
                name: `Banned Member:`,
                value: `${member}`,
                inline: false
            }, {
                name: `Reason:`,
                value: `${reason}`,
                inline: false
            })

        //LOG MESSAGE
        const logembed = new Discord.MessageEmbed()
            .setTitle(`MEMBER BANNED`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setDescription(`Banned By: ${message.author}`)
            .addFields({
                name: `Member Banned:`,
                value: `${member}`,
                inline: false
            }, {
                name: `Reason:`,
                value: `${reason}`,
                inline: false
            })

        //DM MESSAGE
        const DMmessage = new Discord.MessageEmbed()
            .setTitle(`You Have Been Banned`)
            .setColor(`RED`)
            .addFields({
                name: `Banned By:`,
                value: `${message.author}`,
                inline: false
            }, {
                name: `Reason:`,
                value: `${reason}`,
                inline: false
            }, )


        if (member) {

            try {
                message.mentions.users.first().send(DMmessage)

            } catch (err) {
                errorlog.send(err)
            }
            setTimeout(function () {
                member.ban({
                    reason
                })
                message.channel.send(banembed);
                
                if (!isNaN(guildProfile.LogChannel)){
                    client.channels.cache.get(`${guildProfile.LogChannel}`).send(logembed);
                } 
            }, 3000);

        } else {
            channel.send(`${message.author}, Cannot Ban that Member`)
        }

    }
}