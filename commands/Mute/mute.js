const ms = require('ms')
const {Message, MessageEmbed}= require('discord.js')
//const Schema = require('../../database/models/mute')
module.exports = {
    name: "mute",
    description: "Mute People",
    usage: `user`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const noperms = new Discord.MessageEmbed()
    .setTitle(`INVALID PERMISSIONS`)
    .setDescription(`${message.author}, you have invalid permissions`)
    .setFooter(` If you think this is a mistake, please make a ticket`)

    const norole = new Discord.MessageEmbed()
    .setTitle(`CREATING MUTED ROLE`)
    .setDescription(`This Is Happening Because I can't Find The Muted Role`)
    .setFooter(``)

    const roledone = new Discord.MessageEmbed()
    .setTitle(`Role Created`)

    const nomemberfound = new Discord.MessageEmbed()
        .setTitle(`Member Not Found`)
        .addFields(
            {name: `Usage:`, value: `${guildProfile.prefix}mute (user)`}
        )
    if(!message.member.hasPermission(`${guildProfile.MutePerm}`)) return message.channel.send(noperms)
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (Member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`You cannot warn an administrator.`)
        if(!Member) return message.channel.send(nomemberfound)
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send(norole)

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    })
                });
                message.channel.send(roledone)
            } catch (error) {
                console.log(error)
            }
        };

        const already = new Discord.MessageEmbed()
        .setColor(`${process.env.EMBEDCOLOR}`)
        .setTitle(`Member Already Muted`)
        .setDescription(`${message.author}, This Member Has Already Been Muted!`)
        .setFooter(`If You Think This Was A Mistake Make A Ticket`)

        const nowmuted = new Discord.MessageEmbed()
        .setTitle(`Member Muted`)
        .setColor(`${guildProfile.EmbedColor}`)
        .addFields(
            {name: `User Muted:`, value: `${Member.displayName}`, inline: false},
            {name: `Muted By:`, value: `${message.author}`, inline: false}
        )

        const DMembed = new Discord.MessageEmbed()
        .setTitle(`YOU HAVE BEEN MUTED`)
        .setColor(`${guildProfile.EmbedColor}`)
        .addFields(
            {name: `TIME:`, value: `THIS MUTE HAS NO LIMIT`, inline: false},
        )

        const LogEmbed = new Discord.MessageEmbed()
        .setTitle(`Member Muted!`)
        .setDescription(`Muted By: ${message.author}`)
        .setColor(`${guildProfile.EmbedColor}`)
        .addFields(
            {name: `Time`, value: `This Is Not A TempMute (This Mute Has No Limit!!)`},
            {name: `User Muted:`, value: `${Member}`}
        )

        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(already)
        await Member.roles.add(role2)
        // Schema.findOne({ Guild: message.guild.id}, async (err, data) => {
        //     if(!data) {
        //         new Schema ({
        //             Guild: message.guild.id,
        //             Users: Member.id
        //         }).save();
        //     }else {
        //         data.Users.push(Member.id);
        //         data.save();
        //     }
        // })
        //DATABASE ONLY ABOVE
        try{
            message.channel.send(nowmuted)
            require('log-timestamp');
            Member.send(DMembed)
            if (!isNaN(guildProfile.LogChannel)) {
                client.channels.cache.get(`${guildProfile.LogChannel}`).send(LogEmbed);
            }
            
        }catch (err){
            errorlog.send(`${err}`)
            return;
        }
    }
};
