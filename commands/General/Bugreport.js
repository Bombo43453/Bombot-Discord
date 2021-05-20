const { confirmation } = require(`reconlx`)
module.exports = {
    name: "botbug",
    description: "Report A Bug",
    usage: `(bug)`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
  //  const owner = client.users.cache.get(`${process.env.OWNER}`);

    const query = args.join(" ");
    if(!query) return message.reply('Please Specify A Query');

    let proof = args[1];



    const reportEmbed = new Discord.MessageEmbed()
    .setTitle('NEW BUG 🐛!')
    .addField(`Guild`, `${message.guild}`, true)
    .addField(`Guild Owner:`, `${message.guild.member(message.guild.owner) ? message.guild.owner.toString() : message.guild.owner.user.tag}`, true)
    .addField('Author', `${message.author.tag}`, true)
    .addField('Report', query)
    .setTimestamp()
    .setColor(`${guildProfile.EmbedColor}`)

    const sureman = new Discord.MessageEmbed()
      .setTitle(`Are You Sure?`)
      .setDescription(`This will be send to an external discord server where the bot developer(s) can look through it`)
      .addField(`Do You Understand:`, `Your name and discord tag will be logged \n Your Report will be logged \n You may be contacted by the bot developer \n This is for bot related bugs. If it is about a channel like bot-logs not working, please cancel this report`)
      .setColor(`${guildProfile.EmbedColor}`)
      .setURL(`https://discord.gg/ccPsnDEudn`)
    message.channel.send(sureman).then(async (msg) => {
      const emoji = await confirmation(msg, message.author, ["✅", "❌"], 30000);
      if (emoji === "✅") {
        client.channels.cache.get(`${process.env.BUG}`).send(reportEmbed)
        let reportsent = new Discord.MessageEmbed()
          .setTitle(`Report Sent To The Developing Guild`)
          .setURL(`https://discord.gg/ccPsnDEudn`)
          .setColor(`${guildProfile.EmbedColor}`)
          .setThumbnail(`${process.env.SERVERLOGO}`)
          
        msg.edit(reportsent)
      }
      if (emoji === "❌") {
      const noman = new Discord.MessageEmbed()
        .setTitle(`Report Cancelled`)
        .setDescription(`Report Has Been Cancelled`)
        .setTimestamp()
        .setColor(`${process.env.EMBEDCOLOR}`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
        msg.edit(noman)
    }
    })
    
}

}
