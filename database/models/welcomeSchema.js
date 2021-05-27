const mongoose = require(`mongoose`);

const welcomeData = new mongoose.Schema({
    guildID: String,
    ByeMsg: {type: String, required: false},
    ByeChannel: {type: String, required: false},
    WelcomeMsg: {type: String, required: false},
    WelcomeChannel: {type: String, required: false},
})

const welcomeModel = module.exports = mongoose.model(`Welcome_Data`, welcomeData)