module.exports = {
    name: "creatememe",
    description: `Create Custom Memes do ${process.env.PREFIX}memetemplates for templates`,
    usage: `(template) (Top Text) (Bottom Test)`,
     async execute(client, message, args, Discord, errorlog){
        message.delete();
        const memetemplate = args[0];
        if (!memetemplate) {
            const notembed = new Discord.MessageEmbed()
                .setTitle(`You Did Not Mention A Template`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setDescription(`To See The avaliable meme Templates, Type: \`${process.env.PREFIX}memetemplates\``)
                .addField(`Usage`, `${process.env.PREFIX}creatememe (template) (Top Text) (Bottom Text)`)
            return message.channel.send(notembed);
        }
        const memetext1 = args[1];
        if (!memetext1) {
            topembed = new Discord.MessageEmbed()
                .setTitle(`Make Sure To Enter The Text To Be Placed On Top`)
                .setDescription(`A Meme Requires Top Text And A Bottom Text To Be Done (Duh)`)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .addField(`Usage`, `${process.env.PREFIX}creatememe (template) (Top Text) (Bottom Text)`)
            return message.channel.send(topembed);
        }
        const memetext2 = args[2];
        if (!memetext2) {
            bottomembed = new Discord.MessageEmbed()
                .setTitle(`Make Sure To Enter The Text To Be Placed On The Bottom`)
                .setDescription(`A Meme Requires Top Text And A Bottom Text To Be Done (Duh)`)
                .setColor(`${process.env.EMBEDCOLOR}`)
                .setThumbnail(`${process.env.SERVERLOGO}`)
                .addField(`Usage`, `${process.env.PREFIX}creatememe (template) (Top Text) (Bottom Text)`)
            return message.channel.send(bottomembed);
        }
        message.channel.send({ files: [{ attachment: `https://api.memegen.link/images/${memetemplate}/${memetext1}/${memetext2}`, name: "custommeme.png"}]})
    }, catch (error) {
        const errorlog = client.channels.cache.get(`${process.env.ERRORLOG}`)
        message.channel.send("Seems like an error has occured!. Please try again later")
        errorlog.send("Error on Creatememe command! \n\nError:\n\n"+error);
    }
}