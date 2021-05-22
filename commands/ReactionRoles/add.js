const Schema = require(`../../database/models/reactionrolesSchema`);
const { Util } = require(`discord.js`)
module.exports = {
    name: `addreaction`,
    aliases: [`reactionadd`],
    description: `Add A Reaction Role`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if(!message.member.permissions.has(`ADMINISTRATOR`)) return message.channel.send(`You Must Be An Administrator To Do This`);
        const role = message.mentions.roles.first();
        if(!role) return message.channel.send(`You Must Mention A Role. \n Usage: \`${guildProfile.prefix}addreaction (role) (reaction)\``)

        let[, emoji] = args
        if(!emoji) return message.reply(`Please Specify An Emoji/Reaction \n Usage: \`${guildProfile.prefix}addreaction (role) (reaction)\``)

        const parsedEmoji = Util.parseEmoji(emoji);

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    },
                ];
                await Schema.findOneAndUpdate({ Guild: message.guild.id }, data);
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Message: 0,
                    Roles: {
                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji,
                            },
                        ],
                    },
                }).save()
            }
            message.channel.send(`New Role Added \n Do: \`${guildProfile.prefix}panel\` To Get Reaction Role Panel`) 
        })
    }
}