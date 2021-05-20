module.exports = {
    name: 'avatar',
    aliases: [`profilepicture`, 'profilepic'],
    usage: (`(user)`),
    description: `Display a User's Avatar`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.MessageEmbed()
         .setColor(`${guildProfile.EmbedColor}`)
        .setAuthor(`${user.username}'s Avatar: `)
        .setImage(user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(avatarEmbed);

    }
}