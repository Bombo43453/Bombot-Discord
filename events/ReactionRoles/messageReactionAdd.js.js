
const Schema = require(`../../database/models/reactionrolesSchema`);
const TicketData = require(`../../database/models/TicketData`)
const cooldown = new Set()
const Discord = require(`discord.js`)
const { confirmation } = require("reconlx");
const transcript = require(`discord-transcript`)
const { MessageAttachment } = require(`discord.js`)

const { MessageEmbed, MessageCollector,DiscordAPIError } = require(`discord.js`)
module.exports = async(client, reaction, user, bot) => {
    if(user.bot) return; 
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch()
    
    if(!reaction.message.guild) return;

    let data = await TicketData.findOne({
        GuildID: reaction.message.guild.id
    });
    if (reaction.message.partial) await reaction.message.fetch();

    if(reaction.emoji.name === `🎫` && reaction.message.id === data.MessageID){
        if (cooldown.has(user.id)){
            reaction.users.remove(user.id);
            return;
        }
    data.TicketNumber += 1;
    await data.save();
    const channel = await reaction.message.guild.channels.create(`ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {
        type: `text`,
        permissionOverwrites: [{
            id: reaction.message.guild.id,
            deny: [`VIEW_CHANNEL`],
        },],
    });
    await channel.createOverwrite(user, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true, 
        SEND_TTS_MESSAGES: false
    });
    await channel.createOverwrite(data.WhitelistedRole, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        SEND_TTS_MESSAGES: false,
    });
    reaction.users.remove(user.id);
    const successEmbed = new Discord.MessageEmbed()
        .setTitle(`Ticket #${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`)
        .setDescription(`${user.toString()}, Welcome, Please Describe Your Situation. Support Will Be With You Soon. \n To Close This Ticket React with 🔒`)
        .setColor(`GREEN`)
        .setFooter(`Bombot - Easy Ticketing`)
        let successMsg = await channel.send(`${user.toString()}`, successEmbed);
        await successMsg.react(`🔒`)
        await cooldown.add(user.id);
        await checkIfClose(bot, reaction, user, successMsg, channel);

        setTimeout(function () {
            cooldown.delete(user.id)
        }, 60000)
        async function checkIfClose(bot, reaction, user, successMsg, channel){
            const filter = reaction.emoji.name === `🔒`
            const collector = successMsg.createReactionCollector((reaction, user,) => 
            {dispose: true}
            )
        }
    }

    if(reaction.emoji.name === `🔒`){
        let data = await TicketData.findOne({
            GuildID: reaction.message.guild.id
        });
       if(!reaction.message.channel.name.includes(`ticket-`)) return;
reaction.message.channel.send(`Closing Ticket In 5 Seconds.`)
        setTimeout(async function() {
            reaction.users.remove(user.id);
            await reaction.message.channel.createOverwrite(user, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false, 
                SEND_TTS_MESSAGES: false,
            });
            const emby = new Discord.MessageEmbed()
            .setTitle(`Ticket Closed`)
            .setColor(`RED`)
            .setFooter(`Bombot - Easy Tickets`)
            .setDescription(`⛔ - Delete Ticket \n 📃 - Save Transcript`)
            const emby2 = new Discord.MessageEmbed()
                .setDescription(`Ticket Closed By: ${user}`)
                .setColor(`YELLOW`)
                reaction.message.channel.send(emby2)
        let reactionthing = await reaction.message.channel.send(emby)
        await reactionthing.react(`⛔`)
        await reactionthing.react(`📃`)
        reaction.message.channel.setName(`closed-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`)
        },5000)
    }

    if(reaction.emoji.name === `⛔`){
        if(!reaction.message.channel.name.includes(`closed-`)) return;
        let deleteembed = new Discord.MessageEmbed()
            .setTitle(`Deleting Ticket`)
            .setDescription(`Deleting in 5 Seconds`)
            .setColor(`RED`)
            setTimeout(() => reaction.message.channel.delete(), 5000);
    }

    if(reaction.emoji.name === `📃`){
        if(!reaction.message.channel.name.includes(`closed-`)) return;
        fetchTranscript(reaction.message, 100)
            .then((data) => {
            let messagecollection = reaction.message.channel.messages.fetch({
                limit
            })
                let link = await transcript.generate(message, messagecollection, channel);

                let tranembed = new Discord.MessageEmbed()
                    .setTitle(`Transcript:`)
                    .setDescription(`${link}`)
                    .setFooter(`Bombot - Easy Tickets`)
            })
    }
    Schema.findOne({ Message: reaction.message.id }, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.add(roleid)
        user.send(`You Have been given a role , by reacting to a message. `)
    })
}

