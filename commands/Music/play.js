module.exports = {
    name: `play`,
    description: `Play A Song`,
    hidden: false,
    aliases: [`p`],
    usage: `(song)`,

async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const music = args.join(' ');
    if (!message.member.voice.channel) return message.channel.send(`Uh Oh - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(` You Are Not In The Same Voice Channel The Bot Is Currently In!`);

        if (!args[0]) return message.channel.send(`Uh Oh - Please indicate the title of a song !`);
    client.distube.play(message, args.join(' '))
}
}