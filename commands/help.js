import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';

export default new PrefixCommand({
  name: 'help',
  description: 'Get info about a command, or a list of commands.',
  options: [{
    type: PrefixCommandOptionType.STRING,
    name: 'command',
    description: 'the name of the command to get info about',
  }],
}, async (message, args) => {
  if (!args.has('command')) return message.reply({
    embeds: [{
      title: 'Commands:',
      description: message.client.commands.prefixCommands.map(cmd => `\`${cmd.name}\``).join(', '),
      color: 0xe17f93,
    }],
  });

  const cmd = message.client.commands.resolvePrefixCommand(args.get('command'));
  return message.reply(cmd ? {
    embeds: [{
      title: cmd.name,
      description: cmd.description,
      fields: cmd.options?.length ? [{
        name: 'Options:',
        value: cmd.options?.map(option => `\`${option.name}\`: ${option.description}`).join('\n'),
      }] : undefined,
      color: 0xe17f93,
    }],
  } : 'Sorry, that\'s not one of my commands.');
});