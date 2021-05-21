const { Channel } = require("discord.js");
const Guild = require(`../../database/models/guildSchema`)
const Discord = require(`discord.js`)
module.exports = async(client, channel) => {
    try{
        let guildProfile = await Guild.findOne({
            guildID: channel.guild.id,
        })
        if(!guildProfile) return;
        if(guildProfile.AuditLogging == (`disabled`)) return;
        if(guildProfile.AuditLogging == (`enabled`)) {
        let logchannel = guildProfile.MessageLog
            if(channel.guild.channels.cache.get(logchannel) === undefined) return channel.guild.owner.send(`You Have Not Setup An Audit Logging Channel. Please Do ${guildProfile.prefix}setup AuditLogChannel (channelID)`);
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Channel Created`)
                    .setDescription(`A Channel Has Been Created`)
                    .addField(`Channel Name:`, `${channel.name} - <#${channel.id}>`, true)
                    .addField(`Channel ID:`, `${channel.id}`, true)
                    .setColor(guildProfile.EmbedColor)
                    .setTimestamp()
            client.channels.cache.get(`${guildProfile.MessageLog}`).send(embed)
        } else {
            return;
        }
    } catch (err){
       return;
    }
    
    

}