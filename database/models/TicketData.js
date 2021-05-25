const mongoose = require(`mongoose`)

const TicketDataSchema = new mongoose.Schema({
    MessageID: String,
    GuildID: String,
    TicketNumber: Number,
    WhitelistedRole: String,
    TicketCat: {type: String, default: `N/A`},
})

const MessageModel = module.exports = mongoose.model('Ticket_Data', TicketDataSchema);