const Discord = require('discord.js');
const {Client} = require('discord.js')
const client = new Client( {partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'REACTION'],})
const levels = require('discord-xp');
const AntiSpam = require('discord-anti-spam');
require('dotenv').config();
const fs = require('fs');
const mongoose = require('./database/mongoose');
const message = require('./events/client/message');
// const SpotifyPlugin = require("@distube/spotify")
const fetch = require('node-fetch');
const { Player } = require(`discord-player`)
//client.distube = new Distube(client, { searchSongs: false, emitNewSongOnly: false, leaveOnEmpty: true, leaveOnFinish: true, leaveOnStop: true,});

levels.setURL(`${process.env.DATABASE}`)
client.player = new Player(client);
client.commands = new Discord.Collection
client.cooldowns = new Discord.Collection();



fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});
fs.readdirSync(`./events`).forEach(dirs => {
    const events = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith(`.js`))
    for (const file of events) {
        console.log(`Loading discord.js event ${file}`);
        const event = require(`./events/${dirs}/${file}`);
        client.on(file.split(".")[0], event.bind(null, client));
    }
});
const music = fs.readdirSync(`./music`).filter(file => file.endsWith(`.js`));



for (const file of music){
        console.log(`Loading Music Event: ${file}`);
        const event = require(`./music/${file}`);
        client.player.on(file.split(".")[0], event.bind(null, client));
    }

    const usersMap = new Map();

    const LIMIT = 5;
    const TIME = 7000;
    const DIFF = 3000;
    
    client.on('message', async(message) => {
        if(message.author.bot) return;
        if(usersMap.has(message.author.id)) {
            const userData = usersMap.get(message.author.id);
            const { lastMessage, timer } = userData;
            const difference = message.createdTimestamp - lastMessage.createdTimestamp;
            let msgCount = userData.msgCount;
            //console.log(difference);
    
            if(difference > DIFF) {
                clearTimeout(timer);
                console.log('Cleared Timeout');
                userData.msgCount = 1;
                userData.lastMessage = message;
                userData.timer = setTimeout(() => {
                    usersMap.delete(message.author.id);
                   // console.log('Removed from map.')
                }, TIME);
                usersMap.set(message.author.id, userData)
            }
            else {
                ++msgCount;
                if(parseInt(msgCount) === LIMIT) {
                    let muterole = message.guild.roles.cache.find(role => role.name === 'muted');
                    if(!muterole) {
                        try{
                            muterole = await message.guild.roles.create({
                                name : "muted",
                                permissions: []
                            })
                            message.guild.channels.cache.forEach(async (channel, id) => {
                                await channel.createOverwrite(muterole, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS : false
                                })
                            })
                        }catch (e) {
                            console.log(e)
                        }
                    }
                    message.member.roles.add(muterole);
                    message.channel.send('You have been muted For Spam, Continue And You Will Recieve A Bigger Mute Time!');
                    setTimeout(() => {
                        message.member.roles.remove(muterole);
                        message.channel.send('You have been unmuted!')
                    }, TIME);
                } else {
                    userData.msgCount = msgCount;
                    usersMap.set(message.author.id, userData);
                }
            }
        }
        else {
            let fn = setTimeout(() => {
                usersMap.delete(message.author.id);
            //    console.log(' [ANTISPAM] Removed from map.')
            }, TIME);
            usersMap.set(message.author.id, {
                msgCount: 1,
                lastMessage : message,
                timer : fn
            });
        }
    })


mongoose.init()
client.login(`${process.env.TESTTOKEN}`);
