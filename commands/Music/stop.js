const { Client } = require("discord.js-commando")
const DisTube = require("distube")

module.exports = {
    name: `Stop`,
    description: `Stop A Song`,
    hidden: false,
    aliases: [``],
    usage: ``,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    if(!message.guild.me.voice.channel) return message.channel.send(` I Am Not In A Voice Channel`)

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(` You Are Not In The Same Voice Channel The Bot Is Currently In!`);

    client.distube.stop(message)
    message.channel.send(`Music Has Been Stopped`)
}
}