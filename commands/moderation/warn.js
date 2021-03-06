
const { Message, MessageEmbed} = require(`discord.js`)
const mongoose = require(`mongoose`);


module.exports = {
    name: `warn`,
    aliases: [`warning`],
 //   hidden: true,
    description: `Warn A User`,
    usage: `(user) (reason)`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const db = require(`../../database/models/Warns`)
    if(!message.member.hasPermission(`${guildProfile.WarnPerm}`)) return message.channel.send(`You Do Not Have Permission To Use This Command`)
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nousers = new Discord.MessageEmbed()
            .setTitle(`User Not Found`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .setDescription(`Make Sure You Mentioned A User In This Guild`)
            .addField(`Usage:`, `${guildProfile.prefix}warn (user) (reason)`)
    if(!user) return message.channel.send(nousers)
   if (user.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`You cannot warn an administrator.`)
    const nouser = new Discord.MessageEmbed() .setTitle(`User Not Found`) .addField(`Usage:`, `${guildProfile.prefix}warn (user/id)`)
        
    const reason = args.slice(1).join(" ");
        const reasonembed = new Discord.MessageEmbed()
            .setTitle(`Invalid Usage`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .addField(`Usage:`, `${guildProfile.prefix}warn (user) (reason)`)

    if(!reason){
        const noreason = new Discord.MessageEmbed()
            .setTitle(`No Reason Provided`)
            .setDescription(`Make Sure To Provide A Reason When Doing A Warning`)
            .addField(`Usage:`, `${guildProfile.prefix}warn (user) (reason)`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
        message.channel.send(noreason)
        return;
    } 
    
    db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
        if(err) throw err;
        if(!data) {
            data = new db({
                guildid: message.guild.id,
                user : user.user.id,
                content : [
                    {
                        moderator : message.author.id,
                        reason : reason
                    }
                ]
            })
        } else {
            const obj = {
                moderator: message.author.id,
                reason : reason
            }
            data.content.push(obj)
        }
        data.save()
    });
    user.send(new MessageEmbed()
        .setTitle(`You Have Been Warned`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
        .setColor(`${guildProfile.EmbedColor}`)
        .addField(`Reason:`, `${reason}`)
        .addField(`Warned By:`, `${message.author}`)
        .setTimestamp()
    )
    const embedy = new Discord.MessageEmbed()
        .setTitle(`User Warned`)
        .setColor(`${guildProfile.EmbedColor}`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
        .addField(`User Warned:`, `${user}`, true)
        .addField(`Warned By:`, `${message.author}`, true)
        .addField(`Reason:`, `${reason}`, false)
        .setTimestamp()
        message.channel.send(embedy)
        try{
            if (!isNaN(guildProfile.LogChannel)) {
                client.channels.cache.get(`${guildProfile.LogChannel}`).send(embedy)
            }
        } catch (err){
            return;
        }
        
    }
}