const { Channel } = require("discord.js")

module.exports = {
    name: "help",
    description: "Help with commands",
    execute(client, message, args, Discord){
		    const embed = new Discord.MessageEmbed()
        .setTitles("Help Commands")
        .setDescription("This is the help for commands")
        .addfields(
          {name: ${process.env.PREFIX}"help" description:"More Info About Commands"}
        )
        message.channel.send(embed)
    }
}
//ban arg 1
