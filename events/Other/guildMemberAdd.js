const profileModel = require('../../database/models/profileSchema');
let WelcomeSchema = require(`../../database/models/welcomeSchema`)
const Discord = require(`discord.js`)
const mongoose = require(`mongoose`)
module.exports = (member, guild) => {
   // const guildy = member.guild
 WelcomeSchema.findOne({ guildID: member.user.guild.id}, async (err, data) => {

    
    console.log(member.guild.id)
    if(!data) return;
    const user = member.user
    const channel = await member.guild.channels.cache.get(`${data.WelcomeChannel}`)
    let sendy = channel.send(`Welcome ${user}, ${data.WelcomeMsg}`)
   // welcomeChannel

    if (WelcomeData.ByeChannel === `N/A`) return;
})
}