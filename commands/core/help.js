const { Channel } = require("discord.js")

module.exports = {
    name: "help",
    description: "Help with commands",
    execute(client, message, args, Discord){
		Channel.send(`hi`)
		
    }    
}
//ban arg 1 
