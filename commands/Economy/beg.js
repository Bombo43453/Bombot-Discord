const Balance = require(`../../database/models/balance`)
const mongoose = require('mongoose')

module.exports = {
    name: `beg`,
    description: `Has A Chance of Giving Coins To A User`,
    async execute(client, message, args, Discord, errorlog) {
        const chance = Math.floor(Math.random() * 10) + 1;
        if(chance >= 1 && chance <=3){
            
            let balanceProfile = await Balance.findOne({ userID: message.author.id, guildID: message.guild.id})
            if (!balanceProfile) {
                balanceProfile = await new Balance({
                    userID: message.author.id,
                    guildID: message.guild.id,
                    lastEdited: Date.now(),
                });
                await balanceProfile.save().catch(err => console.log(err) && errorlog.send(`${err}`));
            }
            
           
            const array = [
                "Fine Take my spare coins",
                "Take it, I Only Have a few coins in my pocket",
                "Here are some coins ",
                "I Have a little coins to give to you",
                "Heres Some, but please get a job",
                "Don't Waste These coins on Beer",
                "Don't Waste These coins on Gambling",
            ];
            const coinsToGive = Math.floor(Math.random() * 7) + 2;
            const embed = new Discord.MessageEmbed()
                .setTitle(`Begging...`)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .setDescription(`${array[Math.floor(Math.random() *  6)]}`)
                .addField(`You Were Given:`, `**${coinsToGive}** Coins`)
            message.channel.send(embed);
            await Balance.findOneAndUpdate({ userId: message.author.id, guildID: message.guild.id}, {balance: balanceProfile.balance + coinsToGive, lastEdited: Date.now() });

        }else{
            const array1 = [
                `https://tenor.com/view/awkward-silence-silence-misha-collins-supernatural-spn-gif-5248772`,
                `No`,
                'Sorry Nothing In My Pockets',
                '*Runs And Screams At You*',
                'Dont Feel Like it',
                `I don't have anything`,
            ];
            message.channel.send(array1[Math.floor(Math.random() * 5)]);
        }
    }
}