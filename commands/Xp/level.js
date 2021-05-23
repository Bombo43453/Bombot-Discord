const Levels = require(`discord-xp`)
const canvacord = require('canvacord')
module.exports = {
    name: `Xp`,
    aliases: [`rank`, `level`],
    description: `Returns a level of the person stated`,
    usage: `(member/ keep none for author level)`,
async execute(client, message, args, Discord, errorlog){
    let mentionedMember = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;

    const target = await Levels.fetch(mentionedMember.user.id, message.guild.id);
    if (!target) return message.channel.send(`The Member Stated Does Not Have Any Levels Within The Server`);

    try{
    const rank = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png'}))
        .setCurrentXP(target.xp)
        .setRequiredXP(Levels.xpFor(target.level +1))
        .setStatus(message.member.presence.status)
        .setProgressBar(`#FFA500`, `COLOR`)
        .setUsername(message.author.username)
        .setDiscriminator(`0001`)
        .setLevel(target.level)
        .setRank(1, 'RANK', false)
        rank.build()
        .then(data => {
            const attatchment = new Discord.MessageAttachment(data, 'level card.png')
            message.channel.send(attatchment)
        })
    } catch (err) {
        errorlog.send(err);
        console.log(err);
    }
    }
}
//${mentionedMember} is level ${target.level} and has ${target.xp}/${Levels.xpFor(target.level +1)} Xp 