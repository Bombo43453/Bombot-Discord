const profileModel = require(`../../database/models/profileSchema`)
module.exports = {
    name: `withdraw131232`,
   aliases: ['wit'],
   description: `Withdraw Money from the bank.`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const amount = args[0];
    if(amount % 1 != 0 || amount <= 0) return message.channel.send(`Withdraw amount must be a whole number!`);
    
    try{
        if(amount > profileData.bank) return message.channel.send(`You do not have that amount of coins to deposit`);
        
        await profileModel.findOneAndUpdate(
            {
                userID: message.author.id,
                serverID: message.guild.id
            },
            {
                $inc: {
                    coins: amount,
                    bank: -amount,
                }
            }
        )
        
       
      const bankembed = new Discord.MessageEmbed()
        .setTitle(`Bank`)
        .setColor(`GREEN`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
        .setDescription(`You Withdrawed **${amount}** coins into your pockets. `)
         message.channel.send(bankembed);
         
    } catch(err){
        console.log(err)
        errorlog.send(`${err}`)
    }
    }
}