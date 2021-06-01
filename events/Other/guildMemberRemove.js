let WelcomeSchema = require(`../../database/models/welcomeSchema`)
const mongoose = require(`mongoose`)
module.exports = async(member) => {
    WelcomeSchema.findOne({ guildID: member.guild}, async (err, data) => {
   
    if(!data) return;
    if (data.ByeChannel === `N/A`) return;
    let welcomeChannel = member.guild.channels.cache.get(`${data.WelcomeChannel}`)
    welcomeChannel.send(`Goodbye ${member}, ${data.ByeMsg}`).catch(err => console.log(err))

    })
}
