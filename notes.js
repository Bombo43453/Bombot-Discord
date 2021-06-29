let DataThing = 'No Data Found, Please Try Again';
if (!guildProfile.Blacklist) {
    DataThing = `Disabled \n\n Do ${guildProfile.prefix}setup Blacklist enable to enable this feature`
    console.log(`Added Data`)
    await Guild.findOneAndUpdate({
        guildID: message.guild.id
    }, {
        guildName: message.guild.name,
        Database: 'disabled',
        lastEdited: Date.now()
    })
}
if (guildProfile.Blacklist === `disabled`) {
    DataThing = `Disabled \n\n Do ${guildProfile.prefix}setup Database enable to enable this feature`
}

if (guildProfile.Blacklist === 'enabled') {
    DataThing = `Enabled \n\n (Blacklisted Words Change WIP)`
}



// //Split
//

// //Split
