module.exports = {
    name: `closeasdasddassddddddddddffffgggggddfdfdf`,
    description: `Close A Ticket`,
    hidden: false,
    aliases: [`close-ticket`],
    usage: ``,

    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if(!message.channel.name.includes(`ticket-`)) return;
        message.channel.send(`Closing Ticket In 5 Seconds.`)
    }
}