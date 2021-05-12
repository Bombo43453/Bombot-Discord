module.exports = {
    name:"bannedmembers",
    description: "Display Banned Members",
async execute(client, message, args, Discord){
const invalidperms = new Discord.MessageEmbed().setTitle(`Invalid Perms`) .setDescription(`${message.author}, you have invalid perms`) .setFooter(`If this is a mistake, Make A Ticket`);
    if (!message.member.permissions.has(`${process.env.BANPERM}`)) return message.channel.send(invalidperms)

    const fetchBans = message.guild.fetchBans();
    const bannedMembers = (await fetchBans)
    .map((member) => member.user.tag)
    .join(" ; ")
    
    message.channel.send(bannedMembers)
    }
}