module.exports = {
    name: `test`,
    description: `test`,
    hidden: true,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData){
errorlog.send(`test`)
botlog.send(`test`)
msglog.send(`test`)
}
}