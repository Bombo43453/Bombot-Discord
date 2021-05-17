const moment = require('moment');
const Commando = require(`discord.js-commando`);
const { stripIndents } = require("common-tags");
module.exports =  {
    name: 'whois',
    description: `Shows info bout a guy`,
    usage: `User`,
async execute(client, message, args, Discord){
        const { guild, channel } = message
        const user = message.mentions.users.first() || message.member.user;
        const member = guild.members.cache.get(user.id)

        if (member.presence.status === 'dnd') member.presence.status = 'Do Not Disturb';
        if (member.presence.status === 'online') member.presence.status = 'Online';
        if (member.presence.status === 'idle') member.presence.status = 'Idle';
        if (member.presence.status === 'offline') member.presence.status = 'Offline';

        let status = member.presence.status || 'N/A';

    const members = message.guild.members.cache
        .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
        .array()
    const position = new Promise((ful) => {
        for (let i = 1; i < members.length + 1; i++) {
            if(members[i - 1].id === member.id) ful(i)
        }
    })

        const embed = new Discord.MessageEmbed()
        .setAuthor(`User Info For ${user.username}`, user.displayAvatarURL())
        .setColor(`${process.env.EMBEDCOLOR}`)
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL())
        .addFields(
            {name: `Username:`, value: `${user.username}`, inline: true},
            {name: `User ID:`, value: `${user.id}`, inline: true},
            {name: `Nickname:`, value: member.nickname || 'N/A' , inline: true},
            {name: `Status:`, value: `${status}`, inline: true},
            {name: `Playing:`, value: `${member.presence.game ?`🎮 ${member.presence.game.state}` : "N/A"}`, inline: true },
            {name: `Registered:`, value:  new Date(user.createdTimestamp).toLocaleDateString(), inline: true},
            {name: `Joined At:`, value:  new Date(member.joinedTimestamp).toLocaleDateString(), inline: true},
            {name: `Join Position:`, value: `${await position}`, inline: true},
            {name: `Roles (${member.roles.cache.size -1}):`, value: member.roles.cache.map(r => r).join(' ** | ** '), inline: false},
        )
        // if (user.user.presence.game) 
        //     embed.addField(`Currently playing`, stripIndents`**> Name:** ${member.user.presence.game.name}`);
          channel.send(embed)
        
            
    }
    }
