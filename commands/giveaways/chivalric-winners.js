import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';

export default new PrefixCommand({
  name: 'chivalric-winners',
  description: 'Randomly chooses winners for the Chivalric Blossoms giveaways.',
  args: [{
    type: PrefixCommandOptionType.INTEGER,
    name: 'amount',
    description: 'The amount of winners to choose.',
    required: true,
  }],
}, async (message, { args: { amount } }) => {
  if (!message.member.roles.resolve(process.env.MODS)) return message.reply('You need to be a mod to use this command.');
  const contestants = message.guild.members.cache.filter(member => member.roles.resolve(process.env.CHIVALRIC_BLOSSOMS));
  const sorted = contestants.sort(() => Math.random() - 0.5);
  const winners = sorted.first(amount);

  return message.reply(Object.assign(DME.render(`
    ---
    color: 0xe17f93
    ---
    
    # Chivalric Blossoms Winners
    ${winners.map(winner => winner.user.tag).join(', ')}
  `).messages()[0], {
    files: [{
      attachment: Buffer.from(sorted.map(member => `${member.user.tag} (${member.user.id})`).join('\n'), 'utf8'),
      name: 'all.txt',
    }],
  }));
});