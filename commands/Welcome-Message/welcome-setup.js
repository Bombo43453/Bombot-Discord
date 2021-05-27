let WelcomeSchema = require(`../../database/models/welcomeSchema`)
const {
    MessageEmbed,
    MessageCollector
} = require(`discord.js`)
module.exports = {
    name: 'welcome-setup',
    description: `Setup Welcome Message`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        let embed = 'Err, Something Went Wrong';
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            embed = new Discord.MessageEmbed()
                .setTitle(`Invalid Permissions`)
                .setDescription(`You Must Have The \`MANAGE SERVER\` Permission To Do This`)
                .setColor(`${guildProfile.EmbedColor}`)
            return message.channel.send(embed);
        }
        let welcomeData = await WelcomeSchema.findOne({
            guildID: message.guild.id,
        });
        if (!welcomeData) {
            let firstEmbed = new Discord.MessageEmbed()
                .setTitle(`Welcome Setup`)
                .setDescription(`Please Describe What Message You Want The Welcome Message To Say. (it starts with: Welcome (user), (your message) ) \n You May Include Gifs / Images`)
                .setColor(`${guildProfile.EmbedColor}`)
            let firstMsg = await message.channel.send(firstEmbed)
            const firstFilter = m => m.author.id === message.author.id;

            const firstCollector = new MessageCollector(message.channel, firstFilter, {
                max: 2
            });
            let embedDescription;

            firstCollector.on(`collect`, async msg => {
                WelcomeDescription = msg.content;
                const secondEmbed = new Discord.MessageEmbed()
                    .setTitle(`Welcome Setup`)
                    .setDescription(`Where Do You Want The Message To Be? (Make Sure To Mention The Channel)`)
                    .setColor(`${guildProfile.EmbedColor}`)
                msg.channel.send(secondEmbed);
                firstCollector.stop();

                const secondFilter = m => m.author.id === message.author.id;
                const secondCollector = new MessageCollector(message.channel, secondFilter, {
                    max: 2
                });

                secondCollector.on('collect', async msg => {
                    let embedChannel = msg.mentions.channels.first();
                    if (!embedChannel) {
                        embed = new Discord.MessageEmbed()
                            .setTitle(`This Is Not A Valid Channel`)
                            .setDescription(`Please Try Again.`)
                            .setColor(`${guildProfile.EmbedColor}`)
                        msg.channel.send(embed);
                        secondCollector.stop();
                        return;
                    }
                    const thirdEmbed = new Discord.MessageEmbed()
                        .setTitle(`Welcome Setup`)
                        .setDescription(`Where Would You Like To Send Your Goodbye Message (Please Mention A Channel) \n (If You Do Not Want A Goodbye Message Type N/A) \n Format: Goodbye (user), (message) `)
                        .setColor(`${guildProfile.EmbedColor}`)
                    msg.channel.send(thirdEmbed)
                    secondCollector.stop();
                    const thirdFilter = m => m.author.id === message.author.id;
                    const thirdCollector = new MessageCollector(message.channel, thirdFilter, {
                        max: 2
                    });
                    
                    thirdCollector.on('collect', async message => {
                        let byeChannel = message.mentions.channels.first()
                        embed = new Discord.MessageEmbed() 
                            .setTitle(`Welcome Setup`)
                            .setDescription(`What Message Would You Like Your GoodBye Message To Be \n If None, Type None .\n Format: Goodbye (user), (message)`)
                            .setColor(`${guildProfile.EmbedColor}`)
                        if(message.content === `N/A`){
                            byechannel = 'N/A'
                            thirdCollector.stop()
                            message.channel.send(embed)
                        } else {
                            message.channel.send(embed)
                            thirdCollector.stop()
                        } 
                        const fourthFilter = m => m.author.id === message.author.id;
                        const fourthCollector = new MessageCollector(message.channel, fourthFilter, {
                            max: 2
                        });
                    fourthCollector.on(`collect`, async msg => {
                        let ByeDescription = msg.content;
                        embed = new Discord.MessageEmbed()
                            .setTitle(`Setup Finished`)
                            .setTimestamp()
                            .setColor(`${guildProfile.EmbedColor}`)
                        message.channel.send(embed)
                        fourthCollector.stop()
                        await createWelcomeSetup(welcomeData, WelcomeDescription, embedChannel, byeChannel, ByeDescription)
                    })
                    })
                })
            })

        } else {
            await WelcomeSchema.findOneAndRemove({
                guildID: message.guild.id,
            })
            embed = new Discord.MessageEmbed()
                .setTitle(`Reset Records`)
                .setDescription(`Reset Your Welcome Messages, Please Run This Again.`)
                .setColor(`${guildProfile}`)
            message.channel.send(embed)
        }
    async function createWelcomeSetup(welcomeData, WelcomeDescription, embedChannel, byeChannel, ByeDescription){
        const NewData = new WelcomeSchema({
            guildID: message.member.guild.id,
            ByeMsg: ByeDescription, 
            ByeChannel: byeChannel,
            WelcomeMsg: WelcomeDescription,
            WelcomeChannel: embedChannel,
        })
        NewData.save()
    }
    }
}