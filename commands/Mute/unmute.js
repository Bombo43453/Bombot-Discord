const { Message } = require(`discord.js`)
//const Schema = require("../../database/models/mute")
module.exports = {
    name: 'unmute',
    description: 'unmute A Player',
    usage: `(user)`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!message.member.hasPermission(`${guildProfile.MutePerm}`)) return message.channel.send(`INVALID PERMISSIONS Missing: ${guildProfile.MutePerm}`)
    const Logembed = new Discord.MessageEmbed()
    .setTitle(`Member Unmuted`)
    .setColor(`${guildProfile.EmbedColor}`)
    .addFields(
        {name: `Unmuted By:`, value: `${message.author}`, inline: false},
        {name: `Member Unmuted:`, value: `${Member}`, inline: false}
    )

    const DmEmbed = new Discord.MessageEmbed()
        .setTitle(`YOU HAVE BEEN UNMUTED FROM ICRP`)
        .setColor(`${guildProfile.EmbedColor}`)
        .setDescription(`Try Not To commit this offense again!`)

    if(!Member) return message.channel.send(`Member Not Found`)

    const role = message.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === 'muted'
        );

    // Schema.findOne(
    //     {
    //         Guild: message.guild.id,
    //     },
        // async (err, data) => {
        //     if (!data) return message.reply ("Member Was Not Muted!");
        //     const user = data.Users.findIndex((prop) => prop === Member.id);
        //     if (user == -1) return message.reply("Member is Not Muted!");
        //     data.Users.splice(user, 1);
         try{
            await Member.roles.remove(role);
            Member.send(DmEmbed)
            message.channel.send(`Done!`)
            client.channels.cache.get(`${guildProfile.LogChannel}`).send(Logembed);
         } catch (err){
             message.channel.send(`An Error Has Occured. \n This Is Most Likely Because You Have Not Set A Log Channel. \n Do ${guildProfile.prefix}setup for more informaiton. `)
         }
              //  }


    }
}
