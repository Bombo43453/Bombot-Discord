const math = require(`mathjs`)
module.exports = {
    name: `calculate`,
    description: `Calcute an expression`,
    usage: `(expression: (IE: 3+5 ))`,
    async execute(client, message, args, Discord, errorlog) {
if(!args[0]) return message.channel.send(`Please Provide A Question`)

let resp;

try{
    resp = math.evaluate(args.join(' '))
} catch (err){
    message.channel.send(`Please Provide A Valid Question`)
}

const embed = new Discord.MessageEmbed()
    .setColor(`${process.env.EMBEDCOLOR}`)
    .setTitle(`Calculator`)
    .addField(`Question`, `\`\`\`css\n${args.join(' ')}\`\`\``)
    .addField(`Answer`, `\`\`\`css\n${resp}\`\`\``)
message.channel.send(embed)
    }
}