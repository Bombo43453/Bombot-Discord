
const { Message, MessageEmbed} = require(`discord.js`)
const mongoose = require(`mongoose`);


module.exports = {
    name: `warns`,
    aliases: [`warnings`],
    description: `Check A User's Warnings`,
async execute(client, message, args, Discord){
    const db = require(`../../database/models/warns/`)
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You Do Not Have Permission To Use This Command`)
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nouser = new Discord.MessageEmbed() .setTitle(`User Not Found`) .addField(`Usage:`, `${process.env.prefix}warn (user/id)`)
    if(!user) return message.channel.send(nouser);
    const reason = args.slice(1).join(" ") || 'No Reason Provided';
    
    db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
        if(err) throw err;
        if(data){
            message.channel.send(new MessageEmbed()
                .setTitle(`${user.user.tag}'s warns`)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .setDescription(
                    data.content.map(
                        (w, i) =>
                        `\`${i + 1}\` | Warned By: ${message.guild.members.cache.get(w.moderator).user.tag || 'N/A' }\n Reason: ${w.reason || 'N/A'}`
                    )
                )
            )
        } else {
            const nodata = new Discord.MessageEmbed()
                .setTitle(`User Has No Data`)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .setDescription(`Make Sure The User Mentioned Has Been Warned Before`)
                .addField(`Usage`, `${process.env.PREFIX}warns (user)`)
            message.channel.send(nodata)
        }
    })
   
    }
}