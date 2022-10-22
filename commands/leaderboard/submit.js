import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import { transformer, calculator, constants } from '../../lib/leaderboard/index.js';

export default new PrefixCommand({
  name: 'submit',
  description: 'Submit your Noelle for the leaderboard.',
  options: [{
    type: PrefixCommandOptionType.STRING,
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
  noelle.damage = calculator.damage(noelle, constants.NAMELESS);

  const old = message.client.leaderboard.get(message.author.id);
  if (old?.score >= noelle.damage.avg) return message.reply(`Your new score (**${Math.round(noelle.damage.avg)}**) is **${Math.round((1 - noelle.damage.avg / old.score) * 100)}**% worse than your old score (**${Math.round(old.score)}**), your old score was kept on the leaderboard.`);

  const doc = { uid, noelle, score: noelle.damage.avg };

  await message.client.db.noelles.updateOne({ user: message.author.id }, doc, { upsert: true });
  message.client.leaderboard.set(message.author.id, { ...doc, user: message.author.id });

  const position = message.client.leaderboard.toJSON().sort((a, b) => b.score - a.score).findIndex(n => n.user === message.author.id) + 1;

  return message.reply(old 
    ? `Your score was updated from **${Math.round(old.score)}** to **${Math.round(doc.score)}**, increasing by **${Math.round((noelle.damage.avg / old.score - 1) * 100)}**%, and placing you at #**${position}**.`
    : `Your score is **${Math.round(doc.score)}**, placing you at #**${position}**.`
  );
});