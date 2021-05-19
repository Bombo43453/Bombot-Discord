const fetch = require('node-fetch');

module.exports = {
    name: `Covid`,
    description: `Track a county or worldwide COVID-19 Cases`,
    usage: (`(all/ country)`),
    async execute(client, message, args, Discord, errorlog) {
        let countries = args.join(' ');

        const noArgs = new Discord.MessageEmbed()
            .setTitle(`Mising Arguments`)
            .setColor(`${process.env.EMBEDCOLOR}`)
            .setDescription(`You are Missing Some Args`)
            .addField(`Usage`, `${process.env.PREFIX}covid (all / Country)`)
            .setTimestamp()
        if (!args[0]) return message.channel.send(noArgs)
        try {
            if (args[0] === `all`) {
                fetch(`https://covid19.mathdro.id/api`)
                    .then(response => response.json())
                    .then(data => {
                        let confirmed = data.confirmed.value.toLocaleString()
                        let recovered = data.recovered.value.toLocaleString()
                        let deaths = data.deaths.value.toLocaleString()

                        const embed = new Discord.MessageEmbed()
                            .setColor(`${process.env.EMBEDCOLOR}`)
                            .setThumbnail(`${process.env.SERVERLOGO}`)
                            .setTitle(`World Wide COVID 19 Stats`)
                            .addField(`confirmed Cases`, confirmed)
                            .addField(`Recovered`, recovered)
                            .addField(`Deaths:`, deaths)

                        message.channel.send(embed)
                    })
            } else {
                fetch(`https://covid19.mathdro.id/api/${countries}`)
                    .then(response => response.json())
                    .then(data => {
                        let confirmed = data.confirmed.value.toLocaleString()
                        let recovered = data.recovered.value.toLocaleString()
                        let deaths = data.deaths.value.toLocaleString()

                        const embed = new Discord.MessageEmbed()
                            .setColor(`${process.env.EMBEDCOLOR}`)
                            .setThumbnail(`${process.env.SERVERLOGO}`)
                            .setTitle(`Covid-19 Stats For **${countries}**`)
                            .addField(`confirmed Cases`, confirmed)
                            .addField(`Recovered`, recovered)
                            .addField(`Deaths:`, deaths)

                        message.channel.send(embed)
                    })
            }
        } catch (err) {
            return message.channel.send(`Invalid Entry (Make Sure The County Is Spelled Correctly)`)
            errorlog.send(`${err}`)
        }
    }
}