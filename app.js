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
const Distube = require(`distube`)
client.distube = new Distube(client, { searchSongs: false, emitNewSongOnly: false, leaveOnEmpty: true, leaveOnFinish: true, leaveOnStop: true,});

levels.setURL(`${process.env.DATABASE}`)


    client.distube.on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}}`
    ));
    client.distube.on(`empty`, message => message.channel.send(`Channel is empty, I am leaving this channel`));

    client.distube.on(`error`, (message, err) => message.channel.send(`An error has been encountered, Please report the following error with (prefix)botbug \n Error:  \n` + err ));

    client.distube.on("finish", message => message.channel.send("No more song in queue"));

    client.distube.on(`noRelated`, message => message.channel.send(`Cannot Find A Related Video To Play. Stopped Playing Music`));

    const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``

    client.distube.on("playList", (message, queue, playlist, song) => message.channel.send(
    `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ));

    client.distube.on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ));

    client.distube.on("addSong", (message, queue, song) => message.channel.send(
        `Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ));

    client.distube.on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 100;
    });

    client.distube.on("noRelated", message => message.channel.send("Can't find related video to play. Stopped playing music."));

    client.distube.on("searchCancel", (message) => message.channel.send(`Searching canceled`));

    client.distube.on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    });

    

client.commands = new Discord.Collection





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
        client.distube.on(file.split(".")[0], event.bind(null, client));
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
client.login(`${process.env.TOKEN}`);
