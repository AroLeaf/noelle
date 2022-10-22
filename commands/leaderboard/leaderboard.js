import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';

const sortOptions = [
  'crit',
  'nocrit',
  'average',
  'def',
  'atk',
  'er',
];

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
  const sort = args.get('sort')?.toLowerCase() || 'average';
  if (!sortOptions.includes(sort)) return message.reply('That is not a valid thing to sort by.');
  
  function getEndStats(noelle) {
    const noelleStats = { ...noelle.stats.parsed };

    // geo resonance
    enemy.stats.Res.Geo -= 0.2;
    noelleStats.DMG ??= 0;
    noelleStats.DMG += 0.15;

    // burst
    const DEFBonus = [ 0.40, 0.43, 0.46, 0.50, 0.53, 0.56, 0.60, 0.64, 0.68, 0.72, 0.76, 0.80, 0.85, 0.90 ][noelle.talentLevels.burst - 1] + (noelle.constellations === 6) * 0.5;
    noelleStats.ATK += noelleStats.DEF * DEFBonus;
    return noelleStats;
  }

  const top = message.client.leaderboard.toJSON()
    .filter(doc => !ER || doc.noelle.stats.parsed.ER >= (ER / 100))
    .sort((a, b) => {
      switch (sort) {
        case 'average': return b.score - a.score;
        case 'crit': return b.noelle.damage.crit - a.noelle.damage.crit;
        case 'nocrit': return b.noelle.damage.noCrit - a.noelle.damage.noCrit;
        case 'def': return b.noelle.stats.parsed.DEF - a.noelle.stats.parsed.DEF;
        case 'atk': return getEndStats(b.noelle).ATK - getEndStats(a.noelle).ATK;
        case 'er': return b.noelle.stats.parsed.ER - a.noelle.stats.parsed.ER;
      }
    })
    .slice(0, 10);
  
  return message.reply({ embeds: [{
    title: `Noelle Mains Leaderboard ${ER ? `(≥${ER}% ER)` : ''}`,
    description: top.map((doc, i) => `#**${i + 1}**: **${Math.round({
      average: doc.score,
      crit: doc.noelle.damage.crit,
      nocrit: doc.noelle.damage.noCrit,
      def: doc.noelle.stats.parsed.DEF,
      atk: getEndStats(doc.noelle).ATK,
      er: doc.noelle.stats.parsed.ER,
    }[sort])}** by <@${doc.user}>`).join('\n'),
    color: 0xe17f93,
  }] });
});