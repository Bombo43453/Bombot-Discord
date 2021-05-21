const Schema = require(`../../database/models/reactionrolesSchema`);
const { Util } = require(`discord.js`)
module.exports = {
    name: `reactionpanel`,
    aliases: [`panel`],
    description: `Reaction Roles Panel`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if(!message.member.permissions.has(`ADMINISTRATOR`)) return message.channel.send(`You Must Be An Administrator To Do This`);
      
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.reply(`There Is No Data Here, To Start A Reaction Role Do \`${guildProfile.prefix}reactionadd\``);
            const mapped = Object.keys(data.Roles)
                .map((value, index) => {
                    const role = message.guild.roles.cache.get(
                        data.Roles[value][0]
                    );
                    return `${index + 1}) ${data.Roles[value][1].raw} - ${role}`
                }).join(`\n\n`)

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Reaction Roles Panel`)
                    .setColor(`${guildProfile.EmbedColor}`)
                    .setDescription(mapped)
                    .setThumbnail(`${process.env.SERVERLOGO}`)
                channel
               .send(embed)
               .then((msg) => {
                   data.Message = msg.id
                   data.save();

                   const reactions = Object.values(data.Roles).map(
                       (val) => val[1].id ?? val[1].raw
                   );
                   reactions.map((emoji) => msg.react(emoji));
               })
        })
    }
}