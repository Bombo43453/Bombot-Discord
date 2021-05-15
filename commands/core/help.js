module.exports = {
    name: "help",
    description: "Help with commands",
    execute(client, message, args, Discord){
		const query = args[0];
    if(!query){
      const helpembed = new Discord.MessageEmbed()
        .setTitle(`Help`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
        .setDescription(`Prefix Is { ${process.env.PREFIX} }`)
    }
    }
}

