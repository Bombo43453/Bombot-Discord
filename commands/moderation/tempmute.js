const ms = require('ms')
const {Message, MessageEmbed}= require('discord.js')
module.exports = {
    name: "tempmute",
    description: "Mute People",
async execute(client, message, args, Discord){
    const noperms = new Discord.MessageEmbed()
    .setTitle(`INVALID PERMISSIONS`)
    .setDescription(`${message.author}, you have invalid permissions`)
    .setFooter(` If you think this is a mistake, please make a ticket`)
    .setColor(`${process.env.EMBEDCOLOR}`)

    const nomemberfound = new Discord.MessageEmbed()
        .setTitle(`Member Not Found`)
        .addFields(
            {name: `Usage:`, value: `${process.env.PREFIX}tempmute (user) (time)`}
        )


    const noTIMEembed = new Discord.MessageEmbed()
    .setTitle(`Please Specify A Time `)
    .addFields(
     {name: `Usage:`, value: `${process.env.PREFIX}tempmute (user) (time)`},
    )


    const norole = new Discord.MessageEmbed()
    .setTitle(`CREATING MUTED ROLE`)
    .setDescription(`This Is Happening Because I can't Find The Muted Role`)
    .setFooter(`If THIS IS A MISTAKE, CONTACT B.MITCHELL (Bombo43453#1901)`)

    const roledone = new Discord.MessageEmbed()
    .setTitle(`Role Created`)

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(noperms)
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const time = args[1]
    if(!Member) return message.channel.send(nomemberfound)
    if(!time) return message.channel.send(noTIMEembed)
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
                    ADD_REACTIONS: false
                })
            });
            message.channel.send(roledone)
        } catch (error) {
            console.log(error)
        }
    };

    const already = new Discord.MessageEmbed()
        .setTitle(`Member Already Muted`)
        .setDescription(`${message.author}, ${Member.displayName}, Has Already Been Muted!`)
        .setFooter(`If You Think This Was A Mistake Make A Ticket`)
        .setColor(`${process.env.EMBEDCOLOR}`)

    const nowmuted = new Discord.MessageEmbed()
        .setTitle(`Member Muted`)
        .setColor(`${process.env.EMBEDCOLOR}`)
        .addFields(
            {name: `User Muted:`, value: `${Member.displayName}`, inline: false},
            {name: `Muted By:`, value: `${message.author}`, inline: false}
        )

     const DMembed = new Discord.MessageEmbed()
        .setTitle(`YOU HAVE BEEN MUTED`)
        .setColor(`RED`)
        .addFields(
            {name: `TIME:`, value: `${time}`, inline: false},
            {name: `Appeal Here:`, value: `https://discord.gg/sbYhAmuCZX`, inline: false}
        )

     const LogEmbed = new Discord.MessageEmbed()
        .setTitle(`Member Muted!`)
        .setDescription(`Muted By: ${message.author}`)
        .setColor(`${process.env.EMBEDCOLOR}`)
        .addFields(
            {name: `Time`, value: `${time}`, inline: false},
            {name: `User Muted:`, value: `${Member}`, inline: false}
        )

    const UnmuteEmbed = new Discord.MessageEmbed()
    .setTitle(`Member Unmuted`)
    .setColor(`${process.env.EMBEDCOLOR}`)
    .addFields(
        {name: `Unmuted Member:`, value: `${Member.tag}`, inline: false},
        {name: `Time Muted For:`, value: `${time}`, inline: false}
    )

    const UnMuteDM = new Discord.MessageEmbed()
    .setTitle(`After ${time}, You Have Been Unmuted From ICRP`)
    .setDescription(`Please Do Not Try To Redo Your Offense As It Can Lead To A Ban`)

    let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
    if(Member.roles.cache.has(role2.id)) return message.channel.send(already)
    await Member.roles.add(role2)
    message.channel.send(nowmuted)
    client.channels.cache.get(`${process.env.LOG}`).send(LogEmbed);
    require('log-timestamp');
        console.log(`MEMBER MUTED
MEMBER: ${Member},
MUTED BY: ${message.author.tag},
TIME: ${time}`)

    setTimeout(async () => {
        await Member.roles.remove(role2)
        Member.send(UnMuteDM)
        client.channels.cache.get(`${process.env.LOG}`).send(UnmuteEmbed)

    }, ms(time));

    }
}
