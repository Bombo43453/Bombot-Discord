const Levels = require('discord-xp');
module.exports = {
    name: `editxp`,
    aliases: [`xpedit`],
    usage: `@member [xp, level] [add, set, remove] <amount>`,
    description: `Edit A User's Xp or Level (Admin +)`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog) {
        let usage = `${process.env.PREFIX}editxp (member) [xp, level] [add, set, remove] <amount>`;
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`${message.author}, You Dont Not Have Permissions... Missing: **ADMIN**`);
        const noargs = new Discord.MessageEmbed()
            .setTitle(`You Need to State More Arguments`)
            .setThumbnail(`${process.env.SERVERLOGO}`)
            .setColor(`${process.env.EMBEDCOLOR}`)
            .addField(`Usage:`, usage, false)
        if (!args[0]) return message.channel.send(noargs)
        if (!mentionedMember) return message.channel.send(`Member Stated Cannot Be Found ()`)
        if (!args[1]) return message.channel.send(noargs)
        if (!['xp', `level`].includes(args[1])) return message.channel.send(`Make Sure You Have Either \`\`xp or Level \`\` Mentioned as your second argument` + usage);
        if (args[1] == `xp`) {
            const addset = new Discord.MessageEmbed()
                .setTitle(`Invalid Usage`)
                .setDescription(`You Have to state if you are adding, setting or removing xp from the member`)
                .addField(`Usage`, usage)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)

            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send(addset)
            const value = Number(args[3])
            if (isNaN(value)) return message.channel.send(`The Amount Stated Is Not A Valid Number \n Usage: ${usage}`)
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send(`That member is not registered Within The Database Yet (make sure they have sent a message)`);
            if (args[2] == `add`) {
                if (!value) return message.channel.send(`The Amount Stated Is Not A Valid Number \n Usage: ${usage}`)
                try {
                    await Levels.appendXp(mentionedMember.user.id, message.guild.id, value)
                    const addedxp = new Discord.MessageEmbed()
                        .setTitle(`Xp Added`)
                        .addField(`Given To:`, `${mentionedMember}`, true)
                        .addField(`Amount:`, `${value}`, true)
                        .addField(`Given By:`, `${message.author}`, true)
                        .setColor(`${process.env.EMBEDCOLOR}`)
                        .setThumbnail(`${process.env.SERVERLOGO}`)
                    msglog.send(addedxp)
                    message.channel.send(addedxp)
                } catch (err) {
                    errorlog.send(err)
                    console.log(err)
                }
            } else if (args[2] == `remove`) {
                if (!value) return message.channel.send(`The Amount Stated Is Not A Valid Number \n Usage: ${usage}`)
                try {
                    await Levels.subtractXp(mentionedMember.user.id, message.guild.id, value)
                    const addedxp1 = new Discord.MessageEmbed()
                        .setTitle(`Xp Removed`)
                        .addField(`Given To:`, `${mentionedMember}`, true)
                        .addField(`Amount:`, `${value}`, true)
                        .addField(`Removed By:`, `${message.author}`, true)
                        .setColor(`${process.env.EMBEDCOLOR}`)
                        .setThumbnail(`${process.env.SERVERLOGO}`)
                    msglog.send(addedxp1)
                    message.channel.send(addedxp1)
                } catch (err) {
                    errorlog.send(err)
                    console.log(err)
                }
            } else if (args[2] == `set`) {
                if (!value) return message.channel.send(`The Amount Stated Is Not A Valid Number \n Usage: ${usage}`)
                try {
                    await Levels.setXp(mentionedMember.user.id, message.guild.id, value)
                    const addedxp123 = new Discord.MessageEmbed()
                        .setTitle(`Xp Set`)
                        .addField(`Given To:`, `${mentionedMember}`, true)
                        .addField(`Set Amount:`, `${value}`, true)
                        .addField(`Set By:`, `${message.author}`, true)
                        .setColor(`${process.env.EMBEDCOLOR}`)
                        .setThumbnail(`${process.env.SERVERLOGO}`)
                    msglog.send(addedxp123)
                    message.channel.send(addedxp123)
                } catch (err) {
                    errorlog.send(err)
                    console.log(err)
                }
            }
        } else if (args[1] == `level`) {

            const addset = new Discord.MessageEmbed()
                .setTitle(`Invalid Usage`)
                .setDescription(`You Have to state if you are adding, setting or removing level(s) from the member`)
                .addField(`Usage`, usage)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)

            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send(addset)
            const value = Number(args[3])
            if (isNaN(value)) return message.channel.send(`The Amount Stated Is Not A Valid Number \n Usage: ${usage}`)
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send(`That member is not registered Within The Database Yet (make sure they have sent a message)`);
            if (args[2] == `add`) {
                if (!value) return message.channel.send(`The Amount Stated Is Not A Valid Number \n Usage: ${usage}`)
                try {
                    await Levels.appendLevel(mentionedMember.user.id, message.guild.id, value)
                    const addedlv = new Discord.MessageEmbed()
                        .setTitle(`Added Levels`)
                        .addField(`Given To:`, `${mentionedMember}`, true)
                        .addField(`Amount:`, `${value}`, true)
                        .addField(`Added By:`, `${message.author}`, true)
                        .setColor(`${process.env.EMBEDCOLOR}`)
                        .setThumbnail(`${process.env.SERVERLOGO}`)
                    msglog.send(addedlv)
                    message.channel.send(addedlv)
                } catch (err) {
                    errorlog.send(err)
                    console.log(err)
                }
            } else if (args[2] == `remove`) {
                if (!value) return message.channel.send(`The Amount Stated Is Not A Valid Number \n Usage: ${usage}`)
                try {
                    await Levels.subtractLevel(mentionedMember.user.id, message.guild.id, value)
                    const addedxp12 = new Discord.MessageEmbed()
                        .setTitle(`Level(s) Removed`)
                        .addField(`Given To:`, `${mentionedMember}`, true)
                        .addField(`Amount:`, `${value}`, true)
                        .addField(`Removed By:`, `${message.author}`, true)
                        .setColor(`${process.env.EMBEDCOLOR}`)
                        .setThumbnail(`${process.env.SERVERLOGO}`)
                    msglog.send(addedxp12)
                    message.channel.send(addedxp12)
                } catch (err) {
                    errorlog.send(err)
                    console.log(err)
                }
            } else if (args[2] == `set`) {
                if (!value) return message.channel.send(`The Amount Stated Is Not A Valid Number \n Usage: ${usage}`)
                try {
                    await Levels.setLevel(mentionedMember.user.id, message.guild.id, value)
                    const addedlv1 = new Discord.MessageEmbed()
                        .setTitle(`Level(s) Set`)
                        .addField(`Given To:`, `${mentionedMember}`, true)
                        .addField(`Set Amount:`, `${value}`, true)
                        .addField(`Set By:`, `${message.author}`, true)
                        .setColor(`${process.env.EMBEDCOLOR}`)
                        .setThumbnail(`${process.env.SERVERLOGO}`)
                    msglog.send(addedlv1)
                    message.channel.send(addedlv1)
                } catch (err) {
                    errorlog.send(err)
                    console.log(err)

            }

            }

        }
    }
} 