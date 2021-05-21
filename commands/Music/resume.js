module.exports = {
    name: 'resume',
    aliases: [`re`],
    category: 'Music',
    usage: '',

    execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if (!message.member.voice.channel) return message.channel.send(`${message.author} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author} - You are not in the same voice channel the bot is currently in!`);

    //        if (!client.player.getQueue(message)) return message.channel.send(`${message.author} - No music currently playing !`);
       if(!message.guild.me.voice.channel) return message.channel.send(` I Am Not In A Voice Channel`)
        //if (client.player.getQueue(message).paused) return message.channel.send(`${message.author} - The music is already paused !`);

        try{
            const success = client.distube.resume(message);
            
        if (success) message.channel.send(`${message.author} - Song Resumed`);
            else {
                message.channel.send(`I was never paused`)
            }
        } catch (err){
            errorlog.send(`${err}`)
            message.channel.send(`I was never paused`)
        }
    },
};