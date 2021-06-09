const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
// const file = require(`../commands`)
module.exports = (client, Discord, message) => {
    fs.readdirSync('./commands').forEach(dirs => {
        const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            const command = require(`../commands/${dirs}/${file}`);
            console.log(`Loading command ${file}`);
            if (command.name) {
                client.commands.set(command.name.toLowerCase(), command);
            } else {
                continue;
            }
        }
    });
}