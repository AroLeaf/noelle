import { PrefixCommand } from '@aroleaf/djs-bot';

export default new PrefixCommand({
  name: 'leaderboard',
  description: 'View the Noelle Mains leaderboard.',
}, async message => {
  const top = message.client.leaderboard.toJSON().sort((a, b) => b.score - a.score).slice(0, 10);
  return message.reply({ embeds: [{
    title: 'Noelle Mains Leaderboard',
    description: top.map((doc, i) => `#**${i + 1}**: **${Math.round(doc.score)}** by <@${doc.user}>`).join('\n'),
    color: 0xe17f93,
  }] });
});