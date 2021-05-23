const Discord = require(`discord.js`)
module.exports = (client, error, message, ...args) => {
    let errmbed = 0
    switch (error) {
        case 'NotPlaying':
            errmbed = new Discord.MessageEmbed()
                .setTitle(`No More Music Is Being Played`)
                .setDescription(`To Save BandWith, I Have Left As There Is No More Music Left In The Queue`)
                .setColor(`RED`)
            message.channel.send(errmbed);
            break;
        case 'NotConnected':
            errmbed = new Discord.MessageEmbed()
                .setTitle(`Uh Oh`)
                .setDescription(`You Are Not Connected To A Voice Channel \n Please Connect To A Voice Channel And Try Againi`)
                .setColor(`RED`)
            message.channel.send(errmbed);
            break;
        case 'UnableToJoin':
            errmbed = new Discord.MessageEmbed()
                .setTitle(`Uh Oh`)
                .setDescription(`I Am Not Able To Join The Voice Channel You Are Currently Connected To \n It Is Most Likely That I Do Not Have Permissions!!`)
                .setColor(`RED`)
            message.channel.send(errmbed);
            break;
        case 'VideoUnavailable':
            let song = args[0]
            errmbed = new Discord.MessageEmbed()
                .setTitle(`Uh Oh`)
                .setDescription(`This Current Title Is Not Avaliable \n Make Sure It Is Avaliable Your Country \n Song Title: ${song.title}`)
                .setColor(`RED`)
            message.channel.send(errmbed);
            break;
        case 'MusicStarting':
            errmbed = new Discord.MessageEmbed()
                .setTitle(`Please Wait`)
                .setDescription(`Song Is Currently Starting, Please Wait A Few Moments And Retry`)
                .setColor(`RED`)
            message.channel.send(errmbed);
            break;
        default:
            errmbed = new Discord.MessageEmbed()
                .setTitle(`Fatal Error Has Occured`)
                .setDescription(`Please Report The Following Error With \`(prefix)botbug\` \n Error: \n \`${error}\``)
                .setColor(`RED`)
            message.channel.send(errmbed);
    };
};
