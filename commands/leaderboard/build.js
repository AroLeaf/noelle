import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';
import { constants, Noelle } from '../../lib/leaderboard/index.js';

export default new PrefixCommand({
  name: 'build',
  args: [{
    type: PrefixCommandOptionType.USER,
    name: 'user',
  }, {
    type: PrefixCommandOptionType.INTEGER,
    name: 'uid',
  }],
}, async (message, { args }) => {
  const reply = content => message.reply({ content, allowedMentions: { parse: [], repliedUser: false } });

  const user = args.user || message.author;
  const uid = args.uid?.toString() || message.client.leaderboard.cache.get(user.id)?.uid;

  if (!uid) return reply(`A cached UID could not be found for ${args.user ? 'the provided user' : 'you'}.`);

  const noelle = await message.client.leaderboard.getBuild(uid).catch(async err => {
    if (!(err instanceof EnkaError)) throw err;
    return reply({
      [constants.ENKA_ERRORS.INVALID_UID]:          'The provided UID is invalid, or there is no user with that UID.',
      [constants.ENKA_ERRORS.NO_CHARACTER_DETAILS]: 'Your character details are hidden.',
      [constants.ENKA_ERRORS.CHARACTER_NOT_PUBLIC]: 'You don\'t have Noelle in your public characters.',
    }[err.code]);
  });
  if (!(noelle instanceof Noelle)) return;

  const artifactStats = {}
  for (const [k, v] of noelle.artifacts.flatMap(i => Object.entries(i.stats))) {
    artifactStats[k] ??= 0;
    artifactStats[k] += v;
  }

  const damage = noelle.getDamage(constants.NAMELESS);
  
  const leaderboard = message.client.leaderboard.query({ er: 120 }).sort((a, b) => b.noelle.getDamage(constants.NAMELESS).average - a.noelle.getDamage(constants.NAMELESS).average);
  const position = leaderboard?.toJSON().findIndex(entry => entry.uid === uid) + 1;

  return message.reply(Object.assign(DME.render(`
    ---
    color: 0xe17f93
    ---
    # ${args.uid || user.tag}'s build

    Leaderboard position: ${position ? `#**${position}**` : '**User is not on the leaderboard**'}.

    #-Stats During Burst
    - HP: **${Math.round(noelle.burstStats.HP)}**
    - ATK: **${Math.round(noelle.burstStats.ATK)}**
    - DEF: **${Math.round(noelle.burstStats.DEF)}**
    - Crit Rate: **${Math.round(noelle.burstStats.CR * 100)}%**
    - Crit DMG: **${Math.round(noelle.burstStats.CD * 100)}%**
    - ER: **${Math.round(noelle.burstStats.ER * 100)}%**
    - Geo DMG Bonus: **${Math.round(noelle.burstStats.GeoDMG * 100 || 0)}%**

    #-Damage
    - No crit: **${Math.round(damage.noCrit)}**
    - Crit: **${Math.round(damage.crit)}**
    - Average: **${Math.round(damage.average)}**

    #-Crit Value
    **${Math.round((artifactStats.CR * 2 + artifactStats.CD) * 100)}**
  `).messages()[0], {
    allowedMentions: { parse: [], repliedUser: false },
  }));
});