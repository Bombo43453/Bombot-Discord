const mongoose = require(`mongoose`)

const guildSchema = new mongoose.Schema({
    guildID: String,
    lastEdited: String,
    guildName: String,
    prefix: { type: String, default: process.env.PREFIX},
    EmbedColor: { type: String, default: process.env.EMBEDCOLOR},
    LogChannel: { type: String, default: `Not Set!!!, Please Set With (prefix)settings LogChannel (Channel ID)`},
    SuggestChannel: { type: String, default: `Not Set!!!, Please Set With (prefix)settings SuggestChannel (Channel ID)`},
    MessageLog: { type: String, default: `Not Set!!!, Please Set With (prefix)settings AuditLogChannel (Channel ID)`},
    BanPerm: { type: String, default: process.env.BANPERM},
    PurgePerm: { type: String, default: process.env.PURGE},
    SayPerm: { type: String, default: process.env.SAYPERM},
    MutePerm: {type: String, default: process.env.MUTEPERM},
    CeasePerm: {type: String, default: process.env.CEASE},
    AcceptPerm: {type: String, default: process.env.ACCEPTSUGGEST},
    KickPerm: {type: String, default: process.env.KICKPERM},
    WarnPerm: {type: String, default: process.env.WARN},
    Suggest: {type: String, default: `disabled`},
    AuditLogging: {type: String, default: `disabled`},
});
const modle = mongoose.model(`Guild`, guildSchema, `guilds`);

module.exports = modle;
// module.exports = new mongoose.model(`Guild`, guildSchema, `guilds`)

// LOG= 833772327056441354
// SUGGEST= 836322596105748580
// BUG= 836325234679873606
// MSGLOG= 842123120478650399
// ERRORLOG= 843968397800898612
// BOTCOMMANDS= 843887133697376296

// PURGE= MANAGE_MESSAGES
// SAYPERM= MANAGE_MESSAGES
// BANPERM= BAN_MEMBERS
// MUTEPERM= MANAGE_MESSAGES
// CEASE= MANAGE_MESSAGES
// ACCEPTSUGGEST= MANAGE_MESSAGES
// KICKPERM = KICK_MEMBERS