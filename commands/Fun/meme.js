const got = require(`got`);
const api = require(`imageapi.js`)
module.exports = {
    name: `meme`,
    aliases: [`memes`],
    description: `Display A Meme`,
    usage: ``,
async execute(client, message, args, Discord){
    const subreddits = ['meme', 'dankmemes', 'memes',];
    const subreddit = subreddits[Math.floor(Math.random() * (subreddits.length))];
    const meme = await api.advanced(subreddit);
    
    const embed = new Discord.MessageEmbed()
        .setTitle(`r/${subreddit}`)
        .setURL(`https://reddit.com/r/${subreddit}`)
        .setDescription(`${meme.upvoteRatio}% of people liked this. Posted by u/**${meme.author}**`)
        .setImage(meme.img)
        .setColor(`${process.env.EMBEDCOLOR}`)
        .setFooter(`👍 ${meme.upvotes}  👎 ${meme.downvotes}`)
    message.channel.send(embed)

    }
}