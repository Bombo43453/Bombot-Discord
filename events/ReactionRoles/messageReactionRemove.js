

const Schema = require(`../../database/models/reactionrolesSchema`);

module.exports = async(client, reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch()
    if(user.bot) return; 

    Schema.findOne({ Message: reaction.message.id }, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.remove(roleid)
        user.send(`You Have lost a role, by reacting to a message. `)
    })
}