const got = require(`got`);
const api = require(`imageapi.js`)
module.exports = {
    name: `cutedog`,
    description: `Display A Cute Dog`,
    usage: ``,
    aliases: [`doggie`, `dog`, `puppie`],
async execute(client, message, args, Discord,){
    const subreddits = [`DOG`,`PuppySmiles`, `Cutedogsreddit`, `dogpictures`];
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