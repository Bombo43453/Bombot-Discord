const mongoose = require('mongoose');

let profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: false},
    serverID: { type: String, require: true, unique: false},
    coins: { type: Number, default: 50 },
    bank: { type: Number },
    content: { type: Array, required: false},
});

const modle = mongoose.model(`ProfileModels`, profileSchema);

module.exports = modle;