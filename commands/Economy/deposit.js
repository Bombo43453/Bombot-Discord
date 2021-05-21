const profileModel = require(`../../database/models/profileSchema`)
module.exports = {
    name: `deposit213123`,
    description: `Deposit coins into your bank!`,
    aliases: [`dep`],
    usage: `(amount)`,
    
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData){
const amount = args[0];

if(amount % 1 != 0 || amount <= 0) return message.channel.send(`Deposit must be a whole number`);

try{
    if(amount > profileData.coins) return message.channel.send(`You Don't have that amount of coins to deposit`);
    await profileModel.findOneAndUpdate(
        {
            userID: message.author.id,
            serverID: message.guild.id,
        },
        {
            $inc: {
                coins: -amount,
                bank: amount,
            }
        }
    );
    const bankembed = new Discord.MessageEmbed()
        .setTitle(`Bank`)
        .setColor(`GREEN`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
        .setDescription(`You depositied **${amount}** coins into the bank. `)
        message.channel.send(bankembed)
} catch (err){
    console.log(err);
    errorlog.send(`${err}`)
    message.channel.send(`An Error Has Occured, Please Try Again Later. `)
}

}
}