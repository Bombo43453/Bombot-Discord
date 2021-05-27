let WelcomeSchema = require(`../../database/models/welcomeSchema`)
const mongoose = require(`mongoose`)
module.exports = async(member) => {
    let welcomeData = await WelcomeSchema.findOne({
        guildID: member.guild.id,
    });
    console.log(`${member.guild.id}`)
    if(!welcomeData) return;
    console.log(`Here 2`)
    if (WelcomeData.ByeChannel === `N/A`) return;
    let welcomeChannel = member.guild.channels.cache.get(`${WelcomeData.WelcomeChannel}`)
    welcomeChannel.send(`Goodbye ${member}, ${welcomeData.ByeMsg}`)

    
}
