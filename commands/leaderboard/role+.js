import { CommandFlagsBitField, PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import Leaderboard from '../../lib/leaderboard/Leaderboard.js';
import { update } from '../../lib/roles.js';

export default new PrefixCommand({
  name: 'role+',
  aliases: ['r+'],
  description: 'Link roles to the leaderboards.',
  flags: [CommandFlagsBitField.Flags.OWNER_ONLY, CommandFlagsBitField.Flags.GUILD_ONLY],
  args: [{
    type: PrefixCommandOptionType.ROLE,
    name: 'role',
    description: 'The role to link to the leaderboards.',
    required: true,
  }, {
    type: PrefixCommandOptionType.STRING,
    name: 'type',
    description: 'The leaderboard type this role applies to.',
    required: true,
  }, {
    type: PrefixCommandOptionType.INTEGER,
    name: 'start',
    description: 'The highest position this role applies to.',
    required: true,
  }, {
    type: PrefixCommandOptionType.INTEGER,
    name: 'end',
    description: 'The lowest position this role applies to.',
  }],
}, async (message, { args }) => {
  const reply = content => message.reply({ content, allowedMentions: { parse: [], repliedUser: false } });

  if (!Leaderboard.mappers[args.type]) return reply('Invalid leaderboard type.');

  await message.client.db.roles.updateOne(
    { role: args.role.id },
    { type: args.type, start: args.start, end: args.start || args.end },
    { upsert: true },
  );

  await update(message.guild);
  return reply(`Successfully linked ${args.role} to \`${args.type}\` #**${args.end ? `${args.start}-${args.end}` : args.start}**.`);
});