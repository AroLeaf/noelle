import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';
import { constants, EnkaError, Noelle, weapons, artifacts } from '../../lib/leaderboard/index.js';

export default new PrefixCommand({
  name: 'build',
  description: `
    Shows the build of a user. This will be their current build, and might not match the build they submitted to the leaderboard.
    
    # \`[user]\`
    Can be either a discord user (mention or ID), or a Genshin UID. If a discord user is given, it tries to get their UID from the leaderboard's cache.
    If no user is given, it defaults to the user who issued the command.
  `,
  options: [{
    name: 'cached',
    description: 'Show the build the user is on the leaderboard with instead of fetching their current build.',
  }],
  args: [{
    type: PrefixCommandOptionType.USER,
    name: 'user',
  }, {
    type: PrefixCommandOptionType.INTEGER,
    name: 'uid',
  }],
}, async (message, { args, options }) => {
  const reply = content => message.reply({ content, allowedMentions: { parse: [], repliedUser: false } });

  const user = args.user || message.author;
  const uid = args.uid?.toString() || message.client.leaderboard.cache.get(user.id)?.uid;

  if (!uid) return reply(`A cached UID could not be found for ${args.user ? 'the given user' : 'you'}.`);

  const noelle = options.cached ? (args.uid ? message.client.leaderboard.cache.find(entry => entry.uid === uid) : message.client.leaderboard.cache.get(user.id))?.noelle : await message.client.leaderboard.getBuild(uid).catch(async err => {
    if (!(err instanceof EnkaError)) throw err;
    return reply({
      [constants.ENKA_ERRORS.INVALID_UID]:          'The provided UID is invalid, or there is no user with that UID.',
      [constants.ENKA_ERRORS.NO_CHARACTER_DETAILS]: 'Your character details are hidden.',
      [constants.ENKA_ERRORS.CHARACTER_NOT_PUBLIC]: 'You don\'t have Noelle in your public characters.',
    }[err.code]);
  });
  if (!noelle) return reply('A leaderboard entry could not be found for the given user.');
  if (!(noelle instanceof Noelle)) return;

  const artifactStats = {}
  for (const [k, v] of noelle.artifacts.flatMap(i => Object.entries(i.stats))) {
    artifactStats[k] ??= 0;
    artifactStats[k] += v;
  }
  const artifactSets = Object.entries(noelle.artifactSets).filter(([,v]) => v > 1);

  const damage = noelle.getDamage(constants.NAMELESS);
  const burstStats = noelle.burstStats;
  
  const leaderboard = message.client.leaderboard.query({ er: 120 }).sort((a, b) => b.noelle.getDamage(constants.NAMELESS).average - a.noelle.getDamage(constants.NAMELESS).average);
  const position = leaderboard?.toJSON().findIndex(entry => entry.uid === uid) + 1;

  return message.reply(Object.assign(DME.render(`
    ---
    color: 0xe17f93
    ---
    # ${args.uid || user.tag}'s Noelle

    Leaderboard position: ${position ? `#**${position}**` : '**User is not on the leaderboard**'}.

    - Character LVL: **${noelle.lvl}**/${[20, 40, 50, 60, 70, 80, 90][noelle.ascension]}
    - Constellation LVL: **${noelle.constellations}**
    - Friendship LVL: **${noelle.friendship}**
    - Talent LVLs: **${noelle.talentLevels.normal}**/**${noelle.talentLevels.skill}**/**${noelle.talentLevels.burst}**

    # Stats During Burst
    - HP: **${burstStats.HP?.toFixed(0) || 'Not Found'}**
    - ATK: **${burstStats.ATK.toFixed(0)}**
    - DEF: **${burstStats.DEF.toFixed(0)}**
    - Crit Rate: **${(burstStats.CR * 100).toFixed(1)}%**
    - Crit DMG: **${(burstStats.CD * 100).toFixed(1)}%**
    - ER: **${(burstStats.ER * 100).toFixed(1)}%**
    - Geo DMG Bonus: **${(burstStats.GeoDMG * 100 || 0).toFixed(1)}%**

    #-Weapon
    - Weapon: **${weapons[noelle.weapon.id].name}**
    - LVL: **${noelle.weapon.lvl}**/${[20, 40, 50, 60, 70, 80, 90][noelle.weapon.ascension]}
    - Refinement: **${noelle.weapon.refinement + 1}**
    - ATK: **${noelle.weapon.ATK || 'Not Found'}**
    ${Object.entries(noelle.weapon.stats).map(([k, v]) => constants.PERCENT_PROPS.includes(k)
      ? `- ${constants.PROPER_PROP_NAMES[k]}: **${(v * 100).toFixed(1)}%**`
      : `- ${constants.PROPER_PROP_NAMES[k]}: **${v.toFixed(0)}**`
    ).join('\n')}

    #-Artifacts
    - CV: **${((artifactStats.CR * 2 + artifactStats.CD) * 100).toFixed(1)}**
    - ${artifactSets.length > 1 ? 'Sets' : 'Set'}: ${artifactSets.map(([k, v]) => `**${artifacts[k].name} (${v})**`).join(', ')}
    - Main Stats: ${noelle.artifacts.filter(a => a.mainStat && !['HP', 'ATK'].includes(a.mainStat)).map(a => `**${constants.PROPER_PROP_NAMES[a.mainStat]}${a.mainStat.startsWith('P') ? '%' : ''}**`).join('/') || '**Not found**'}

    # Damage
    - No crit: **${Math.round(damage.noCrit)}**
    - Crit: **${Math.round(damage.crit)}**
    - Average: **${Math.round(damage.average)}**
  `).messages()[0], {
    allowedMentions: { parse: [], repliedUser: false },
  }));
});