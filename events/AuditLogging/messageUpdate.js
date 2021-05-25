const { Channel } = require("discord.js");
const Guild = require(`../../database/models/guildSchema`)
const Discord = require(`discord.js`)
module.exports = async(client, oldMessage, newMessage) => {
    // if (!oldMessage.author) return;
    // if(oldMessage.webhookID) return;
    // if(newMessage.webhookID) return;
    // if (oldMessage.author.bot) return;
    // if (newMessage.author.bot) return;
    try{
        let guildProfile = await Guild.findOne({
            guildID: oldMessage.guild.id,
        })
        if(!guildProfile) return;
        if(guildProfile.AuditLogging == (`disabled`)) return;
        if(guildProfile.AuditLogging == (`enabled`)) {
        let logchannel = guildProfile.MessageLog
      //  if(message.author.client) return;
            if(oldMessage.guild.channels.cache.get(logchannel) === undefined) return oldMessage.guild.owner.send(`You Have Not Setup An Audit Logging Channel. Please Do ${guildProfile.prefix}setup AuditLogChannel (channelID)`);
                const embed = new Discord.MessageEmbed()
                   .setDescription(`**Message Edited** - <#${oldMessage.channel.id}>`)
                   .setAuthor(`${oldMessage.author.tag} - ${oldMessage.author.id}`, oldMessage.author.displayAvatarURL())
                   .addField(`Old Message:`, oldMessage)
                   .addField(`Edited Message:`, newMessage)
                   .setColor(`${guildProfile.EmbedColor}`)
                    .setTimestamp()

                oldMessage.guild.channels.cache.get(`${guildProfile.MessageLog}`).send(embed)
        } else {
            return;
        }
    } catch (err){
       //console.log(err)
       return;
    }
    
    

}