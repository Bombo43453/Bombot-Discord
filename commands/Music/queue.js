const DisTube = require("distube");

module.exports = {
    name: `queue`,
    description: `Show Song Lyrics`,
    hidden: false,
    aliases: [`qu`],
    usage: ``,

async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    if(!message.guild.me.voice.channel) return message.channel.send(` I Am Not In A Voice Channel`)

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(` You Are Not In The Same Voice Channel The Bot Is Currently In!`);
    let currentPage = 0;
    let queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send(`There is nothing currently playing`)
  //  let queue = distube.getQueue(message);
  const embed = new Discord.MessageEmbed()
    .setTitle(`Current Queue:`)
    .setColor(`${guildProfile.EmbedColor}`)
    .setThumbnail(`${process.env.SERVERLOGO}`)
    .setDescription(queue.songs.map((song, id) =>
    `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
).join(`\n`))
    message.channel.send(embed)
} 
    }
