const { MessageAttachment, MessageEmbed } = require("discord.js")

module.exports = {
    name: "denysuggestion",
    description: "Deny A suggestion",
    usage: `(Suggestion ID) (Reason)`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    if (guildProfile.Suggest == (`disabled`)) return message.channel.send(`Suggestions Are Disabled.`)
    if(!message.member.permissions.has(`${guildProfile.AcceptPerm}`)) return message.reply('Invalid permissions');
    const messageID = args [0];
    const denyQuery = args.slice(1).join(" ");

    if(!messageID) return message.reply(`Please Specify A Message ID Usage: ${guildProfile.prefix}denysuggestion (suggestionID) (Reason)`);
    if(!denyQuery) return message.reply(`Please Specify A Reason! Usage: ${guildProfile.prefix}denysuggestion (SuggestionID) (Reason)`);
    try{
        const suggestedChannel = message.guild.channels.cache.get(`${guildProfile.SuggestChannel}`);
        const suggestedEmbed = await suggestedChannel.messages.fetch(messageID);

        const data = suggestedEmbed.embeds[0];
        const acceptEmbed = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setDescription(data.description)
            .setColor('RED')
            .addField("Status", `DENIED: ${denyQuery}`,)

            suggestedEmbed.edit(acceptEmbed);
            message.channel.send(`Done!`)
            const user = client.users.cache.find((u) => u.tag === data.author.name);
            user.send(`Your Suggestion (${data.description}) Has Been Denied By A Moderator`)
    }catch(err){
        message.channel.send(`That Suggestion Does Not Exist Or... \n You Have Not Setup A Log Channel. Do ${guildProfile.prefix}setup for more information`);
        
    }
    }
}
