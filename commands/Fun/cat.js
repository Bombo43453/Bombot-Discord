const got = require(`got`);
const api = require(`imageapi.js`)
module.exports = {
    name: `cutecat`,
    description: `Show A Kitten`,
    aliases: [`kitten`, `cat`],
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const subreddits = [`cat`, `cats`];
    const subreddit = subreddits[Math.floor(Math.random() * (subreddits.length))];
    const meme = await api.advanced(subreddit);
    
    const embed = new Discord.MessageEmbed()
        .setTitle(`${subreddit}`)
        .setURL(`https://reddit.com/r/${subreddit}`)
        .setDescription(`Posted by u/**${meme.author}**`)
        .setImage(meme.img)
        .setColor(`${guildProfile.EmbedColor}`)
        .setFooter(`👍 ${meme.upvotes}  👎 ${meme.downvotes} (If image did not load, try again)`)
    message.channel.send(embed)

    }
}