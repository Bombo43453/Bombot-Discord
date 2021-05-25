
const Schema = require(`../../database/models/reactionrolesSchema`);
const Guild = require(`../../database/models/guildSchema`)
const TicketData = require(`../../database/models/TicketData`)
const cooldown = new Set()
const Discord = require(`discord.js`)
const { confirmation } = require("reconlx");
const { MessageAttachment } = require(`discord.js`)

const { MessageEmbed, MessageCollector,DiscordAPIError } = require(`discord.js`)
module.exports = async(client, reaction, user, bot) => {
    let guildProfile = await Guild.findOne({
        guildID: reaction.message.guild.id,
    })
    if(!guildProfile) return;
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
        if(!reaction.message.channel.name.includes(`ticket-`)) return;
        reaction.users.remove(user.id);
        reaction.message.react(`❌`)
        reaction.message.react(`✅`)
    }
    if(reaction.emoji.name === `✅`){
        if(!reaction.message.channel.name.includes(`ticket-`)) return;
        let data = await TicketData.findOne({
            GuildID: reaction.message.guild.id
        });    
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
            .setDescription(`⛔ - Delete Ticket \n \`${guildProfile.prefix}transcript\` - Save Transcript`)
            const emby2 = new Discord.MessageEmbed()
                .setDescription(`Ticket Closed By: ${user}`)
                .setColor(`YELLOW`)
                reaction.message.channel.send(emby2)
        let reactionthing = await reaction.message.channel.send(emby)
        await reactionthing.react(`⛔`)
        reaction.message.channel.setName(`closed-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`)
        },5000)
    }
    if(reaction.emoji.name === `❌`){
        if(!reaction.message.channel.name.includes(`ticket-`)) return;
        reaction.message.react(`❌`)
        reaction.message.react(`✅`)
        reaction.users.remove(user.id);
    }

    if(reaction.emoji.name === `⛔`){
        if(!reaction.message.channel.name.includes(`closed-`)) return;
        let deleteembed = new Discord.MessageEmbed()
            .setTitle(`Deleting Ticket`)
            .setDescription(`Deleting in 5 Seconds`)
            .setColor(`RED`)
        reaction.message.channel.send(deleteembed)
            setTimeout(() => reaction.message.channel.delete(), 5000);
    }

    
    Schema.findOne({ Message: reaction.message.id }, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.add(roleid)
        user.send(`You Have been given a role , by reacting to a message. `)
    })
}

