const Discord = require('discord.js');
const unmute = require('../commands/Mute/unmute');
const DiscordStopSpam = require("discord-stop-spam");
const mongoose = require(`mongoose`)
const profileModel = require(`../database/models/profileSchema`)

module.exports = async (client, message) => {
    const errorlog = client.channels.cache.get(`${process.env.ERRORLOG}`)
    const botlog = client.channels.cache.get(`${process.env.LOG}`)
    const msglog = client.channels.cache.get(`${process.env.MSGLOG}`)
    if (message.author.bot) return;

    const logChannel = client.channels.cache.find(channel => channel.id === `${process.env.MSGLOG}`)
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
    try{
        profileData = await profileModel.findOne({userID: message.author.id })
        if(!profileData){
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 50,
                bank: 0,
            })
            profile.save()
        }
    }catch(err){
        console.log(`${err}`)
        errorlog.send(`${err}`)
    }
//Antispam
    await DiscordStopSpam.logAuthor(message.author.id); // Save message author
    await DiscordStopSpam.logMessage(message.author.id, message.content); // Save message content
    const SpamDetected = await DiscordStopSpam.checkMessageInterval(message); // Check sent messages interval
    if (SpamDetected) { // If SpamDetected
        const embed3 = new Discord.MessageEmbed()
            .setTitle(`Spam Caught`)
            .setColor(`BLUE`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .addFields({
                name: `Author:`,
                value: `${message.author}`,
                inline: true
            }, {
                name: `Channel`,
                value: `${message.channel}`,
                inline: true
            }, {
                name: `Content:`,
                value: `${message.content}`,
                inline: false
            })
        message.delete()
        DiscordStopSpam.warnUserEmbed(message).then(msg => {
            msg.delete({
                timeout: 5000
            })
        })
        client.channels.cache.get(`${process.env.MSGLOG}`).send(embed3);
    };

    //Message handler Below
    if (message.channel.type === 'dm') return;

   

    const prefix = `${process.env.PREFIX}`

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    
    if (cmd) cmd.execute(client, message, args, Discord, errorlog, botlog, msglog, profileData);
};