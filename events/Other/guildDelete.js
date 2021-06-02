const Discord = require(`discord.js`)
const Guild = require(`../../database/models/guildSchema`)
const mongoose = require(`mongoose`)
module.exports = async(client, guild) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`I Have Been Removed From A Guild`)
        .setDescription(`Guild Info:`)
        .addField(`Guild Name:`, `${guild.name}`, true)
        .addField(`Guild ID:`, `${guild.id}`, true)
        .addField(`Guild Owner:`, `${guild.owner}`, true)
        .addField(`Members:`, `${guild.memberCount.toLocaleString()}`, true)
        .setColor(`BLUE`)
        
let guildProfile = Guild.findOneAndDelete({
    guildID: guild.id
})
if(guildProfile){
    embed.addField(`Guild Schema:`, `Deleted`, true)
} else if (!guildProfile){
    embed.addField(`Guild Schema:`, `Not Deleted (Non Existant)`, true)
} else {
    embed.addField(`Guild Schema:`, `Error (Not FND)`)
}

client.channels.cache.get(`843898073250791454`).send(embed)
}