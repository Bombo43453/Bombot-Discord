const axios = require('axios');
const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "urbandictionary",
    aliases: ['urbandic', 'urban'],
    description: "looks up a work on the Urban Dictionary",
    usage: `Word`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {

        try {
            let query = args.join(" ")
            if (!query) message.reply(' Please Specify A Word To Search For');

            query = encodeURIComponent(query);

            const {
                data: {
                    list
                },
            } = await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`)

            const [answer] = list;
            message.channel.send(
                new MessageEmbed()
                .setTitle(answer.word)
                .setURL(answer.permalink)
                .setColor(`${guildProfile.EmbedColor}`)
                .addField("DEFINITION", trim(answer.definition))
                .addField("EXAMPLE", trim(answer.example))
                .addField("RATINGS", `${answer.thumbs_up} 👍 || ${answer.thumbs_down} 👎`)
            );

            function trim(input) {
                return input.length > 1024 ? `${input.slice (0, 1020)}...` : input;

            }
        } catch (err) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`🔴 An Error Has Occured 🔴`)
                .setDescription(`This Is Most Likely Due To The Term You Put Not Existing`)
                .setColor(`RED`)
            message.channel.send(embed)
        }
    }
}