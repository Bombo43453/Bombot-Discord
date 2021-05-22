const Discord = require('discord.js');
const unmute = require('../../commands/Mute/unmute');
const mongoose = require(`mongoose`)
const profileModel = require(`../../database/models/profileSchema`)
const Guild = require(`../../database/models/guildSchema`)
const Levels = require('discord-xp');

module.exports = async (client, message) => {
    if (message.author.bot) return;
    let guildProfile = await Guild.findOne({
        guildID: message.guild.id,
    })
    if (!guildProfile) {
        const creating = new Discord.MessageEmbed()
            .setTitle(`Creating Settings Profile...`)
            .setDescription(`Once This Is Ready, Run .setup To Set Up...`)
            .setColor(`${process.env.EMBEDCOLOR}`)
        const createmsg = await message.channel.send(creating)
        guildProfile = await new Guild({
            guildID: message.guild.id,
            guildName: message.guild.name,
        });
        await guildProfile.save().catch(err => console.log(err) && message.channel.send(`${err}`) && message.channel.send(`An Error Has Occured, Please make a bug report with (prefix)botbug`))
        createmsg.reply(`Profile Made.`)
    }
    if (message.member.roles.cache.some(role => role.name === 'MUTED') || (message.member.roles.cache.some(role => role.name === 'muted'))) {
        message.delete()
        message.member.send(`You Are Muted`)
        return;
      }
    const errorlog = client.channels.cache.get(`${process.env.ERRORLOG}`)
    const logChannel = client.channels.cache.find(channel => channel.id === `${guildProfile.LogChannel}`)
    let words = ["Roblox", "I'm Leaving", "nibba", "faggot", "fag", "nigger", "nigga", "beaner", "niglet", "anal", "jack off", "ni88a", "jerk off", "I'm hard", "Jerk me ", "ICRP IS SHIT"]
    //ADD TO THE WORDS ABOVE, FOLLOW FORMAT


    let foundinText = false;
    for (var i in words) {
        if (message.content.toLowerCase().includes(words[i].toLowerCase())) foundinText = true;
    }

    if (foundinText) {
        let logEmbed = new Discord.MessageEmbed()
            .setDescription(`**A Blacklisted Word Was Said**`)
            .addFields({
                name: `Author:`,
                value: `${message.author} -(${message.author.id})`,
                inline: true
            }, {
                name: `Channel:`,
                value: `${message.channel}`,
                inline: true
            }, {
                name: `Guild/Server:`,
                value: `${message.guild.name}`,
                inline: true
            }, {
                name: `Message:`,
                value: `${message.content}`,
                inline: false
            })
            .setColor('RED')
            .setTimestamp()
        logChannel.send(logEmbed)

        let embed = new Discord.MessageEmbed()
            .setTitle(`You Said A Blacklisted Word`)
            .setDescription(`This Word Is Not Permitted, You Have Been Reported `)
            .setColor('RED')
            .setTimestamp()
        let msg = await message.channel.send(embed);
        message.delete()
        msg.delete({
            timeout: '5000'
        })
    };


    let profileData;
    // try{
    //     profileData = await profileModel.findOne({userID: message.author.id, serverID: message.guild.id })
    //     if(!profileData){
    //         let profile = await profileModel.create({
    //             userID: message.author.id,
    //             serverID: message.guild.id,
    //             coins: 50,
    //             bank: 0,
    //         })
    //         profile.save()
    //     }
    // }catch(err){
    //     console.log(`${err}`)
    // }
//SUPA SPECIAL BELOW

client.emit(`checkMessage`, message);
if (message.channel.type === 'dm') return;
//XP BELOW
const randomXP = Math.floor(Math.random() * 29) + 1; //1-30
const hasLeveledUP = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
if (hasLeveledUP) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(`${message.member}, you have proceeded to level ${user.level}.`)
}


    //Message handler Below


   
    
        
        const botlog = client.channels.cache.get(`${guildProfile.LogChannel}`)
        const msglog = client.channels.cache.get(`${guildProfile.MessageLog}`)

        const prefix = guildProfile.prefix
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    
    if (cmd) cmd.execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile);
};