const {
    MessageEmbed,
    MessageCollector
} = require(`discord.js`)
const TicketData = require(`../../database/models/TicketData`)
module.exports = {
    name: `ticket-setup`,
    description: `Setup Ticket Profile (Manage Guild Perms + )`,
    usage: (``),
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        let embed = 'Error :( Something Went Wrong';
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            embed = new Discord.MessageEmbed()
                .setTitle(`Invalid Permissions`)
                .setDescripiton(`You Must Have The \`MANAGE SERVER\` Permission To Do This`)
                .setColor(`${guildProfile.EmbedColor}`)
            return message.channel.send(embed);
        }
        let ticketData = await TicketData.findOne({
            GuildID: message.guild.id
        });
        if (!ticketData) {
            let firstembed = new Discord.MessageEmbed()
                .setTitle(`Setup Tickets...`)
                .setDescription(`What Do You Want The Ticket Message To Be:`)
                .setColor(`${guildProfile.EmbedColor}`)
            let firstMsg = await message.channel.send(firstembed);

            const firstFilter = m => m.author.id === message.author.id;
            const firstCollector = new MessageCollector(message.channel, firstFilter, {
                max: 2
            });

            let embedDescription;

            firstCollector.on(`collect`, async msg => {
                embedDescription = msg.content;
                const secondEmbed = new Discord.MessageEmbed()
                    .setTitle(`Setup Tickets`)
                    .setDescription(`Where Do You Want To Send The Message? (Make Sure To Mention The Channel)`)
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
                        .setTitle(`Ticket Setup...`)
                        .setDescription(`Who Do You Want To Have Access To The Tickets, Please Provide A Role ID, Role Mention, Role Name`)
                        .setColor(`${guildProfile.EmbedColor}`)
                    msg.channel.send(thirdEmbed)
                    secondCollector.stop();

                    const thirdFilter = m => m.author.id === message.author.id;
                    const thirdCollector = new MessageCollector(message.channel, thirdFilter, {
                        max: 2
                    });

                    thirdCollector.on('collect', async message => {
                        let savedRole = message.mentions.roles.first() || message.guild.roles.cache.get(message.content) || message.guild.roles.cache.find(role => role.name.toLowerCase() === message.content.toLowerCase());

                        if (!savedRole) {
                            embed = new Discord.MessageEmbed()
                                .setTitle(`Uh Oh`)
                                .setDescripiton(`The Role You Mentioned Is Not Valid \n Please Try Again`)
                                .setColor(`${guildProfile.EmbedColor}`)
                                .setTimestamp()
                            msg.channel.send(embed);
                            thirdCollector.stop();
                            return;
                        }
                        embed = new Discord.MessageEmbed()
                            .setTitle(`Ticket Setup...`)
                            .setDescription(`What Category Would You Like The Ticket To Be In (Has To Be Category ID)`)
                            .setColor(`${guildProfile.EmbedColor}`)
                        msg.channel.send(embed)
                        thirdCollector.stop();

                        const fourthFilter = m => m.author.id === message.author.id;
                        const fourthCollector = new MessageCollector(message.channel, fourthFilter, {
                            max: 2
                        });

                        fourthCollector.on(`collect`, async message => {
                            let argsy = args[0];
                            let TicketCat = `0`
                            if (isNaN(message.content)) {
                                TicketCat = `N/A`
                            }
                            try {
                            if(TicketCat === '0'){
                                TicketCat = `${message.content}`
                                const channy = await message.guild.channels.create(`(Delete me)`)
                                channy.updateOverwrite(message.guild.id, {
                                    VIEW_CHANNEL: false
                                })
                                embed = new Discord.MessageEmbed()
                                    .setTitle(`Uh Oh`)
                                    .setDescription(`The Category You Mentioned Does Not Exist`)
                                    .setColor(`${guildProfile.EmbedColor}`)
                               
                                 channy.setParent(TicketCat).catch(err => channy.delete())
                                 if(err){
                                     channy.delete()
                                     return;
                                     
                                 }
                                console.log(`${TicketCat}`)
                               console.log(`here`)
                                setTimeout(function() {channy.delete}, 1000)
                                
                            }
                            } catch (err) {
                               // channy.delete()
                                let embed = new Discord.MessageEmbed()
                                    .setTitle(`Uh Oh`)
                                    .setDescription(`An Error Has Occured, Please Try Again \n This Is Most Likely Because The Category You Mentioned Does Not Exist`)
                                    .setColor(`${guildProfile.EmbedColor}`)
                                msg.channel.send(embed)
                                return;
                            }
                            embed = new MessageEmbed()
                                .setTitle(`Uh Oh`)
                                .setDescription(`The Category You Mentioned Does Not Exist`)
                                .setColor(`${guildProfile.EmbedColor}`)
                            await msg.channel.send(embed)
                            console.log(`${TicketCat}`)
                            fourthCollector.stop()

                            await createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole, TicketCat)
                        })
                    })

                })


                // embed = new MessageEmbed()
                // .setTitle(`Ticket Setup...`)
                // .setDescription(`Setup Has Now Finished`)
                // .setColor(`${guildProfile.EmbedColor}`)
                // await msg.channel.send(embed)
            })
        } else {
            await TicketData.findOneAndRemove({
                GuildID: message.guild.id
            })
            embed = new Discord.MessageEmbed()
                .setTitle(`Ticket System Reset On Your Server`)
                .setDescription(`Please Run This Command Again To Re-Setup`)
            message.channel.send(embed)
        }
        async function createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole, TicketCat) {
            let sendEmbed = new Discord.MessageEmbed()
                .setTitle(`Ticket`)
                .setDescription(embedDescription)
                .setColor(`${guildProfile.EmbedColor}`)
            let msg = await embedChannel.send(sendEmbed);
            await msg.react('🎫')

            const newData = new TicketData({
                GuildID: message.guild.id,
                MessageID: msg.id,
                TicketNumber: 0,
                WhitelistedRole: savedRole.id,
                TicketCat: TicketCat,
            })
            newData.save()
        }
    }
}