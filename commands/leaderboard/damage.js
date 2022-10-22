import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import { transformer, calculator, constants } from '../../lib/leaderboard/index.js';

export default new PrefixCommand({
  name: 'damage',
  description: 'Test the strength of your Noelle.',
  options: [{
    type: PrefixCommandOptionType.INTEGER,
    name: 'uid',
    description: 'your Genshin UID',
    required: true,
  }],
}, async (message, args) => {
  const uid = args.get('uid');
  if (!/^\d{9}$/.test(uid)) return message.reply('That\'s not a valid UID.');
  
  const data = await fetch(`https://enka.network/u/${uid}/__data.json`).then(res => res.json()).catch(() => {});
  if (!data) return message.reply('Something went wrong fetching the required data from enka.network, please try again later.');
  if (!data.playerInfo) return message.reply('That UID does not belong to a player.');
  if (!data.avatarInfoList) return message.reply('Please turn on "Show Character Details".');

  const enkaNoelle = transformer.getNoelle(data);
  if (!enkaNoelle) return message.reply('Please add Noelle to your visible characters.');

  const noelle = transformer.transform(enkaNoelle);
  noelle.stats.parsed = calculator.stats(noelle);
  const damage = calculator.damage(noelle, constants.NAMELESS);

  return message.reply(`Crit: **${damage.crit.toFixed(0)}**\nNo Crit: **${damage.noCrit.toFixed(0)}**\nAverage: **${damage.avg.toFixed(0)}**`);
});