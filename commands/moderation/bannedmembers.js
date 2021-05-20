module.exports = {
    name:"bannedmembers",
    description: "Display Banned Members",
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
const invalidperms = new Discord.MessageEmbed().setTitle(`Invalid Perms`) .setDescription(`${message.author}, you have invalid perms`) .setFooter(`If this is a mistake, Contact An Owner`);
    if (!message.member.permissions.has(`${process.env.guildProfile.BanPerm}`)) return message.channel.send(invalidperms)

    try{
        const fetchBans = message.guild.fetchBans();
    const bannedMembers = (await fetchBans)
    .map((member) => member.user.tag)
    .join(" ; ")
    
    message.channel.send(bannedMembers)
    } catch (err){
        message.channel.send(`There Are Too Many Banned Members In This Guild To Log.`)
        errlog.send(`${err}`)
    }
    }
}