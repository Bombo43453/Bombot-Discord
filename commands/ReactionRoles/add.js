const Schema = require(`../../database/models/reactionrolesSchema`);
const { Util } = require(`discord.js`)
module.exports = {
    name: `addreaction`,
    aliases: [`reactionadd`],
    description: `Add A Reaction Role`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if(!message.member.permissions.has(`ADMINISTRATOR`)) return message.channel.send(`You Must Be An Administrator To Do This`);
        const role = message.mentions.roles.first();
        if(!role) return message.channel.send(`You Must Mention A Role.`)

        let[, emoji] = args
        if(!emoji) return message.reply(`Please Specify An Emoji/Reaction`)

        const parsedEmoji = Util.parseEmoji(emoji);

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Roles[pasedEmoji.name] = [
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
            message.channel.send(`New Role Added`) 
        })
    }
}