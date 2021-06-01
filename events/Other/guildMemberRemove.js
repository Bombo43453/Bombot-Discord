const profileModel = require('../../database/models/profileSchema');
let WelcomeSchema = require(`../../database/models/welcomeSchema`)
const Discord = require(`discord.js`)
const mongoose = require(`mongoose`)

module.exports = (client, member, GuildMember) => {
 WelcomeSchema.findOne({ guildID: member.guild.id}, async (err, data, user) => {

    
  //  console.log(member.guild.id)
    if(!data) return;
    const channel = await client.channels.cache.find(x => x.id === `${data.ByeChannel}`)
    channel.send(`Goodbye ${member}, ${data.ByeMsg}`)
  

})
}