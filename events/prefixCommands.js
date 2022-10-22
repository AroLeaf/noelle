import { Event, Events } from '@aroleaf/djs-bot';
import XRegExp from 'xregexp';

export default new Event({
  event: Events.MessageCreate,
}, async message => {
  if (message.guild?.id !== process.env.GUILD) return;
  const prefix = XRegExp(`^${XRegExp.escape(message.client.prefix)}`).exec(message.content)?.[0];
  if (!prefix) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift();
  const command = message.client.commands.resolvePrefixCommand(commandName);
  if (command) await command.execute(message, args);
});