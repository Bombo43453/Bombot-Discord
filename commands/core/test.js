module.exports = {
    name: `test`,
    description: `test`,
    hidden: true,
    aliases: [`t1`],
    usage: ``,

    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        message.channel.send(`I Work... Or do I?`)
    }
}