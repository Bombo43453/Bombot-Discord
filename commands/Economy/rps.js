const profileModel = require(`../../database/models/profileSchema`)
module.exports = {
    name: `rps1231231`,
    description: `Rock Paper Scissors`,
    hidden: true,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Rock Paper Scissors`)
            .setDescription(`React to Play `)
            .setTimestamp()
            .setFooter(`Please wait for all reactions to load...`)
            .setColor(`${guildProfile.EmbedColor}`)
        let msg = await message.channel.send(embed)
        await msg.react(`🗻`)
        await msg.react(`✂`)
        await msg.react(`📰`)

        const filter = (reaction, user) => {
            return ['🗻', `✂`, `📰`].includes(reaction.emoji.name) && user.id === message.author.id;

        }
        const choices = ['🗻', `✂`, `📰`]
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {
            max: 1,
            time: 60000,
            error: ['time']
        }).then(
        async (collected) => {
            const reaction = collected.first()

            
            

            if((me === `🗻` && reaction.emoji.name === `✂`) ||
            (me === `✂` && reaction.emoji.name === `📰`) ||
            (me === `📰` && reaction.emoji.name === `🗻`)) {
                
                let result = new Discord.MessageEmbed()
            .setTitle(`You Lost -5 coins`)
            .addField(`Your Choice`, `${reaction.emoji.name}`)
            .addField(`Bots Choice`, `${me}`)
            .setColor(`${process.env.EMBEDCOLOR}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
                await msg.edit(result)
            const amount = -5;
                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                    serverID: message.guild.id,
                }, {
                    $inc: {
                        coins: amount,
                    }
                }
                )
            } else if(me === reaction.emoji.name){
                
                let result2 = new Discord.MessageEmbed()
            .setTitle(`Its A Tie`)
            .addField(`Your Choice`, `${reaction.emoji.name}`)
            .addField(`Bots Choice`, `${me}`)
            .setColor(`${process.env.EMBEDCOLOR}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
                await msg.edit(result2)
            } else {
                let result1 = new Discord.MessageEmbed()
            .setTitle(`You Won! +20 Coins`)
            .addField(`Your Choice`, `${reaction.emoji.name}`)
            .addField(`Bots Choice`, `${me}`)
            .setColor(`${guildProfile.EmbedColor}`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
                await msg.edit(result1)
                const amount1 = 20;
                const losereponse = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                    serverID: message.guild.id,
                }, {
                    $inc: {
                        coins: amount1,
                    }
                }
                )
            }


        })
        .catch(collected => {
            message.reply(`Process cancelled, you failed to respond on time :(`)
        })
    
}
}