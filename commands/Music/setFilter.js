module.exports = {
    name: `setFilter`,
    description: `Set A Filter To A Song`,
    usage: `filter`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if (!message.member.voice.channel) return message.channel.send(`${message.author} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author} - You are not in the same voice channel the bot is currently in!`);


        const command = args.shift();
    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = client.distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
    }

}