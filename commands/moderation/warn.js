const { Guild } = require("discord.js")
//const punishments = require('../../database/models/Warns')
module.exports = {
    name: "warn",
    description: "Warn A Player",
    async execute(client, message, args, Discord){
        if (!message.mentions.users.first()) {
            return message.reply('You Must Mention A User')
        };

        let toWarn = message.mentions.members.first() || message.guild.memberss.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        if(!message.member.hasPermission(`${process.env.WARNPERM}`)) {
            return message.reply("You Are Not Allowed To Warn Members!");
        };

        if(message.author.id === toWarn.id) return message.channel.send("You Can't Warn Yourself Thats Dumb Man");

        let reason = args.slice(1).join(" ")

        if(!reason) return message.channel.send('Please Provide A Reason!')

        // let data = await punishments.findOne({
        //     GuildID: message.guild.id,
        //     UserID:  toWarn.id
        // });

//embed below
        const warnembed = new Discord.MessageEmbed()
        .setTitle("WARNING ISSUED")
        .setDescription(`${toWarn} Has Been Warned`)
        .setAuthor(`Warning Issued By: ${message.author.tag}`, message.author.displayAvatarURL())
        .addFields(
            { name: 'Reason:', value: `${reason}` },
        )
//send thing below

        // if(data) {
        //     data.Punishments.unshift({
        //         PunishType: 'warn',
        //         Moderator: message.author.id,
        //         Reason: reason,
        //     });
        //     data.save();
        //     message.channel.send(warnembed);
        //     client.channels.cache.get(`${process.env.LOG}`).send(warnembed);
        //
        // } else if (!data) {
        //     let newData = new punishments({
        //         GuildID: message.guild.id,
        //         UserID: toWarn.id,
        //         Punishments: [{
        //             PunishType: 'Warn',
        //             moderator: message.author.id,
        //             Reason: reason,
        //         },],
        //     });
        //     newData.save();
        //ABOVE IS FOR DATABASE
            message.channel.send(warnembed);
            client.channels.cache.get(`${process.env.LOG}`).send(warnembed);
        }

    }
//}
