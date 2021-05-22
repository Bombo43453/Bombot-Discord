const fetch = require(`node-fetch`)
module.exports = {
    name: `ytogether`,
    aliases: [`Yttogether`, `YoutubeTogether`],
    description: `Watch youtube With Friends`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    message.delete()
    let voicechannel = message.member.voice.channel

    const Embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(`🔴 Voice Channel Error 🔴`)
        .setDescription(`**\`\`\`\n You Have To Be In A Voice Channel To Watch Youtube \`\`\`**`, false)
        .setTimestamp()

    if (!voicechannel) return message.channel.send(Embed).then((msg) => {
        setTimeout(() => msg.delete(), 5000)
    })

    fetch(`https://discord.com/api/v8/channels/${voicechannel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    }).then(res => res.json().then(invite => {

        const Embed1 = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(`🔴 Youtube Together Error 🔴`)
            .setDescription(`**\`\`\`\n Im Sorry But I Cant Start A Youtube \`\`\`**`, false)
            .setTimestamp()

        if (!invite.code) return message.channel.send(Embed1).then((msg) => {
            setTimeout(() => msg.delete(), 5000)
        })
        
        const Embed2 = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor(`🟢 Watch Youtube 🟢`)
            .setTitle(`**[Click This Link To Watch Youtube]**`, false)
            .setURL(`https://discord.com/invite/${invite.code}`)
            .setFooter('Please Click The Link Fast Because This Embed Will Be Deleted In 10 Seconds')
            .setTimestamp()

        message.channel.send(Embed2).then((msg) => {
            setTimeout(() => msg.delete(), 10 * 1000)
        })
    }))
}
}