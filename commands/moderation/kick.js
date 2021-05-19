module.exports = {
    name: 'kick',
    description: 'this command kicks a member',
    usage: `(user) (reason)`,
    // permissions:["MUTE_MEMBERS"],
    execute(client, message, args, Discord){
        let reason = args.slice(1).join(" ");
        if (!message.mentions.users) return message.channel.send(`${message.author}, You Must Mention A User Usage: ${process.env.PREFIX}kick (member) (reason)`)
        if (!message.member.hasPermission(`${process.env.KICKPERM}`)) return message.channel.send(`${message.author}, You Dont Not Have Permissions Missing: **KICK_MEMBERS**`);
        if (!reason) return message.channel.send(`You Have Not Stated A Reason Usage: ${process.env.PREFIX}kick (member) (reason)`);
        //if (message.mentions.users.first() !== guildMember) return message.channel.send (`You Must Kick A Member In This Server`);
        const modembed = new Discord.MessageEmbed()
            .setTitle(`Kicked By ${message.author.tag}`)
            .setColor(`${process.env.EMBEDCOLOR}`)
            .setAuthor(`Member Kicked`)
            .setDescription(`Member Kicked: ${message.mentions.users.first()}`)
            .addFields(
                {name: `Reason`, value: `${reason}`, inline: false}
            )
        const nomemberembed = new Discord.MessageEmbed() .setDescription(`${message.author}, You Couldn't Kick That Member`);
        const kickembed = new Discord.MessageEmbed()
        .setTitle(`Member Kicked`)
        .setColor(`${process.env.EMBEDCOLOR}`)
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
            message.mentions.users.first().send(dmEmbed)
            setTimeout(function(){
                memberTarget.kick();
                message.channel.send(kickembed);
                client.channels.cache.get(`${process.env.LOG}`).send(modembed);
                require('log-timestamp');
             }, 3000);

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
