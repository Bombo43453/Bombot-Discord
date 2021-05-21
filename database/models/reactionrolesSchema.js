const mongoose = require(`mongoose`);

const reactionroleSchema = new mongoose.Schema({
    Guild: String, 
    Message: String,
    Roles: Object,
})

module.exports = mongoose.model(`reaction-roles`, reactionroleSchema);