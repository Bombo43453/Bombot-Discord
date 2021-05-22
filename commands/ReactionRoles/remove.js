const Schema = require(`../../database/models/reactionrolesSchema`);
const { Util } = require(`discord.js`)
const { confirmation } = require(`reconlx`)
module.exports = {
    name: `removereaction`,
    aliases: [`reactionadd`],
    description: `Add A Reaction Role`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if(!message.member.permissions.has(`ADMINISTRATOR`)) return message.channel.send(`You Must Be An Administrator To Do This`);
        const role = message.mentions.roles.first();
      //  if(!role) return message.channel.send(`You Must Mention A Role.`)

        let[, emoji] = args
        //if(!emoji) return message.reply(`Please Specify An Emoji/Reaction`)
message.channel.send(`Are You Sure About This. \n \`This Will Delete All Reaction Roles And IS The Only Way To Remove Them\``).then(async (msg) => {
    const emoji = await confirmation(msg, message.author, ["✅", "❌"], 30000);
    if (emoji === "✅") {
        const parsedEmoji = Util.parseEmoji(emoji);

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                await Schema.findOneAndDelete({ Guild: message.guild.id }, data);
            } else {
                message.channel.send(`There is no data on this reaction role.`)
            }
                const embed1 = new Discord.MessageEmbed()
                    .setTitle(`Reaction Roles Deleted`)
                    .setDescription(`You Can Restart With ${guildProfile.prefix}addreaction (role) (reaction)`)
                    .setColor(`${guildProfile.EmbedColor}`)
            msg.edit(embed1)
        })
    }
    if (emoji === "❌"){
        msg.edit(`Process Has Been Cancelled`)
    }
})
       
    }
}