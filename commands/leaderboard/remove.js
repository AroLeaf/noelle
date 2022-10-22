import { CommandFlagsBitField, PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';

export default new PrefixCommand({
  name: 'remove',
  flags: [CommandFlagsBitField.Flags.OWNER_ONLY],
  options: [{
    type: PrefixCommandOptionType.USER,
    name: 'user',
  }],
}, async (message, args) => {
  const user = args.get('user');
  await message.client.db.noelles.deleteOne({ user: user.id });
  message.client.leaderboard.delete(user.id);
  return message.reply(`**${user.tag}** was removed from the leaderboard.`);
});