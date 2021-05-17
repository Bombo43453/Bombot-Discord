const Discord = require('discord.js');

module.exports = async(client, message) => {
  const errorlog = client.channels.cache.get(`${process.env.ERRORLOG}`);
  const botlog = client.channels.cache.get(`${process.env.LOG}`)
  const msglog = client.channels.cache.get(`${process.env.MSGLOG}`)
  if (message.author.bot) return;

  const logChannel = client.channels.cache.find(channel => channel.id === `${process.env.MSGLOG}`)
  let words = ["Roblox", "I'm Leaving", "nibba", "faggot", "fag", "nigger", "nigga", "beaner", "niglet","anal", "jack off", "ni88a", "jerk off","I'm hard", "Jerk me ", "ICRP IS SHIT"]
 //ADD TO THE WORDS ABOVE, FOLLOW FORMAT
 
 
  let foundinText =  false;
  for (var i in words){
          if (message.content.toLowerCase().includes(words[i].toLowerCase())) foundinText = true;
      }
 
  if (foundinText){
      let logEmbed = new Discord.MessageEmbed()
      .setDescription(`**A Blacklisted Word Was Said**`)
      .addFields(
        {name: `Author:`,value:  `${message.author} -(${message.author.id})`, inline: true},
        {name: `Channel:`, value: `${message.channel}`, inline: true},
        {name: `Guild/Server:`, value: `${message.guild.name}`, inline: true},
        {name: `Message:`,value: `${message.content}`, inline: false }
      )
      .setColor('RED')
      .setTimestamp()
      logChannel.send(logEmbed)
 
      let embed = new Discord.MessageEmbed()
      .setTitle(`You Said A Blacklisted Word`)
      .setDescription(`This Word Is Not Permitted, You Have Been Reported `)
      .setColor('RED')
      .setTimestamp()
      let msg = await message.channel.send(embed);
      message.delete()
      msg.delete({timeout: '6500'})
  };


  
  if (message.channel.type === 'dm') return;
  const prefix = `${process.env.PREFIX}`

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  if (cmd) cmd.execute(client, message, args, Discord, errorlog, botlog, msglog);
};