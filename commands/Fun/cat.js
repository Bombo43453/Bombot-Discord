const got = require(`got`);
const api = require(`imageapi.js`)
module.exports = {
    name: `cutecat`,
    description: `Display A Meme`,
    aliases: [`kitten`, `cat`],
async execute(client, message, args, Discord){
    const subreddits = [`cat`, `cats`];
    const subreddit = subreddits[Math.floor(Math.random() * (subreddits.length))];
    const meme = await api.advanced(subreddit);
    
    const embed = new Discord.MessageEmbed()
        .setTitle(`${subreddit}`)
        .setURL(`https://reddit.com/r/${subreddit}`)
        .setDescription(`Posted by u/**${meme.author}**`)
        .setImage(meme.img)
        .setColor(`${process.env.EMBEDCOLOR}`)
        .setFooter(`👍 ${meme.upvotes}  👎 ${meme.downvotes} (If image did not load, try again)`)
    message.channel.send(embed)

    }
}