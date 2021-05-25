const ms = require("ms")
module.exports = {
    name: `slowmode`,
    description: `Trigger Slowmode In A Channel`,
    usage: `(time (ms)`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if(!message.member.permissions.has(`ADMINISTRATOR`)) return message.channel.send(`Only People With The Administrator Permission Can Do This.`)
        if(!args[0]) {
        message.channel.setRateLimitPerUser(0);
        return message.channel.send(`The Slowmode Has Been Removed/ Set to 0`); 
        }

        const raw = args[0];
        const milliseconds = ms(raw);

        if(isNaN(milliseconds)) return message.reply(`This is not a valid time (make sure it is in milliseconds)`);

        if(milliseconds < 1000) return message.reply(`The minimum slowmode is 1 second`)

        message.channel.setRateLimitPerUser(milliseconds / 1000);

        const set = new Discord.MessageEmbed()
            .setTitle(`Slowmode Set`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .setDescription(`Slowmode in this channnel has been set to ${ms(milliseconds, {
                long: true
            })}`)
        message.channel.send(set)
        }
}
