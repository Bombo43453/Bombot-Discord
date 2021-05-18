module.exports = {
    name: `restart`,
    hidden: true,
    aliases: [`crash`],
    description: `Restart The Bot (Only For People With The Role 'BOTPERM')`,
async execute(client, message, args, Discord){
    if (!message.member.roles.cache.some(role => role.name === `BOTPERM`)){
    message.channel.send(`You do not have permissions (make sure you have the role "BOTPERM")`)
    return;
    }
    const logembed = new Discord.MessageEmbed()
    .setTitle(`Bot Restarting`)
    .setDescription(`Please Wait Up To 1 Minute For It To Go Back Online`)
    .setFooter(` Wait For The Start Message Below`)
    .setTimestamp()
    .setColor(`${process.env.EMBEDCOLOR}`)
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    client.channels.cache.get(`${process.env.MSGLOG}`).send(logembed);
    message.channel.send(`Restarting... (expect to be ready within 1 minute) `)

    console.log(`
    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    ============================================================================
    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        BOT RESTART                     BOT RESTART         BOT RESTART

    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    ============================================================================
    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    `)
    setTimeout(function(){ 
    process.exit()
}, 3000);

    
}
}