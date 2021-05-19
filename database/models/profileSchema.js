const mongoose = require('mongoose');

let profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    serverID: { type: String, require: true },
    coins: { type: Number, default: 50 },
    bank: { type: Number },
});

const modle = mongoose.model(`ProfileModels`, profileSchema);

module.exports = modle;