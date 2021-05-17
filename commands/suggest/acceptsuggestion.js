const { MessageAttachment, MessageEmbed } = require("discord.js")

module.exports = {
    name: "acceptsuggestion",
    description: "Accept A Suggestion",
    usage: `(messageID) (Reason)`,
async execute(client, message, args, Discord){
    if(!message.member.permissions.has(`${process.env.ACCEPTSUGGEST}`)) return message.reply('Invalid permissions');
    const messageID = args [0];
    const acceptQuery = args.slice(1).join(" ");

    if(!messageID) return message.reply(`Please Specify A Message ID Usage: !!acceptsuggestion (suggestionID) (Reason)`);
    if(!acceptQuery) return message.reply(`Please Specify A Reason! Usage: !!acceptsuggestion (SuggestionID) (Reason)`);
    try{
        const suggestedChannel = message.guild.channels.cache.get(`${process.env.SUGGEST}`);
        const suggestedEmbed = await suggestedChannel.messages.fetch(messageID);

        const data = suggestedEmbed.embeds[0];
        const acceptEmbed = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setDescription(data.description)
            .setColor('GREEN')
            .addField("Status", `ACCEPTED: ${acceptQuery}`);

            suggestedEmbed.edit(acceptEmbed);
message.channel.send(`Done!`)
            const user = client.users.cache.find((u) => u.tag === data.author.name);
            user.send(`Your Suggestion (${data.description}) Has Been Accepted By A Moderator`)
    }catch(err){
        message.channel.send('That Suggestion Does Not Exist');
    }
    }
}
