const profileModel = require(`../../database/models/profileSchema`)
module.exports = {
    name: `addcoins123123`,
    description: `Give a player some coins`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData) {
        if (!message.member.permissions.has(`ADMINISTRATOR`)) return message.channel.send(`You Don't Have Permissions!!!!!`);
        if (!args.length) return message.channel.send(`You must mentioned a player to give them coins.`);
        const amount = args[1];
        const target = message.mentions.users.first();
        if (!target) return message.channel.send(`That user does not exist`)

        if (amount % 1 != 0 || amount <= 0) return message.channel.send(`Deposit amount must be a whole number`);

        try {
            const targetData = await profileModel.findOne({
                userID: target.id,
                serverID: message.guild.id,
            });
            if (!targetData) return message.channel.send(`This user does not exist in the database.`)

            await profileModel.findOneAndUpdate({
                userID: target.id,
                serverID: message.guild.id,
            }, {
                $inc: {
                    coins: amount,
                }
            })
            return message.channel.send(`This user has been given their coins. Amount: ${amount} coins`)
        } catch (err) {
            errorlog.send(`${err}`)
            console.log(err)
        }
    }
}