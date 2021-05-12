module.exports = {
    name: 'ping',
    description: "Shows The Bots Ping",
    execute(client, message, args, Discord){
        const loadingembed = new Discord.MessageEmbed()
            .setDescription(`Pinging...`)
        message.channel.send(loadingembed).then (async (msg) =>{
            setTimeout(() => {msg.delete(); }, 1000);
            const pingembed = new Discord.MessageEmbed()
                .setAuthor(`PONG🏓`)
                .setTitle(`Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`)
                .setDescription(`**API Latency is ${Math.round(client.ws.ping)}ms**`)
                .setColor(`#2dd7e6`)
                
            setTimeout(() => {message.channel.send(pingembed);}, 1500)
          })
    }
}
//Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.

//API Latency is ${Math.round(client.ws.ping)}ms