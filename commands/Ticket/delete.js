module.exports = {
    name: `testasdfasdfasd`,
    description: `test`,
    hidden: true,
    aliases: [`t1fasdfasdfasdf`],
    usage: ``,

    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        message.channel.send(`I Work... Or do I?`)
    }
}