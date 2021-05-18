const db = require(`../../database/models/warns`)
const { Message, MessageEmbed} = require(`discord.js`)
const mongoose = require(`mongoose`);


module.exports = {
    name: `warn`,
    aliases: [`warning`],
    description: `Warn A User`,
    usage: `(user) (reason)`,
async execute(client, message, args, Discord){
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You Do Not Have Permission To Use This Command`)
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nouser = new Discord.MessageEmbed() .setTitle(`User Not Found`) .addField(`Usage:`, `${process.env.prefix}warn (user/id)`)
        const nousers = new Discord.MessageEmbed()
            .setTitle(`User Not Found`)
            .setColor(`${process.env.EMBEDCOLOR}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .setDescription(`Make Sure You Mentioned A User In This Guild`)
            .addField(`Usage:`, `${process.env.PREFIX}warn (user) (reason)`)
    if(!user) return message.channel.send(nousers)
    const reason = args.slice(1).join(" ");
        const reasonembed = new Discord.MessageEmbed()
            .setTitle(`Invalid Usage`)
            .setColor(`${process.env.EMBEDCOLOR}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .addField(`Usage:`, `${process.env.PREFIX}warn (user) (reason)`)

    if(!reason){
        const noreason = new Discord.MessageEmbed()
            .setTitle(`No Reason Provided`)
            .setDescription(`Make Sure To Provide A Reason When Doing A Warning`)
            .addField(`Usage:`, `${process.env.PREFIX}warn (user) (reason)`)
            .setColor(`${process.env.EMBEDCOLOR}`)
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
        .setColor(`${process.env.EMBEDCOLOR}`)
        .addField(`Reason:`, `${reason}`)
        .addField(`Warned By:`, `${message.author}`)
        .setTimestamp()
    )
    const embedy = new Discord.MessageEmbed()
        .setTitle(`User Warned`)
        .setColor(`${process.env.EMBEDCOLOR}`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
        .addField(`User Warned:`, `${user}`, true)
        .addField(`Warned By:`, `${message.author}`, true)
        .addField(`Reason:`, `${reason}`, false)
        .setTimestamp()
        message.channel.send(embedy)
        client.channels.cache.get(`${process.env.LOG}`).send(embedy)
    }
}