import { Event, Events } from '@aroleaf/djs-bot';
import XRegExp from 'xregexp';

export default new Event({
  event: Events.MessageCreate,
}, async message => {
  if (message.guild?.id !== process.env.GUILD) return;
  const prefix = XRegExp(`^${XRegExp.escape(message.client.prefix)}`).exec(message.content)?.[0];
  if (!prefix) return;

  const [commandName, args = ''] = message.content.slice(prefix.length).split(/ +(.*)/s);
  const command = message.client.commands.resolvePrefixCommand(commandName);
  if (command) await command.execute(message, args);
});