const { Channel } = require("discord.js")

module.exports = {
    name: "help",
    description: "Help with commands",
    execute(client, message, args, Discord){
		    const embed = new Discord.MessageEmbed()
        .setTitle("Help Commands")
        .setDescription("This is the help for commands")
        .addFields(
          {name: `${process.env.PREFIX}help`, value: "Show This Prompt", inline: false},
          {name: `${process.env.PREFIX}errorcode`, value: "Display Error Codes", inline: false},
          {name: `${process.env.PREFIX}8ball`, value: `Have A Virtural 8ball Predict A Future`, inline: false},
        )
        message.channel.send(embed)
    }
}
//ban arg 1
