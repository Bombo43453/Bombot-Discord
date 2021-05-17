module.exports = {
    name: 'avatar',
    aliases: [`profilepicture`, 'profilepic'],
    usage: (`(user)`),
    description: `Display a User's Avatar`,
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