DisTube = require('distube');

module.exports = {
    name: `play`,
    description: `test`,
    aliases: [``],
    usage: ``,

async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
    distube.play(message, args.join(" "));
}
}