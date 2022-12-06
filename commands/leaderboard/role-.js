import { CommandFlagsBitField, PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import { update } from '../../lib/roles.js';

export default new PrefixCommand({
  name: 'role-',
  description: 'Unlink roles from the leaderboards.',
  flags: [CommandFlagsBitField.Flags.OWNER_ONLY],
  args: [{
    type: PrefixCommandOptionType.ROLE,
    name: 'role',
    description: 'The role to unlink from the leaderboards.',
    required: true,
  }],
}, async (message, { args }) => {
  const reply = content => message.reply({ content, allowedMentions: { parse: [], repliedUser: false } });

  await message.client.db.roles.deleteOne({ role: args.role.id });
  await update(message.guild);
  return reply(`Successfully unlinked ${args.role} from the leaderboards.`);
});