import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';

export default new PrefixCommand({
  name: 'help',
  description: 'Get info about a command, or a list of commands.',
  args: [{
    type: PrefixCommandOptionType.STRING,
    name: 'command',
    description: 'the name of the command to get info about',
  }],
}, async (message, { args }) => {
  if (!args.command) return message.reply(Object.assign(DME.render(`
    ---
    color: 0xe17f93
    ---
    # Commands
    ${message.client.commands.prefixCommands.map(cmd => `\`${cmd.name}\``).join(', ')}
  `).messages()[0], { allowedMentions: { parse: [], repliedUser: false } }));


  if (args.command === 'chivalric-blossoms') return message.reply(Object.assign(DME.render(`
    ---
    color: 0xe17f93
    ---
    # /chivalric-blossoms
    **NOTE:** This is a slash command, to ensure the safety of your data.
    Get the Chivalric Blossoms role. Requirement: 36-star the Spiral Abyss using Noelle in every chamber.

    # \`cookies\`
    Your Hoyolab cookies. These can be obtained as follows:
    
    - go to [your battle chronicle](https://act.hoyolab.com/app/community-game-records-sea/index.html#/ys)
    - open the browser developer console, this can usually be done with \`ctrl+shift+j\` / \`cmd+shift+j\` on Chrome, or with \`ctr+shift+i\` / \`cmd+shift+i\` and going to the "console" tab on most browsers.
    - paste \`copy(document.cookies)\` and press enter
    
    Your cookies will now be on your clipboard.

    **WARNING!** Only give this bot your cookies if you trust me, its developer, Leaf#1950, admin of Noelle Mains!
    **I promise I don't store these cookies, or use them for anything else than running the required checks for this command.**
    Having these cookies does **not** allow me to block you out of your account, and does **not** give me access to your Genshin account, only to your Hoyolab account.
  `).messages()[0], { allowedMentions: { parse: [], repliedUser: false } }));


  const cmd = message.client.commands.resolvePrefixCommand(args.command);
  if (!cmd) return message.reply({ content: 'Sorry, that\'s not one of my commands.', allowedMentions: { parse: [], repliedUser: false } });

  return message.reply(Object.assign(DME.render(`
    ---
    color: 0xe17f93
    footer: <> means required, [] means optional, don\'t actually include <> and [] in the command. Arguments with spaces should be surrounded by quotes "like so".
    ---
    # ${cmd.name}
    ${cmd.description || ''}

    ${cmd.args?.filter(arg => arg.description).map(arg => `
      # \`${arg.required ? `<${arg.name}>` : `[${arg.name}]`}\`
      ${arg.description || ''}
    `).join('\n') || ''}

    ${cmd.options?.filter(option => option.description).map(option => `
      # \`--${option.name} ${option.args?.map(arg => arg.required ? `<${arg.name}>` : `[${arg.name}]`) || ''}\`
      ${option.description || ''}
      ${option.args?.filter(arg => arg.description).map(arg => `\`${arg.name}\`: ${arg.description}`).join('\n') || ''}
    `).join('\n') || ''}
  `).messages()[0], { allowedMentions: { parse: [], repliedUser: false } }));
});