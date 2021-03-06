const {
    ReactionPages
} = require(`reconlx`)
const {
    Client,
    Message,
    MessageEmbed
} = require(`discord.js`)

module.exports = {
    name: `members`,
    aliases: [`memberjoinlb`],
    description: (`check the position you are in as a member`),
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        const members = message.guild.members.cache
            .filter((m) => !m.user.bot)
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)

        const arrayOfMembers = members.array();
        const ids = [];
        arrayOfMembers.forEach((mem) => {
            ids.push(mem.user.id);
        })
        let index = 1;
        if(ids.length > 10){
            const chunks = convertChunk(ids, 10)
            const arry = []
            for (chunk of chunks){
                const description = chunk.map((v) => `#${index++} **${message.guild.members.cache.get(v).user.tag}**`);
                arry.push(
                    new MessageEmbed()
                        .setTitle(`Join Leaderboard in ${message.guild.name}`)
                        .setDescription(description)
                        .setColor(`${guildProfile.EmbedColor}`)
                        .setThumbnail(`${process.env.SERVERLOGO}`)

                )
            }
            ReactionPages(message, arry, true)
        } else {
            const description = ids.map((v) => `#${index++} **${message.guild.members.cache.get(v).user.tag}**`);
            message.channel.send(
                new MessageEmbed()
                .setTitle(`Join Leaderboard in ` + message.guild.name)
                .setDescription(description)
                .setColor(`${guildProfile.EmbedColor}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
            )
        }
    }
}
function convertChunk(arr, size) {
    const array = []
    for (let i = 0; i< arr.length; i+= size){
        array.push(arr.slice(i, i+size))
    }
    return array;
}