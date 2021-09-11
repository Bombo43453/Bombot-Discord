const { MessageEmbed } = require('discord.js');

const mongoose = require(`mongoose`);


module.exports = {
    name: `clearwarning`,
    aliases: [`clearwarn`, `clearwarns`, `remove-all-warns`, `clearwarnings`],
    description: `Clear All Of A User's Warnings`,
 //   hidden: true,
    usage: `(user) (reason)`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const db = require(`../../database/models/Warns`)
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You Do Not Have Permission To Use This Command (Only Administrators can Clear Warnings)`)
    
        const nouser = new Discord.MessageEmbed()
            .setTitle(`User Not Found`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .setDescription(`Make Sure This User Has Been Warned Before`)
            .addField(`Usage`, `${guildProfile.prefix}clearwarnings (user) (reason)`)
    if(!user) return message.channel.send(nouser)
    const reason = args.slice(1).join(' ') || `No Reason Provided`;
    db.findOne({ guildid : message.guild.id, user: user.user.id}, async (err, data) => {
        if(err) throw err;
        if(data){
            await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id })
            const clearembed = new Discord.MessageEmbed()
                .setTitle(`Warnings Cleared`)
                .setColor(`${guildProfile.EmbedColor}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .addField(`Cleared By:`, `${message.author}`, true)
                .addField(`User Cleared:`, `${user}`, true)
                .addField(`Reason:`, `${reason}`)
                .setTimestamp()
            message.channel.send(clearembed)
            
            if (!isNaN(guildProfile.LogChannel)){
                client.channels.cache.get(`${guildProfile.LogChannel}`).send(logembed)
            }
            
            
        } else {
            const elsy = new Discord.MessageEmbed()
                .setTitle(`User Not Found`)
                .setDescription(`Make Sure The User Has Been Warned, Or Run This Command In The Server They Were Warned In`)
                .addField(`Usage`, `${guildProfile.prefix}clearwarnings (user) (reason)`)
                .setColor(`${guildProfile.EmbedColor}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
            message.channel.send(elsy)
        }
    })
    }
}