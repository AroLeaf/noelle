import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import { EnkaError, constants, Noelle } from '../../lib/leaderboard/index.js';

export default new PrefixCommand({
  name: 'submit',
  options: [{
    name: 'force',
    short: 'f',
  }],
  args: [{
    type: PrefixCommandOptionType.INTEGER,
    name: 'uid', 
    required: true,
  }],
}, async (message, { args, options }) => {
  const reply = content => message.reply({ content, allowedMentions: { parse: [], repliedUser: false } });

  const old = message.client.leaderboard.cache.get(message.author.id)?.noelle;

  const noelle = await message.client.leaderboard.getBuild(args.uid).catch(async err => {
    if (!(err instanceof EnkaError)) throw err;
    return reply({
      [constants.ENKA_ERRORS.INVALID_UID]:          'The provided UID is invalid, or there is no user with that UID.',
      [constants.ENKA_ERRORS.NO_CHARACTER_DETAILS]: 'Your character details are hidden.',
      [constants.ENKA_ERRORS.CHARACTER_NOT_PUBLIC]: 'You don\'t have Noelle in your public characters.',
    }[err.code]);
  });
  if (!(noelle instanceof Noelle)) return;

  const score = noelle.getDamage(constants.NAMELESS).average;
  const oldScore = old?.getDamage(constants.NAMELESS).average;
  const ratio = score / oldScore;
  if (ratio < 1 && !options.force) return reply(`Your new build (**${Math.round(score)}**) is **${Math.round((1 - ratio) * 100)}%** worse than your current build (**${Math.round(oldScore)}**). You can use the \`--force\` flag to force it to update it anyway.`);
  
  await message.client.leaderboard.submit(message.author.id, args.uid, noelle);
  await message.client.db.noelles.updateOne({ user: message.author.id }, {
    uid: args.uid,
    noelle: noelle.toJSON(),
  }, { upsert: true });

  const leaderboard = message.client.leaderboard.query({ er: 120 }).sort((a, b) => b.noelle.getDamage(constants.NAMELESS).average - a.noelle.getDamage(constants.NAMELESS).average);
  const position = leaderboard.toJSON().findIndex(entry => entry.user === message.author.id) + 1;

  const strings = {
    position: position ? `at #**${position}**` : 'not on the leaderboard, maybe your Energy Recharge is too low?',
    score: Math.round(score),
    oldScore: Math.round(oldScore),
    difference: `**${Math.round(Math.abs(ratio - 1) * 100)}%** ${ratio < 1 ? 'worse' : 'better'}`,
  }

  return reply(!old 
    ? `Your score is **${strings.score}**, you are ${strings.position}` : ratio === 1
    ? `Your builds are equal (**${strings.score}**), but your build has been updated, since you may have other improved stats. You are ${strings.position}`
    : `Your new build (**${strings.score}**) is ${strings.difference} than your old build (**${strings.oldScore}**). You are ${strings.position}`
  );
});