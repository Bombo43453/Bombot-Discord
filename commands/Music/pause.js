module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    usage: '',

    execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if (!message.member.voice.channel) return message.channel.send(`${message.author} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author} - You are not in the same voice channel the bot is currently in!`);

    //        if (!client.player.getQueue(message)) return message.channel.send(`${message.author} - No music currently playing !`);
       if(!message.guild.me.voice.channel) return message.channel.send(` I Am Not In A Voice Channel`)
        //if (client.player.getQueue(message).paused) return message.channel.send(`${message.author} - The music is already paused !`);

        if(client.distube.isPaused(message)) return message.channel.send(`Error - I am already Paused`);
        try{
            const success = client.distube.pause(message);

        if (success) message.channel.send(`${message.author} - Song paused !`);
            else {
                message.channel.send(`Error - I had Never Been Paused Or Am Already Paused`)
            }
        } catch (err){
            errorlog.send(`${err}`)
            message.channel.send(`Error - I had Never Been Paused Or Am Already Paused`)
        }
    },
};