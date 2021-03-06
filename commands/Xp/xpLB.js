const Levels = require(`discord-xp`)

module.exports = {
    name: `Xpleaderboard`,
    aliases: [`lb`, `XpLb`],
    description: `Displays the servers top 10 leveled users.`,
    async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile) {
        if (guildProfile.Xp === `enabled`) {
            const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

            if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

            const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

            const lb = leaderboard.map(e => `\`${e.position}\`. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

            const leaderboardembed = new Discord.MessageEmbed()
                .setTitle(`Xp Leaderboard:`)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .setTimestamp()
                .setDescription(`\n\n${lb.join("\n\n")}`)
            message.channel.send(leaderboardembed);
        } else {
            message.channel.send(`Xp Is Not Enabled In This Guild, To Enable It Refer To ${guildProfile.prefix}setup`);
            return;
        }
    }
}