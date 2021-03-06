const fs = require(`fs`);
const prefix = `${process.env.PREFIX}`;
module.exports = {
  name: `help-mod`,
  aliases: [`mod-help`, `modcommands`, `moderation`, `helpmod`],
  execute(client, message, args, Discord) {
    if (!message.member.permissions.has(`MANAGE_NICKNAMES`)) return message.channel.send(`You Don't Have Permissions!!!!!`);
    const roleColor =
      message.guild.me.displayHexColor === "#000000" ?
      "#ffffff" :
      message.guild.me.displayHexColor;
    if (!args[0]) {
      let categories = [];

      const dirEmojis = {
        General: "📰",
        Fun: "🎉",
        core: '',
        ReactionRoles: `🎁`,
        Ticket: `🎫`,
        Welcome_Message: `🙋‍♂️`,
      }
      const ignoredCategories = ['General', 'Fun', `Xp`, `Economy`, `Music`, `Warn`];
      fs.readdirSync("./commands/").forEach((dir) => {
        if (ignoredCategories.includes(dir)) return;

        const editedName = `${dirEmojis[dir]} ${dir.toUpperCase()}`;
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.filter((command) => {
          let file = require(`../../commands/${dir}/${command}`);
          return !file.hidden;
        }).map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new Discord.MessageEmbed()
        .setTitle("Here Are My Commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help-mod ban\` followed by a command name to get more additional information on a command. For example: \`${prefix}help-mod ban\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true
          })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new Discord.MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help-mod\` for all of my moderation commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new Discord.MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases ?
          `\`${command.aliases.join("` `")}\`` :
          "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage ?
          `\`${prefix}${command.name} ${command.usage}\`` :
          `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description ?
          command.description :
          "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true
          })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }

  }
}