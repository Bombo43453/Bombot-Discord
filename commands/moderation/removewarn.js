

const mongoose = require(`mongoose`);

module.exports = {
    name: `removewarning`,
    aliases: [`rmvwarn`, `removewarn`, `deletewarning`, `rmvwarning`],
    hidden: true,
    description: `Remove A Warning (Make sure to check the warning number with ${process.env.PREFIX}warns (user) )`,
    usage: `(user) (Warning Number)`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const db = require(`../../database/models/Warns`)
    if(!message.member.hasPermission(`${guildProfile.WarnPerm}`)) return message.channel.send(`You Do Not Have Permission To Use This Command`)
    const user = message.mentions.members.first() || message.guild.member.cache.get(args[0]);
        const nouser = new Discord.MessageEmbed()
            .setTitle(`User Not Found`)
            .setColor(`BLUE`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .setDescription(`Make Sure This User Has Been Warned Before`)
            .addField(`Usage`, `${guildProfile.prefix}removewarning (user) (warning number)`)
    if(!user) return message.channel.send(nouser)
    db.findOne({ guildid : message.guild.id, user: user.user.id}, async (err, data) => {
        if(err) throw err;
        if(data){
            let number = parseInt(args[1]) - 1
        if(isNaN(number)){
            const nonum = new Discord.MessageEmbed()
                .setTitle(`Warning Not Mentioned`)
                .setColor(`${guildPrfoile.EmbedColor}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .setDescription(`Make Sure You Mention The Warning. Each Warning Comes With A Number
And you can check the number with ${guildProfile.prefix}warns user`)
                .addField(`Usage`, `${guildProfile.prefix}removewarning (user) (Warning Number)`)
            message.channel.send(nonum)
            return;
        }
            data.content.splice(number, 1)
            const removeembed = new Discord.MessageEmbed()
                .setTitle(`Removed Warning`)
                .setColor(`${guildProfile.EmbedColor}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .addField(`Removed By:`, `${message.author}`, true)
                .addField(`User:`, `${user}`, true)
                .setTimestamp()
            message.channel.send(removeembed)
            if (!isNaN(guildProfile.LogChannel)) {
                client.channels.cache.get(`${guildProfile.LogChannel}`).send(removeembed)
            }
            data.save()
        } else {
            const elsy = new Discord.MessageEmbed()
                .setTitle(`User Not Found`)
                .setDescription(`Make Sure The User Has Been Warned, Or Run This Command In The Server They Were Warned In`)
                .addField(`Usage`, `${guildProfile.prefix}removewarning (user) (warning number)`)
                .setColor(`${guildProfile.EmbedColor}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
            message.channel.send(elsy)
        }
    })
    }
}