const canvacord = require("canvacord");
const monggose = require(`mongoose`)
const Balance = require(`./../../database/models/balance`)

module.exports = {
    name: `balance`,
    description: `Check The Balance Of A Member Mentioned`,
    usage: `(user)`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog) {
       try{
        let mentionedMember = message.mentions.members.first() || await message.guild.members.fetch(args[0]);

        let balanceProfile = await Balance.findOne({ userID: message.author.id, guildID: message.guild.id });
        if (!balanceProfile){
            balanceProfile = await new Balance({
                // _id: mongoose.Types.ObjectId(),
                userID: mentionedMember.id,
                guildID: message.guild.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => errlog.send(err));
        }
const embed = new Discord.MessageEmbed()
        .setTitle(`Bank:`)
        .setDescription(`${mentionedMember} has **${balanceProfile.balance}** Coins`)
        .setTimestamp()
        .setColor(`${process.env.EMBEDCOLOR}`)
if(!args[0]) {
    const embed1 = new Discord.MessageEmbed()
        .setTitle(`Bank:`)
        .setDescription(`You Have **${balanceProfile.balance}** Coins`)
        .setTimestamp()
        .setColor(`${process.env.EMBEDCOLOR}`)
    message.channel.send(embed1)
    return;
}
       // .setThumbnail(`https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.clipartmax.com%2Fpng%2Fmiddle%2F80-806808_bank-account-icons-bank-service-icon-png.png&imgrefurl=https%3A%2F%2Fwww.clipartmax.com%2Fmiddle%2Fm2i8G6N4K9i8K9Z5_bank-account-icons-bank-service-icon-png%2F&tbnid=Q2aA6PLuzhn-eM&vet=12ahUKEwiSyZCjrNLwAhWVq54KHeGSCYwQMygJegUIARD5AQ..i&docid=vRwV7aUFRMBINM&w=840&h=592&itg=1&q=bank%20account%20icon&ved=2ahUKEwiSyZCjrNLwAhWVq54KHeGSCYwQMygJegUIARD5AQ`)
        message.channel.send(embed)
       } catch (err) {
        errorlog.send(err)
        message.channel.send(`An Error Has Occured, Make Sure The User Mentioned Is In The Guild`)
       }
    }
}