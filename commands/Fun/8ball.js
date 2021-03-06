module.exports = {
    name: '8ball',
    usage: `(message)`,
    description: "Have An 8ball Predict Your Future",
execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){

    if (!args[0]) return message.channel.send(`Please Ask A Full Question`)

    const reason = args.join(" ");

    const eightballreplies = [
      "Yes",
      "Ask Again Later",
      "Without A Dbout",
      "100%",
      "Not A Chance",
      " My Sources Say No",
      "Not Likely",
      "No",
      "It is certain",
      "Better Not Tell You Now",
      "My Reply Is No."
    ];

const eightball = eightballreplies[Math.floor(Math.random() *eightballreplies.length)];

const eightembed = new Discord.MessageEmbed()
.setTitle(`🎱 Eight Ball`)
.setColor(`${guildProfile.EmbedColor}`)
.addFields(
  {name: `Question:`, value: `${reason}`, inline: false},
  {name: `Reply:`, value: `${eightball}`, inline: false}
)
message.channel.send(eightembed)
    }
}
