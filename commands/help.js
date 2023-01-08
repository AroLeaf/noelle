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
  `).messages()[0], {}));

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
  `).messages()[0], {}));
});