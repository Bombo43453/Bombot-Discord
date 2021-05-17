const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "suggest",
    description: "make a suggestion",
    usage: `Suggestion`,
async execute(client, message, args, Discord){
    const suggestionQuery = args.join(" ")
    if(!suggestionQuery) return message.reply(' Please Specify A Suggestion!')
        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
            .setDescription(`**Suggestion:** ${suggestionQuery}`)
            .setColor('ORANGE')
            .setTimestamp()
            .addField("Status", 'PENDING')

            message.channel.send('Submitted Suggestion Check <#836322596105748580>') // THE ID IS THE SUGGESTION CHANNEL CHANGE THAT 
            message.guild.channels.cache.get(`${process.env.SUGGEST}`).send(embed).then(message => {
                message.react(`${process.env.UPVOTE}`)
                    .then(() => {
                        message.react(`${process.env.DOWNVOTE}`)
                    })
            });
    },
};
