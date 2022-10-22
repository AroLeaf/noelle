import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';

export default new PrefixCommand({
  name: 'leaderboard',
  description: 'View the Noelle Mains leaderboard.',
  options: [{
    type: PrefixCommandOptionType.NUMBER,
    name: 'er',
    description: 'Energy recharge requirement, percentage',
    strict: false,
  }, {
    type: PrefixCommandOptionType.STRING,
    name: 'sort',
    description: 'What to sort by.',
  }],
}, async (message, args) => {
  const ER = args.get('er');
  const sort = args.get('sort') || 'average';
  if (!['crit', 'nocrit', 'average'].includes(sort)) return message.reply('That is not a valid thing to sort by.');
  
  const top = message.client.leaderboard.toJSON()
    .filter(doc => !ER || doc.noelle.stats.parsed.ER >= (ER / 100))
    .sort((a, b) => {
      switch (sort) {
        case 'average': return b.score - a.score;
        case 'crit': return b.noelle.damage.crit - a.noelle.damage.crit;
        case 'nocrit': return b.noelle.damage.noCrit - a.noelle.damage.noCrit;
      }
    })
    .slice(0, 10);
  
  return message.reply({ embeds: [{
    title: `Noelle Mains Leaderboard ${ER ? `(≥${ER}% ER)` : ''}`,
    description: top.map((doc, i) => `#**${i + 1}**: **${Math.round({
      average: doc.score,
      crit: doc.noelle.damage.crit,
      nocrit: doc.noelle.damage.noCrit,
    }[sort])}** by <@${doc.user}>`).join('\n'),
    color: 0xe17f93,
  }] });
});