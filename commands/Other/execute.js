const { exec } = require('child_process');
module.exports = {
    name: `execute`,
    hidden: true,
    aliases: [`exec`],
    description: `Execute Commands In The Console (Owner, Bot Devs Only)`,
    usage: `(arg)`,
async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
    let command = args.join(" ");
    if(!command) return message.channel.send(`Please Add A Command`)
    if (message.author.id !== (`338040350465851394`)) return message.channel.send(`You Cannot Use This, this is for Bombo43453 Only as it can break the bot :)`)
    if (message.author.id === (`338040350465851394`)) message.channel.send(`Welcome, Executing Command: \`${command}\``)
    try {exec(args.join(' '), (error, stdout) => {
        const response = stdout || error;
        message.channel.send(response, { split: true, code: true});
        })
    
    }catch (err){
        errorlog.send(`${err}`)
        message.channel.send(err, {split: true, code: true})
    }
    
    }
    }
