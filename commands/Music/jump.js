const { execute } = require("./stop");

module.exports = {
    name: `jump`,
    description: `Jump To A Specific Song In The Queue`,
    usage: `(number)`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    if (!message.member.voice.channel) return message.channel.send(`${message.author} - You're not in a voice channel !`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author} - You are not in the same voice channel the bot is currently in!`);

    if(isNaN(args[0])) return message.channel.send(`Song Mentioned Must Be A Number Usage: ${guildProfile.prefix}jump (song number in queue)`)
    try{
        client.distube.jump(message, parseInt(args[0]))
    } catch (err){
        errorlog.send(`${err}`)
        message.channel.send(`Song Must Be A Valid Number`)
    }
}
}