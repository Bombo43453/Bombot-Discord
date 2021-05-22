const Discord = require('discord.js');
const {Client} = require('discord.js')
const client = new Client( {partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'REACTION'],})
const levels = require('discord-xp');
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

mongoose.init()
client.login(`${process.env.TOKEN}`);
