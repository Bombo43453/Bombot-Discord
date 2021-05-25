const { MessageEmbed, MessageCollector } = require(`discord.js`)
const TicketData = require(`../../database/models/TicketData`)
module.exports = {
    name: `ticket-setup`,
    description: `Setup Ticket Profile (Manage Guild Perms + )`,
    usage: (``),
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    let embed  = 'Error :( Something Went Wrong';
    if (!message.member.hasPermission('MANAGE_GUILD')) {
         embed = new Discord.MessageEmbed()
            .setTitle(`Invalid Permissions`)
            .setDescripiton(`You Must Have The \`MANAGE SERVER\` Permission To Do This`)
            .setColor(`${guildProfile.EmbedColor}`)
        return message.channel.send(embed);
    }
    let ticketData = await TicketData.findOne({ GuildID: message.guild.id });
    if(!ticketData){
       let firstembed = new Discord.MessageEmbed()
            .setTitle(`Setup Tickets...`)
            .setDescription(`What Do You Want The Ticket Message To Be:`)
            .setColor(`${guildProfile.EmbedColor}`)
        let firstMsg = await message.channel.send(firstembed);

        const firstFilter = m => m.author.id === message.author.id;
        const firstCollector = new MessageCollector(message.channel, firstFilter, { max: 2 });

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
            const secondCollector = new MessageCollector(message.channel, secondFilter, { max: 2 });

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
            const thirdCollector = new MessageCollector(message.channel, thirdFilter, { max: 2 });

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
            embed = new MessageEmbed()
                .setTitle(`Ticket Setup...`)
                .setDescription(`Setup Has Now Finished`)
                .setColor(`${guildProfile.EmbedColor}`)
                await msg.channel.send(embed)
                thirdCollector.stop();

                await createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole)
            })
            
        })

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
        async function createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole) {
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
                WhitelistedRole: savedRole.id
            })
            newData.save()
        }
}
}