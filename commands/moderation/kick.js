module.exports = {
    name: 'kick',
    description: 'this command kicks a member',
    usage: `(user) (reason)`,
    // permissions:["MUTE_MEMBERS"],
    execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
        let reason = args.slice(1).join(" ");
        if (!message.mentions.users) return message.channel.send(`${message.author}, You Must Mention A User Usage: ${guildProfile.prefix}kick (member) (reason)`)
    
        if (!message.member.hasPermission(`${guildProfile.KickPerm}`)) return message.channel.send(`${message.author}, You Dont Not Have Permissions Missing: **${guildProfile.KickPerm}**`);
        if (!reason) return message.channel.send(`You Have Not Stated A Reason Usage: ${guildProfile.prefix}kick (member) (reason)`);
        //if (message.mentions.users.first() !== guildMember) return message.channel.send (`You Must Kick A Member In This Server`);
        const modembed = new Discord.MessageEmbed()
            .setTitle(`Kicked By ${message.author.tag}`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setAuthor(`Member Kicked`)
            .setDescription(`Member Kicked: ${message.mentions.users.first()}`)
            .addFields(
                {name: `Reason`, value: `${reason}`, inline: false}
            )
        const nomemberembed = new Discord.MessageEmbed() .setDescription(`${message.author}, You Couldn't Kick That Member`);
        const kickembed = new Discord.MessageEmbed()
        .setTitle(`Member Kicked`)
        .setColor(`${guildProfile.EmbedColor}`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
        .setDescription(`Kicked By: ${message.author}`)
        .addFields(
            {name: `Member Kicked:`, value: `${message.mentions.users.first()}`, inline: false},
            {name: `Reason:`, value: `${reason}`, inline: false}
        )
        const member = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(member.id);
        const dmEmbed = new Discord.MessageEmbed()
            .setTitle(`YOU HAVE BEEN KICKED FROM ${process.env.SERVERNAME}`)
            .setColor(`RED`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .setDescription(`You were kicked by ${message.author}`)
            .addFields(
                {name: `Reason:`, value: `${reason}`, inline: false}
            )
        if(member){
            try{
                try{
                    message.mentions.users.first().send(dmEmbed)
                } catch (err){
                 errorlog.send(`${err}`)
                }
            setTimeout(function(){
                memberTarget.kick();
                message.channel.send(kickembed);
                client.channels.cache.get(`${guildProfile.LogChannel}`).send(modembed);
                require('log-timestamp');
             }, 3000);
            } catch (err){
                message.channel.send(`You Have Not Set A Log Channel. ${message.guild.owner}, Please do ${guildProfile.prefix}setup to set up your channels.`)
                return;
            }

        }else{
            channel.send(`${message.author}, Cannot Kick that Member`)
        }
    }
}

// if(member){
//     message.mentions.users.first().send(`You Have Been Kicked From ${process.env.SERVERNAME}, Reason: ${reason}`)
//     memberTarget.kick();
//     message.channel.send(kickembed);
//     client.channels.cache.get(`${process.env.LOG}`).send(modembed);

// }else{
//     channel.send(`${message.author}, Cannot Kick that Member`)
// }
