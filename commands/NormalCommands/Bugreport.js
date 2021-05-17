module.exports = {
    name: "bugreport",
    description: "Report A Bug",
async execute(client, message, args, Discord){
  //  const owner = client.users.cache.get(`${process.env.OWNER}`);

    const query = args.join(" ");
    if(!query) return message.reply('Please Specify A Query');

    let proof = args[1];



    const reportEmbed = new Discord.MessageEmbed()
    .setTitle('NEW BUG 🐛!')
    .addField('Author', message.author.toString(), true)
    .addField('Report', query)
    .setTimestamp()
    .setColor(`${process.env.EMBEDCOLOR}`)

    client.channels.cache.get(`${process.env.BUG}`).send(reportEmbed)
}

}
