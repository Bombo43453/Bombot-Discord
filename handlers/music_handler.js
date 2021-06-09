const fs = require("fs")
module.exports = (client, Discord) => {
    const music = fs.readdirSync(`./music/`).filter(file => file.endsWith(`.js`));
    for (const file of music) {

        console.log(`Loading Music Event: ${file}`);
        const event = require(`../music/${file}`);
        client.player.on(file.split(".")[0], event.bind(null, client));
    }
}