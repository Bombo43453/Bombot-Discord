const Discord = require('discord.js');
const {
    Client
} = require('discord.js')
const client = new Client({
    partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'REACTION'],
})
require(`discord-buttons`)(client);
const levels = require('discord-xp');
require('dotenv').config();
const fs = require('fs');
const mongoose = require('./database/mongoose');
const message = require('./events/client/message');
// const SpotifyPlugin = require("@distube/spotify")
const fetch = require('node-fetch');

const {
    Player
} = require(`discord-player`)

//client.distube = new Distube(client, { searchSongs: false, emitNewSongOnly: false, leaveOnEmpty: true, leaveOnFinish: true, leaveOnStop: true,});
const Promise = require(`bluebird`)
levels.setURL(`${process.env.DATABASE}`)
client.player = new Player(client);
client.commands = new Discord.Collection
client.cooldowns = new Discord.Collection();
client.events = new Discord.Collection();
client.musicevents = new Discord.Collection();


['command_handler', 'event_handler', 'music_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})


mongoose.init()
client.login(`${process.env.TOKEN}`);