import { PermissionFlagsBits, PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';

export default new PrefixCommand({
  name: 'count-the-stars',
  description: 'counts star reacts on all messages in a channel',
  args: [{
    type: PrefixCommandOptionType.CHANNEL,
    name: 'channel',
    description: 'the channel to count star reacts in',
    required: true,
  }],
}, async (message, { args: { channel } }) => {
  if (!message.member.permissionsIn(channel).has([PermissionFlagsBits.ManageMessages])) return message.reply('You need to have the Manage Messages permission in that channel to use this command.');
  const reply = await message.reply('Fetching messages...');

  const messages = [];
  let oldest = message.id;
  while (oldest) {
    const chunk = await message.client.channels.resolve(channel)?.messages.fetch({ limit: 100, before: oldest });
    messages.push(...chunk?.values() || []);
    oldest = chunk?.last()?.id;
    if (!chunk?.size) break;
  }

  await reply.edit(`Fetched ${messages.length} messages, counting stars...`);

  const users = Object.fromEntries(await Promise.all(messages.map(async message => {
    const users = await message.reactions.cache.get('⭐')?.users.fetch();
    return [message.id, users?.filter(u => u.id !== message.author.id).map(u => u.tag)];
  })));
  
  const counts = messages.sort((a, b) => {
    const aCount = users[a.id]?.length || 0;
    const bCount = users[b.id]?.length || 0;
    return bCount - aCount;
  })?.map(message => [message.author, users[message.id]?.length]);

  return reply.edit(DME.render(`
    ---
    color: 0xe17f93
    ---

    # I counted the stars, and there are many
    ${counts.filter(([,count]) => count).map(([author, count]) => `- ${author.tag}: ${count} ⭐`).join('\n')}
  `).messages()[0]);
});