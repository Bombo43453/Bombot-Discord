module.exports = {
    name: `restart`,
    hidden: true,
    aliases: [`crash`],
    description: `Restart The Bot (Only For People With The Role 'BOTPERM')`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    if(message.author.id !== (`338040350465851394`)) return;
    message.delete()
    const logembed = new Discord.MessageEmbed()
    .setTitle(`Bot Restarting`)
    .setDescription(`Please Wait Up To 1 Minute For It To Go Back Online`)
    .setFooter(` Wait For The Start Message Below`)
    .setTimestamp()
    .setColor(`${process.env.EMBEDCOLOR}`)
    .setAuthor(`A Developer...`)
   // client.channels.cache.get(`${guildProfile.LogChannel}`).send(logembed);
   // message.channel.send(`Restarting... (expect to be ready within 1 minute) `)
    client.channels.cache.get(`846194502720946186`).send(logembed)
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