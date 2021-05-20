const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "suggest",
    description: "make a suggestion",
    usage: `Suggestion`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const suggestionQuery = args.join(" ")
    if(!suggestionQuery) return message.reply(' Please Specify A Suggestion!')
        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
            .setDescription(`**Suggestion:** ${suggestionQuery}`)
            .setColor('ORANGE')
            .setTimestamp()
            .addField("Status", 'PENDING')
try{
             // THE ID IS THE SUGGESTION CHANNEL CHANGE THAT 
            message.guild.channels.cache.get(`${guildProfile.SuggestChannel}`).send(embed).then(message => {
                message.react(`:thumbsdown:`)
                    .then(() => {
                        message.react(`:thumbsup:`)
                    })
            });
            message.channel.send(`Submitted Suggestion Check <#${guildProfile.SuggestChannel}>`)
        } catch (err){
            console.log(err)
            message.channel.send(`Error.. You Have Not Set A Suggestion Channel ${message.guild.owner}, please do ${guildProfile.prefix}settings to set this up`)
        }
    },
};
