const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "urbandictionary",
    aliases: ['urbandic', 'urban'],
    description: "looks up a work on the Urban Dictionary",
   async execute(client, message, args, Discord){
    let query = args.join(" ")
    if(!query) message.reply(' Please Specify A Word To Search For');

    query = encodeURIComponent(query);

    const { data: { list },
   } = await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`)

   const [ answer ] = list;
   message.channel.send (
       new MessageEmbed()
       .setTitle(answer.word)
       .setURL(answer.permalink)
       .setColor(`${process.env.EMBEDCOLOR}`)
       .addField("DEFINITION", trim(answer.definition))
       .addField("EXAMPLE", trim(answer.example))
       .addField("RATINGS", `${answer.thumbs_up} 👍 || ${answer.thumbs_down} 👎`)
   );
    }

};

function trim (input) {
    return input.length > 1024 ? `${input.slice (0, 1020)}...` : input;
}
