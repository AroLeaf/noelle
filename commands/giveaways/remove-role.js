import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';

export default new PrefixCommand({
  name: 'remove-role',
  description: 'Removes a role from all members that have it.',
  args: [{
    type: PrefixCommandOptionType.ROLE,
    name: 'role',
    description: 'The role to remove from all members.',
    required: true,
  }],
}, async (message, { args: { role } }) => {
  const members = message.guild.members.cache.filter(member => member.roles.resolve(role.id));
  const reply = await message.reply(`Removing role from ${members.size} members...`);

  for (const member of members.values()) {
    await member.roles.remove(role);
  }

  await reply.edit(`Role removed from all members!`);
});