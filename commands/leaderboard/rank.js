import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';

export default new PrefixCommand({
  name: 'rank',
  description: 'View your rank on the leaderboard.',
  options: [{
    type: PrefixCommandOptionType.NUMBER,
    name: 'er',
    description: 'Energy recharge requirement, percentage',
  }],
}, async (message, args) => {
  const ER = args.get('er');
  const sorted = message.client.leaderboard.toJSON()
    .filter(doc => !ER || doc.noelle.stats.parsed.ER >= (ER / 100))
    .sort((a, b) => b.score - a.score);

  const doc = sorted.find(doc => doc.user === message.author.id);
  if (!doc) return message.reply('You are not on the leaderboard.');
  
  return message.reply({ embeds: [{
    title: `Your rank${ER ? ` (≥${ER}% ER)` : ''}: #${sorted.findIndex(doc => doc.user === message.author.id) + 1}`,
    description: `Score: **${Math.round(doc.score)}**`,
    color: 0xe17f93,
  }] });
});