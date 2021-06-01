const profileModel = require('../../database/models/profileSchema');
let WelcomeSchema = require(`../../database/models/welcomeSchema`)
const Discord = require(`discord.js`)
const mongoose = require(`mongoose`)
module.exports = (GuildMember) => {
   // const guildy = GuildMember.guild
 WelcomeSchema.findOne({ guildID: GuildMember.guild.id}, async (err, data) => {

    
    console.log(GuildMember.guild.id)
    if(!data) return;
    const channel = await client.channels.cache.find(x => x.id === `${data.WelcomeChannel}`)
    channel.send(`Welcome ${member}, ${data.WelcomeMsg}`)
  

})
if(!data) return;
}