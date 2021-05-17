module.exports = {
    name: `memetemplates`,
    aliases: [`memetemplate`],
    description: `Avaliable Meme Templates For ${process.env.PREFIX}creatememe`,
execute(client, message, args, Discord){
    const embed = new Discord.MessageEmbed()
        .setTitle("Available Meme Templates")
        .setDescription("`sohappy`,`tenguy`,`afraid`,`apcr`,`older`,`aag`,`atis`,`alyt`,`biw`,`stew`,`blb`,`bihw`,`kermit`,`bd`,`ch`,`cbg`,`wonka`,`cb`,`gandalf`,`keanu`,`cryingfloor`,`dsm`,`disastergirl`,`live`,`ants`,`doge`,`trump`,`drake`,`ermg`,`facepalm`,`feelsgood`,`firsttry`,`fwp`,`fa`,`fbf`,`fmr`,`fry`,`ggg`,`grumpycat`,`harold`,`hipster`,`icanhas`,`crazypills`,`elf`,`ackbar`,`agnes`,`aint-got-time`,`ams`,`away`,`awesome`,`captain`,`yuno`,`yodawg`,`whatyear`,`winter`,`tried`,`toohigh`,`success`,`spongebob`,`spiderman`,`sparta`,`snek`,`ski`,`soa`,`sadfrog`,`sad-obama`,`rollsafe`,`remembers`,`regret`,`red`,`mmm`,`money`,`patrick`,`nice`,`morpheus`,`joker`,`jetpack`,`imsorry`")
        .setTimestamp()
        .addField(`Usage Example`, `${process.env.PREFIX}creatememe facepalm Hello Bye`)
        .setThumbnail(`${process.env.SERVERLOGO}`)
        .setColor(`${process.env.EMBEDCOLOR}`);
    return message.channel.send(embed);
}
}