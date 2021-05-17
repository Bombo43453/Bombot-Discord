module.exports = {
    name: "cease",
    description: "Cease A Conversation",
    usage: `(reason)`,
        async execute(client, message, args, Discord){
        message.delete();
        const reason = args.join(" ");
        const noembed = new Discord.MessageEmbed()
        .setTitle('ERROR')
        .setDescription(`${message.author}, You Are Missing Permissions`)
        .setFooter(`If You Think This Is A Mistake Contact A Developer (B.Mitchell)`)



        if (!message.member.hasPermission(`${process.env.CEASE}`)) return message.channel.send(noembed);
        if (!args[0]) return message.channel.send(`You Must Enter A Reason Usage: ${process.env.PREFIX}cease (reason)`).then (msg => msg.delete({timeout:3000}));


        message.channel.send(`
          :warning: CEASE YOUR Conversation
          A Person has called a cease line
          ================================
          If you do not cease this conversation expect a mute
          ++++++++++++++++++++++++++++++++++
          Please Do Not Bring This Conversation Up again
           `)

        const logembed = new Discord.MessageEmbed()
        .setColor(`${process.env.EMBEDCOLOR}`)
        .setTitle("A Cease line Was Called")
        .addField(`Staff Member:`, `${message.author.tag}`, false )
        .addField(`Channel:`, `<#${message.channel.id}>`, false)
        .addField(`Reason:`, `${reason}`, false)

        client.channels.cache.get(`${process.env.LOG}`).send(logembed)



    },
};
