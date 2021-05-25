const mongoose = require(`mongoose`)
const Guild = require(`../../database/models/guildSchema`)
module.exports = {
    name: `settings`,
    aliases: [`setup`, `setting`],
    description: `Allows the Server Owner To Change the guild settings.`,
    hidden: false,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData) {
        if (message.author.id !== message.guild.ownerID) return message.channel.send(`You Do Not Have Permission To Use This Command As You Are Not The Server Owner`);
        let guildProfile = await Guild.findOne({
            guildID: message.guild.id,
        })
        if (!guildProfile) {
            const creating = new Discord.MessageEmbed()
                .setTitle(`Creating Settings Profile...`)
                .setDescription(`Once This Is Ready, run this command again`)
                .setColor(`${process.env.EMBEDCOLOR}`)
            const createmsg = await message.channel.send(creating)
            guildProfile = await new Guild({
                guildID: message.guild.id,
                guildName: message.guild.name,
            });
            await guildProfile.save().catch(err => console.log(err) && errorlog.send(`${err}`) && message.channel.send(`An Error Has Occured, Please make a bug report with (prefix)botbug`))
            createmsg.reply(`Profile Made.`)
        }
        if (!args.length) {
            try {
                //const ReactionPages = recon.ReactionPages;
                const embed1 = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}'s Settings`)
                    .setDescription(`To Change Settings Do ${guildProfile.prefix}settings (property) (value) \n Properties Are Case Sensitive`)
                    .addField(`Avaliable Properties:`, `- General Properties : \`Prefix\` \`EmbedColor\` \`Suggestions\` \`AuditLogging\` \n-Channel Properties :  \`SuggestChannel\` \`AuditLogChannel\` \`LogChannel\` \n-Permission Properties :  \`BanPermission\` \`KickPermission\` \`PurgePermission\` \`SayPermission\` \`MutePermission\` \`CeasePermission\` \`AcceptSuggestionPermission\``)
                    .addField(`Pages:`, ` Page 1 : This Page \n Page 2: Channel Properties \n Page 3: Permission Properties \n Page 4: Other Settings`)
                    .setColor(`${guildProfile.EmbedColor}`)
                    .setThumbnail(`${process.env.SERVERLOGO}`)
                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}'s Settings: (Page 2)`)
                    .addField(`Avaliable Properties:`, `- General Properties : \`Prefix\` \`EmbedColor\` \`Suggestions\` \`AuditLogging\` \n-Channel Properties :  \`SuggestChannel\` \`AuditLogChannel\` \`LogChannel\` \n-Permission Properties :  \`BanPermission\` \`KickPermission\` \`PurgePermission\` \`SayPermission\` \`MutePermission\` \`CeasePermission\` \`AcceptSuggestionPermission\``)
                    .setColor(`${guildProfile.EmbedColor}`)
                let embed3 = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}'s Settings: (Page 3)`)
                    .addField(`Avaliable Properties:`, `- General Properties : \`Prefix\` \`EmbedColor\` \`Suggestions\` \`AuditLogging\` \n-Channel Properties :  \`SuggestChannel\` \`AuditLogChannel\` \`LogChannel\` \n-Permission Properties :  \`BanPermission\` \`KickPermission\` \`PurgePermission\` \`SayPermission\` \`MutePermission\` \`CeasePermission\` \`AcceptSuggestionPermission\``)
                    .setColor(`${guildProfile.EmbedColor}`)
                let embed4 = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}'s Settings: (Page 4)`)
                    .addField(`Avaliable Properties:`, `- General Properties : \`Prefix\` \`EmbedColor\` \`Suggestions\` \`AuditLogging\` \n-Channel Properties :  \`SuggestChannel\` \`AuditLogChannel\` \`LogChannel\` \n-Permission Properties :  \`BanPermission\` \`KickPermission\` \`PurgePermission\` \`SayPermission\` \`MutePermission\` \`CeasePermission\` \`AcceptSuggestionPermission\``)
                    .setColor(`${guildProfile.EmbedColor}`)
                    .addField(`Ticket Settings:`, `WIP (Expect To Be Out Soon)`)
                    .addField(`Giveaway Settings:`, `WIP (Expect To Be Out Soon)`)
                    .addField(`Xp Leveling Settings:`, `WIP (Expect To Be Out Soon)`)
                if (guildProfile.prefix) embed1.addField(`Prefix:`, `>> \`${guildProfile.prefix}\` <<`, true)
                if (guildProfile.EmbedColor) embed1.addField(`Embed Color:`, `${guildProfile.EmbedColor}`, true)
                if (guildProfile.LogChannel) embed2.addField(`Log Channel:`, `${guildProfile.LogChannel}`, true)
                if (guildProfile.Suggest) embed1.addField(`Suggestions :`, `${guildProfile.Suggest}`, true)
                if (guildProfile.SuggestChannel) embed2.addField(`Suggest Channel:`, `${guildProfile.SuggestChannel}`, true)
                if (guildProfile.AuditLogging) embed1.addField(`Audit Logging:`, `${guildProfile.AuditLogging}`, true)
                if (guildProfile.MessageLog) embed2.addField(`Audit Log Channel:`, `${guildProfile.MessageLog}`, true)
                if (guildProfile.BanPerm) embed3.addField(`Ban Permision:`, `${guildProfile.BanPerm}`, true)
                if (guildProfile.PurgePerm) embed3.addField(`Purge Permision:`, `${guildProfile.PurgePerm}`, true)
                if (guildProfile.SayPerm) embed3.addField(`Say (command) Permision:`, `${guildProfile.SayPerm}`, true)
                if (guildProfile.MutePerm) embed3.addField(`Mute Members Permision:`, `${guildProfile.MutePerm}`, true)
                if (guildProfile.CeasePerm) embed3.addField(`Cease Permision:`, `${guildProfile.CeasePerm}`, true)
                if (guildProfile.AcceptPerm) embed3.addField(`Accept/Deny Suggestion Permision:`, `${guildProfile.AcceptPerm}`, true)
                if (guildProfile.KickPerm) embed3.addField(`Kick Permission`, `${guildProfile.KickPerm}`, true)
                if (guildProfile.WarnPerm) embed3.addField(`Warn Permission`, `${guildProfile.WarnPerm}`, true)
                let pages = [embed1, embed2, embed3, embed4]
                const send = await message.channel.send(`** **`)
                    send.edit(embed1)
                        await send.react(`1️⃣`)
                        await send.react(`2️⃣`)
                        await send.react(`3️⃣`)
                        await send.react(`4️⃣`)
                        const collector = send.createReactionCollector((reaction, user) => 
                        message.guild.members.cache.find((member) => member.id === user.id).hasPermission(`ADMINISTRATOR`),
                            { time: 300000 },
                        );
                        collector.on(`collect`, (reaction, user) => {
                            switch (reaction.emoji.name){
                                case `1️⃣`:
                                    send.edit(embed1)
                                    reaction.users.remove(user.id)
                                    break;
                                case `2️⃣`:
                                    send.edit(embed2)
                                    reaction.users.remove(user.id)
                                    break;
                                case `3️⃣`:
                                    send.edit(embed3)
                                    reaction.users.remove(user.id)
                                    break;
                                case `4️⃣`:
                                    send.edit(embed4)
                                    reaction.users.remove(user.id)
                                    break;
                            }
                        })
                    } catch (err){
                        console.log(err)
                        message.channel.send(`An Error Has Occured. Please Upload The Following Error Code: \n Error: \n ${err}`)
                    }
                        
            
        } else {
            if (![`Prefix`,
                    `EmbedColor`,
                    `LogChannel`,
                    `SuggestChannel`,
                    `AuditLogChannel`,
                    `BanPermission`,
                    `PurgePermission`,
                    `SayPermission`,
                    `MutePermission`,
                    `CeasePermission`,
                    `AcceptSuggestionPermission`,
                    `KickPermission`,
                    `WarnPermission`,
                    `Suggestions`,
                    `AuditLogging`,
                    `Suggestion`
                ].includes(args[0])) return message.channel.send(`You did not state A Valid Property. Valid Properties: **General Properties:** \`Prefix\` \`EmbedColor\` \`Suggestions\` \`AuditLogging\` \n **Channel Properties:** \`SuggestChannel\` \`AuditLogChannel\` \n **Permission Properties:** \`BanPermission\` \`KickPermission\` \`PurgePermission\` \`SayPermission\` \`MutePermission\` \`CeasePermission\` \`AcceptSuggestionPermission\` \n \n`);
            if (!args[1]) return message.channel.send(`You did not state a value to update the property. Usage: \`${guildProfile.prefix}settings (property) (value)\``)
            if (`Prefix` === args[0]) {
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    prefix: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`);
            } else if (`EmbedColor` === args[0]) {
                if (!args[1]) return message.channel.send(`You did not state a value to update the property. Usage: \`${guildProfile.prefix}settings (property) (value)\``)
                if (![`DEFAULT`, `AQUA`, `DARK_AQUA`, `GREEN`, `DARK_GREEN`, `BLUE`, `DARK_BLUE`, `PURPLE`, `DARK_PURPLE`, `LUMINIOUS_VIVID_PINK`, `DARK_VIVID_PINK`, `GOLD`, `DARK_GOLD`, `ORANGE`, `DARK_ORANGE`, `RED`, `DARK_GREY`, `DARKER_GREY`, `LIGHT_GREY`, `NAVY`, `DARK_NAVY`, `YELLOW`, `WHITE`, `BLURPLE`, `GREYPLE`, `DARK_BUT_NOT_BLACK`, `NOT_QUITE_BLACK`].includes(args[1])) return message.channel.send(`You Need To Choose From These Avaliable Colors: \n \`DEFAULT\` \`AQUA\` \`DARK_AQUA\` \`GREEN\` \`DARK_GREEN\` \`BLUE\` \`DARK_BLUE\` \`PURPLE\` \`DARK_PURPLE\` \`LUMINIOUS_VIVID_PINK\` \`DARK_VIVID_PINK\` \`GOLD\` \`DARK_GOLD\` \`ORANGE\` \`DARK_ORANGE\` \`RED\` \`DARK_RED\` \`GREY\` \`DARK_GREY\` \`DARKER_GREY\` \`LIGHT_GREY\` \`NAVY\` \`DARK_NAVY\` \`YELLOW\` \`WHITE\` \`BLURPLE\` \`GREYPLE\` \`DARK_BUT_NOT_BLACK\` \`NOT_QUITE_BLACK\``)
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    EmbedColor: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)

            } else if (`LogChannel` === args[0]) {
                if (!args[1]) return message.channel.send(`You did not state a value to update the property. Usage: \`${guildProfile.prefix}settings (property) (value)\``)
                if (isNaN(args[1])) return message.channel.send(`You Must Send The Channel ID To Do This`)

                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    LogChannel: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)

            } else if (`SuggestChannel` === args[0]) {
                if (!args[1]) return message.channel.send(`You did not state a value to update the property. Usage: \`${guildProfile.prefix}settings (property) (value)\``)
                if (isNaN(args[1])) return message.channel.send(`You Must Send The Channel ID To Do This`)
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    SuggestChannel: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)

            } else if (`AuditLogChannel` === args[0]) {
                if (!args[1]) return message.channel.send(`You did not state a value to update the property. Usage: \`${guildProfile.prefix}settings (property) (value)\``)
                if (isNaN(args[1])) return message.channel.send(`You Must Send The Channel ID To Do This`)
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    MessageLog: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if (`BanPermission` === args[0]) {
                if (![`ADMINISTRATOR`, `CREATE_INSTANT_INVITE`, `KICK_MEMBERS`, `BAN_MEMBERS`, `MANAGE_GUILD`, `ADD_REACTIONS`, `VIEW_AUDIT_LOG`, `PRIORITY_SPEAKER`, `VIEW_CHANNEL`, `SEND_MESSAGES`, `MANAGE_MESSAGES`, `MENTION_EVERYONE`, `CONNECT`, `SPEAK`, `MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`, `CHANGE_NICKNAMES`, `MANAGE_ROLES`, `MANAGE_WEBHOOKS`, `MANAGEEMOJIS`].includes(args[1])) return message.channel.send(`**YOU NEED TO CHOOSE FROM THESE AVALIABLE VALUES** \n \`ADMINISTRATOR\` \`CREATE_INSTANT_INVITE\` \`KICK_MEMBERS\` \`BAN_MEMBERS\` \`MANAGE_CHANNELS\` \`MANAGE_GUILD\` \`ADD_REACTIONS\` \`VIEW_AUDIT_LOG\` \`PRIORITY_SPEAKER\` \`VIEW_CHANNEL\` \`SEND_MESSAGES\` \`MANAGE_MESSAGES\` \`MENTION_EVERYONE\` \`CONNECT\` \`SPEAK\` \`MUTE_MEMBERS\` \`DEAFEN_MEMBERS\` \`MOVE_MEMBERS\` \`CHANGE_NICKNAMES\` \`MANAGE_ROLES\` \`MANAGE_WEBHOOKS\` \`MANAGEEMOJIS\` \n \n \n (More Info At https://discord.com/developers/docs/topics/permissions )`);
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    BanPerm: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if (`PurgePermission` === args[0]) {
                if (![`ADMINISTRATOR`, `CREATE_INSTANT_INVITE`, `KICK_MEMBERS`, `BAN_MEMBERS`, `MANAGE_GUILD`, `ADD_REACTIONS`, `VIEW_AUDIT_LOG`, `PRIORITY_SPEAKER`, `VIEW_CHANNEL`, `SEND_MESSAGES`, `MANAGE_MESSAGES`, `MENTION_EVERYONE`, `CONNECT`, `SPEAK`, `MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`, `CHANGE_NICKNAMES`, `MANAGE_ROLES`, `MANAGE_WEBHOOKS`, `MANAGEEMOJIS`].includes(args[1])) return message.channel.send(`**YOU NEED TO CHOOSE FROM THESE AVALIABLE VALUES** \n \`ADMINISTRATOR\` \`CREATE_INSTANT_INVITE\` \`KICK_MEMBERS\` \`BAN_MEMBERS\` \`MANAGE_CHANNELS\` \`MANAGE_GUILD\` \`ADD_REACTIONS\` \`VIEW_AUDIT_LOG\` \`PRIORITY_SPEAKER\` \`VIEW_CHANNEL\` \`SEND_MESSAGES\` \`MANAGE_MESSAGES\` \`MENTION_EVERYONE\` \`CONNECT\` \`SPEAK\` \`MUTE_MEMBERS\` \`DEAFEN_MEMBERS\` \`MOVE_MEMBERS\` \`CHANGE_NICKNAMES\` \`MANAGE_ROLES\` \`MANAGE_WEBHOOKS\` \`MANAGEEMOJIS\` \n \n \n (More Info At https://discord.com/developers/docs/topics/permissions )`);
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    PurgePerm: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if (`SayPermission` === args[0]) {
                if (![`ADMINISTRATOR`, `CREATE_INSTANT_INVITE`, `KICK_MEMBERS`, `BAN_MEMBERS`, `MANAGE_GUILD`, `ADD_REACTIONS`, `VIEW_AUDIT_LOG`, `PRIORITY_SPEAKER`, `VIEW_CHANNEL`, `SEND_MESSAGES`, `MANAGE_MESSAGES`, `MENTION_EVERYONE`, `CONNECT`, `SPEAK`, `MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`, `CHANGE_NICKNAMES`, `MANAGE_ROLES`, `MANAGE_WEBHOOKS`, `MANAGEEMOJIS`].includes(args[1])) return message.channel.send(`**YOU NEED TO CHOOSE FROM THESE AVALIABLE VALUES** \n \`ADMINISTRATOR\` \`CREATE_INSTANT_INVITE\` \`KICK_MEMBERS\` \`BAN_MEMBERS\` \`MANAGE_CHANNELS\` \`MANAGE_GUILD\` \`ADD_REACTIONS\` \`VIEW_AUDIT_LOG\` \`PRIORITY_SPEAKER\` \`VIEW_CHANNEL\` \`SEND_MESSAGES\` \`MANAGE_MESSAGES\` \`MENTION_EVERYONE\` \`CONNECT\` \`SPEAK\` \`MUTE_MEMBERS\` \`DEAFEN_MEMBERS\` \`MOVE_MEMBERS\` \`CHANGE_NICKNAMES\` \`MANAGE_ROLES\` \`MANAGE_WEBHOOKS\` \`MANAGEEMOJIS\` \n \n \n (More Info At https://discord.com/developers/docs/topics/permissions )`);
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    SayPerm: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if (`MutePermission` === args[0]) {
                if (![`ADMINISTRATOR`, `CREATE_INSTANT_INVITE`, `KICK_MEMBERS`, `BAN_MEMBERS`, `MANAGE_GUILD`, `ADD_REACTIONS`, `VIEW_AUDIT_LOG`, `PRIORITY_SPEAKER`, `VIEW_CHANNEL`, `SEND_MESSAGES`, `MANAGE_MESSAGES`, `MENTION_EVERYONE`, `CONNECT`, `SPEAK`, `MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`, `CHANGE_NICKNAMES`, `MANAGE_ROLES`, `MANAGE_WEBHOOKS`, `MANAGEEMOJIS`].includes(args[1])) return message.channel.send(`**YOU NEED TO CHOOSE FROM THESE AVALIABLE VALUES** \n \`ADMINISTRATOR\` \`CREATE_INSTANT_INVITE\` \`KICK_MEMBERS\` \`BAN_MEMBERS\` \`MANAGE_CHANNELS\` \`MANAGE_GUILD\` \`ADD_REACTIONS\` \`VIEW_AUDIT_LOG\` \`PRIORITY_SPEAKER\` \`VIEW_CHANNEL\` \`SEND_MESSAGES\` \`MANAGE_MESSAGES\` \`MENTION_EVERYONE\` \`CONNECT\` \`SPEAK\` \`MUTE_MEMBERS\` \`DEAFEN_MEMBERS\` \`MOVE_MEMBERS\` \`CHANGE_NICKNAMES\` \`MANAGE_ROLES\` \`MANAGE_WEBHOOKS\` \`MANAGEEMOJIS\` \n \n \n (More Info At https://discord.com/developers/docs/topics/permissions )`);
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    MutePerm: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if (`CeasePermission` === args[0]) {
                if (![`ADMINISTRATOR`, `CREATE_INSTANT_INVITE`, `KICK_MEMBERS`, `BAN_MEMBERS`, `MANAGE_GUILD`, `ADD_REACTIONS`, `VIEW_AUDIT_LOG`, `PRIORITY_SPEAKER`, `VIEW_CHANNEL`, `SEND_MESSAGES`, `MANAGE_MESSAGES`, `MENTION_EVERYONE`, `CONNECT`, `SPEAK`, `MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`, `CHANGE_NICKNAMES`, `MANAGE_ROLES`, `MANAGE_WEBHOOKS`, `MANAGEEMOJIS`].includes(args[1])) return message.channel.send(`**YOU NEED TO CHOOSE FROM THESE AVALIABLE VALUES** \n \`ADMINISTRATOR\` \`CREATE_INSTANT_INVITE\` \`KICK_MEMBERS\` \`BAN_MEMBERS\` \`MANAGE_CHANNELS\` \`MANAGE_GUILD\` \`ADD_REACTIONS\` \`VIEW_AUDIT_LOG\` \`PRIORITY_SPEAKER\` \`VIEW_CHANNEL\` \`SEND_MESSAGES\` \`MANAGE_MESSAGES\` \`MENTION_EVERYONE\` \`CONNECT\` \`SPEAK\` \`MUTE_MEMBERS\` \`DEAFEN_MEMBERS\` \`MOVE_MEMBERS\` \`CHANGE_NICKNAMES\` \`MANAGE_ROLES\` \`MANAGE_WEBHOOKS\` \`MANAGEEMOJIS\` \n \n \n (More Info At https://discord.com/developers/docs/topics/permissions )`);
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    CeasePerm: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if (`KickPermission` === args[0]) {
                if (![`ADMINISTRATOR`, `CREATE_INSTANT_INVITE`, `KICK_MEMBERS`, `BAN_MEMBERS`, `MANAGE_GUILD`, `ADD_REACTIONS`, `VIEW_AUDIT_LOG`, `PRIORITY_SPEAKER`, `VIEW_CHANNEL`, `SEND_MESSAGES`, `MANAGE_MESSAGES`, `MENTION_EVERYONE`, `CONNECT`, `SPEAK`, `MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`, `CHANGE_NICKNAMES`, `MANAGE_ROLES`, `MANAGE_WEBHOOKS`, `MANAGEEMOJIS`].includes(args[1])) return message.channel.send(`**YOU NEED TO CHOOSE FROM THESE AVALIABLE VALUES** \n \`ADMINISTRATOR\` \`CREATE_INSTANT_INVITE\` \`KICK_MEMBERS\` \`BAN_MEMBERS\` \`MANAGE_CHANNELS\` \`MANAGE_GUILD\` \`ADD_REACTIONS\` \`VIEW_AUDIT_LOG\` \`PRIORITY_SPEAKER\` \`VIEW_CHANNEL\` \`SEND_MESSAGES\` \`MANAGE_MESSAGES\` \`MENTION_EVERYONE\` \`CONNECT\` \`SPEAK\` \`MUTE_MEMBERS\` \`DEAFEN_MEMBERS\` \`MOVE_MEMBERS\` \`CHANGE_NICKNAMES\` \`MANAGE_ROLES\` \`MANAGE_WEBHOOKS\` \`MANAGEEMOJIS\` \n \n \n (More Info At https://discord.com/developers/docs/topics/permissions )`);
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    KickPerm: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if (`AcceptSuggestionPermission` === args[0]) {
                if (![`ADMINISTRATOR`, `CREATE_INSTANT_INVITE`, `KICK_MEMBERS`, `BAN_MEMBERS`, `MANAGE_GUILD`, `ADD_REACTIONS`, `VIEW_AUDIT_LOG`, `PRIORITY_SPEAKER`, `VIEW_CHANNEL`, `SEND_MESSAGES`, `MANAGE_MESSAGES`, `MENTION_EVERYONE`, `CONNECT`, `SPEAK`, `MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`, `CHANGE_NICKNAMES`, `MANAGE_ROLES`, `MANAGE_WEBHOOKS`, `MANAGEEMOJIS`].includes(args[1])) return message.channel.send(`**YOU NEED TO CHOOSE FROM THESE AVALIABLE VALUES** \n \`ADMINISTRATOR\` \`CREATE_INSTANT_INVITE\` \`KICK_MEMBERS\` \`BAN_MEMBERS\` \`MANAGE_CHANNELS\` \`MANAGE_GUILD\` \`ADD_REACTIONS\` \`VIEW_AUDIT_LOG\` \`PRIORITY_SPEAKER\` \`VIEW_CHANNEL\` \`SEND_MESSAGES\` \`MANAGE_MESSAGES\` \`MENTION_EVERYONE\` \`CONNECT\` \`SPEAK\` \`MUTE_MEMBERS\` \`DEAFEN_MEMBERS\` \`MOVE_MEMBERS\` \`CHANGE_NICKNAMES\` \`MANAGE_ROLES\` \`MANAGE_WEBHOOKS\` \`MANAGEEMOJIS\` \n \n \n (More Info At https://discord.com/developers/docs/topics/permissions )`);
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    AcceptPerm: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)
            } else if (`WarnPermission` === args[0]) {
                if (![`ADMINISTRATOR`, `CREATE_INSTANT_INVITE`, `KICK_MEMBERS`, `BAN_MEMBERS`, `MANAGE_GUILD`, `ADD_REACTIONS`, `VIEW_AUDIT_LOG`, `PRIORITY_SPEAKER`, `VIEW_CHANNEL`, `SEND_MESSAGES`, `MANAGE_MESSAGES`, `MENTION_EVERYONE`, `CONNECT`, `SPEAK`, `MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`, `CHANGE_NICKNAMES`, `MANAGE_ROLES`, `MANAGE_WEBHOOKS`, `MANAGEEMOJIS`].includes(args[1])) return message.channel.send(`**YOU NEED TO CHOOSE FROM THESE AVALIABLE VALUES** \n \`ADMINISTRATOR\` \`CREATE_INSTANT_INVITE\` \`KICK_MEMBERS\` \`BAN_MEMBERS\` \`MANAGE_CHANNELS\` \`MANAGE_GUILD\` \`ADD_REACTIONS\` \`VIEW_AUDIT_LOG\` \`PRIORITY_SPEAKER\` \`VIEW_CHANNEL\` \`SEND_MESSAGES\` \`MANAGE_MESSAGES\` \`MENTION_EVERYONE\` \`CONNECT\` \`SPEAK\` \`MUTE_MEMBERS\` \`DEAFEN_MEMBERS\` \`MOVE_MEMBERS\` \`CHANGE_NICKNAMES\` \`MANAGE_ROLES\` \`MANAGE_WEBHOOKS\` \`MANAGEEMOJIS\` \n \n \n (More Info At https://discord.com/developers/docs/topics/permissions )`);
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    WarnPerm: args[1],
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${args[1]}`)

            } else if (`AuditLogging` === args[0]) {
                if (![`enable`, `disable`].includes(args[1])) return message.channel.send(`You Must Either Choose One OF The Following Values: \n \`enable\` \`disable\` `);
                let hi = '1';
                if (args[1] === `disable`) {
                    hi = `disabled`
                }
                if (args[1] === `enable`) {
                    hi = `enabled`
                }
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    AuditLogging: hi,
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${hi}`)
            } else if (`Suggestions` || `Suggestion` === args[0]) {
                if (![`enable`, `disable`].includes(args[1])) return message.channel.send(`You Must Either Choose One OF The Following Values: \n \`enable\` \`disable\` `);
                let hi = '1';
                if (args[1] === `disable`) {
                    hi = `disabled`
                }
                if (args[1] === `enable`) {
                    hi = `enabled`
                }
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    Suggest: hi,
                    lastEdited: Date.now()
                })
                message.channel.send(`Updated ${args[0]} to ${hi}`)
            }
        }

    }
}
//\`Prefix\` \`EmbedColor\` \`LogChannel\` \`SuggestChannel\` \`AuditlogChannel\