const { MessageEmbed } = require('discord.js');
const db = require('../../database/models/warns')


module.exports = {
    name: `removewarning`,
    aliases: [`rmvwarn`, `removewarn`, `deletewarning`, `rmvwarning`],
    description: `Remove A Warning`,
async execute(client, message, args, Discord){
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You Do Not Have Permission To Use This Command`)
    const user = message.mentions.members.first() || message.guild.member.cache.get(args[0]);
        const nouser = new Discord.MessageEmbed()
            .setTitle(`User Not Found`)
            .setColor(`BLUE`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .setDescription(`Make Sure This User Has Been Warned Before`)
            .addField(`Usage`, `${process.env.PREFIX}removewarning (user) (warning number)`)
    if(!user) return message.channel.send(nouser)
    db.findOne({ guildid : message.guild.id, user: user.user.id}, async (err, data) => {
        if(err) throw err;
        if(data){
            let number = parseInt(args[1]) - 1
        if(isNaN(number)){
            const nonum = new Discord.MessageEmbed()
                .setTitle(`Warning Not Mentioned`)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .setDescription(`Make Sure You Mention The Warning. Each Warning Comes With A Number
And you can check the number with ${process.env.PREFIX}warns user`)
                .addField(`Usage`, `${process.env.PREFIX}removewarning (user) (Warning Number)`)
            message.channel.send(nonum)
            return;
        }
            data.content.splice(number, 1)
            const removeembed = new Discord.MessageEmbed()
                .setTitle(`Removed Warning`)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .addField(`Removed By:`, `${message.author}`, true)
                .addField(`User:`, `${user}`, true)
                .setTimestamp()
            message.channel.send(removeembed)
            client.channels.cache.get(`${process.env.LOG}`).send(removeembed)
            data.save()
        } else {
            const elsy = new Discord.MessageEmbed()
                .setTitle(`User Not Found`)
                .setDescription(`Make Sure The User Has Been Warned, Or Run This Command In The Server They Were Warned In`)
                .addField(`Usage`, `${process.env.PREFIX}removewarning (user) (warning number)`)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
            message.channel.send(elsy)
        }
    })
    }
}