module.exports = {
    name: "help",
    description: "Help with commands",
    execute(client, message, args, Discord){
		const args = args[0];
    if(!args){
      const helpembed = new Discord.MessageEmbed()
        .setTitle(`Help`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
        .setDescription(`Prefix Is { ${process.env.PREFIX} }`)
    }
    }
}

