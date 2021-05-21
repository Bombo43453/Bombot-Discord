const DisTube = require("distube");

module.exports = {
    name: `shuffle`,
    description: `Shuffle a playlist`,
    hidden: false,
    aliases: [`sh`],
    usage: ``,

async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    if(!message.guild.me.voice.channel) return message.channel.send(` I Am Not In A Voice Channel`)

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(` You Are Not In The Same Voice Channel The Bot Is Currently In!`);

    client.distube.shuffle(message)
    message.channel.send(`${message.author} - I have shuffled the queue`)
    }
}