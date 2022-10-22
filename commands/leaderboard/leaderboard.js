import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';

export default new PrefixCommand({
  name: 'leaderboard',
  description: 'View the Noelle Mains leaderboard.',
  options: [{
    type: PrefixCommandOptionType.NUMBER,
    name: 'er',
    description: 'Energy recharge requirement, percentage',
  }],
}, async (message, args) => {
  const ER = args.get('er');
  const top = message.client.leaderboard.toJSON()
    .filter(doc => !ER || doc.noelle.stats.parsed.ER >= (ER / 100))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  return message.reply({ embeds: [{
    title: `Noelle Mains Leaderboard ${ER ? `(≥${ER}% ER)` : ''}`,
    description: top.map((doc, i) => `#**${i + 1}**: **${Math.round(doc.score)}** by <@${doc.user}>`).join('\n'),
    color: 0xe17f93,
  }] });
});