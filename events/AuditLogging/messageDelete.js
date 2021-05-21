const { Channel } = require("discord.js");
const Guild = require(`../../database/models/guildSchema`)
const Discord = require(`discord.js`)
module.exports = async(client, message) => {
    
    try{
        let guildProfile = await Guild.findOne({
            guildID: message.guild.id,
        })
        if(!guildProfile) return;
        if(guildProfile.AuditLogging == (`disabled`)) return;
        if(guildProfile.AuditLogging == (`enabled`)) {
        let logchannel = guildProfile.MessageLog
      //  if(message.author.client) return;
            if(message.guild.channels.cache.get(logchannel) === undefined) return message.guild.owner.send(`You Have Not Setup An Audit Logging Channel. Please Do ${guildProfile.prefix}setup AuditLogChannel (channelID)`);
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**Message Deleted** - ${message.channel}`)
                    .setAuthor(`${message.author.username} - ${message.author.id}`, message.author.displayAvatarURL())
                   // .addField(`Channel`, `${message.channel}`)
                    .addField(`Content:`, `${message.content}`)
                    .setColor(guildProfile.EmbedColor)
                    .setTimestamp()
                    message.guild.channels.cache.get(`${guildProfile.MessageLog}`).send(embed)
        } else {
            return;
        }
    } catch (err){
       return;
    }
    
    

}