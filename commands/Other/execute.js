const { exec } = require('child_process');
module.exports = {
    name: `execute`,
    aliases: [`exec`],
    description: `Execute Commands In The Console`,
async execute(client, message, args, Discord){
    let command = args.join(" ");
    if(!command) return message.channel.send(`Please Add A Command`)
    if (message.author.id !== (`338040350465851394`)) return message.channel.send(`You Cannot Use This, this is for Bombo43453 Only as it can break the bot :)`)
    if (message.author.id === (`338040350465851394`)) message.channel.send(`Welcome, Executing Command: \`${command}\``)
    try {exec(args.join(' '), (error, stdout) => {
        const response = stdout || error;
        message.channel.send(response, { split: true, code: true});
        })
    
    }catch (err){
        message.channel.send(err, {split: true, code: true})
    }
    
    }
    }
