import { PrefixCommand } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';

const render = DME.render(`
  ---
  color: 0xe17f93
  ---

  # Leaks
  Leaks are all content that is not officially released by miHoYo, and all information derived from leaks.
  This includes, but is not limited to unreleased characters, weapons, artifacts, and events,
  but also unknown information about confirmed content, such as unreleased talents, constellations, and stats, or overall performance of characters.

  # Where to post leaks
  Leaks should be posted in <#834899373086605423>\\
  **You are not allowed to post leaks in any other channel!**

  If you don't see the channel, you can get the required role here: <id:customize>.
`).messages()[0];

export default new PrefixCommand({
  name: 'leaks',
  description: 'Sends a message explaining what counts as a leak, and where leaks should be posted instead.',
}, async message => {
  return message.reply(render);
});