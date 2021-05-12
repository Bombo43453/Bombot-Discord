module.exports = {
    name:"sayembed",
    aliases: [`embed`],
    description: "says what you tell it to",
    async execute(client, message, args, Discord){
        message.delete();
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${message.author}, You Dont Not Have Permissions...`);
        const messageToSay = args.join(" ");
        const sayEmbed = new Discord.MessageEmbed()
            .setDescription(messageToSay)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(`#2dd7e6`)
            .setTimestamp();
        const logembed = new Discord.MessageEmbed()
            .setTitle(`Say Log (embed):`)
            .setTimestamp()
            .setDescription(messageToSay)
            .setColor(`BLUE`)
            .addFields(
                {name: `Author:`, value: `${message.author}`, inline: true},
                {name: `Channel:`, value: `${message.channel.name}`, inline: true},
            )
            if(messageToSay.length >= 2048) {
                const ly = Discord.Util.splitMessage(messageToSay, {
                    maxLength: 1024,
                    char: '\n',
                    prepend: '',
                    apend: '',
                })
                sayEmbed.setDescription(ly.shift());
               
                ly.forEach((i) => sayEmbed.addField('\u200B', i));
              
            }
            else {
                sayEmbed.setDescription(messageToSay)
                
            }
      
        
        try {
            await message.channel.send(sayEmbed);
        }catch (err){
            console.log(err);
            message.channel.send(`${message.author}, I am not Able To Send That Message`)
        }

    }
}
var str = 'abcdefghijkl';
console.log(str.match(/.{1,3}/g));