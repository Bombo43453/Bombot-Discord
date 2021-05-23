const Discord = require(`discord.js`)
module.exports = async(client, guild) => {
    const channelNames = ['general', 'welcome']
  const channel = guild.channels.cache.find(ch => channelNames.includes(ch.name))
    const embed = new Discord.MessageEmbed()
        .setTitle(`I Have Been Added to Another Guild`)
        .setDescription(`Guild Info:`)
        .addField(`Guild Name:`, `${guild.name}`, true)
        .addField(`Guild ID:`, `${guild.id}`, true)
        .addField(`Guild Owner:`, `${guild.owner}`, true)
        .addField(`Members:`, `${guild.memberCount.toLocaleString()}`)
        .setColor(`BLUE`)
        client.channels.cache.get(`843898073250791454`).send(embed)
    if (channel){
        channel.send(`Hello Darling, My Name Is ${client.user.username}, Looks like you have not set me up. To Set me up, do \`${process.env.PREFIX}setup\`. If you need any help, you can join the support server at https://discord.gg/navpvRsFYh`)
    }
}
