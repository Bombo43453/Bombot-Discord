const Discord = require('discord.js');
const client = new Discord.Client();
const levels = require('discord-xp');
require('dotenv').config();
const fs = require('fs');
const mongoose = require('./database/mongoose');
const message = require('./events/message');

 DisTube = require('distube');
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
levels.setURL(`${process.env.DATABASE}`)
//const MusicClient = require('./struct/Client')
client.prefix = (`${process.env.PREFIX}`);
client.commands = new Discord.Collection

// const distube = require(`distube`)



const player = fs.readdirSync(`./player`).filter(file => file.endsWith('.js'));

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));


for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading Music Event ${file}`);
    const event = require(`./player/${file}`);
    distube.on(file.split(".")[0], event.bind(null, client));
};

mongoose.init()
client.login(`${process.env.TOKEN}`);
