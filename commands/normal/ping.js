module.exports = {
    name: "ping",
    description: "Ping Pong!",
execute(client, message, args, Discord){
    message.channel.send(`${message.author} PONG BITCH!! 🏓`)
    }
}