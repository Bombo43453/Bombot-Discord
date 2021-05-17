module.exports = {
    name: 'avatar',
    aliases: [`profilepicture`, 'profilepic'],
    description: 'display an avatar',
async execute(client, message, args, Discord){
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.MessageEmbed()
        .setColor(`${process.env.EMBEDCOLOR}`)
        .setAuthor(`${user.username}'s Avatar: `)
        .setImage(user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(avatarEmbed);

    }
}