const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en' })
module.exports = {
    name: `tictactoe`,
    aliases: [`tictac`, `tictactoe`],
    description: `Simple TicTacToe Game`,
    usage: `(user/ leave blank for AI)`,
async execute(client, message, args, Discord){
    game.handleMessage(message);
    }
}