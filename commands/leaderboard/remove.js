import { CommandFlagsBitField, PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';

export default new PrefixCommand({
  name: 'remove',
  flags: [CommandFlagsBitField.Flags.OWNER_ONLY],
  args: [{
    type: PrefixCommandOptionType.USER,
    name: 'user',
    required: true,
  }],
}, async (message, { args }) => {
  const deleted = message.client.leaderboard.cache.delete(args.user.id);
  return message.reply({
    content: `${args.user} ${deleted ? 'was removed from' : 'is not on'} the leaderboard.`,
    allowedMentions: { parse: [], repliedUser: false },
  });
});