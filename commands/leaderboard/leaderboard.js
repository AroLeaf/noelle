import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import { weapons, artifacts, constants } from '../../lib/leaderboard/index.js';
import DME from 'discord-markdown-embeds';

const mappers = {
  score: entry => entry.noelle.getDamage(constants.NAMELESS).average,
  crit: entry => entry.noelle.getDamage(constants.NAMELESS).crit,
  nocrit: entry => entry.noelle.getDamage(constants.NAMELESS).noCrit,
  def: entry => entry.noelle.burstStats.DEF,
  atk: entry => entry.noelle.burstStats.ATK,
  er: entry => entry.noelle.burstStats.ER * 100,
  cv: entry => {
    const collected = {};
    for (const [k, v] of entry.noelle.artifacts.flatMap(i => Object.entries(i.stats))) {
      collected[k] ??= 0;
      collected[k] += v;
    }
    return (collected.CR * 2 + collected.CD) * 100;
  },
}

export default new PrefixCommand({
  name: 'leaderboard',
  options: [{
    name: 'er',
    short: 'e',
    args: [{
      type: PrefixCommandOptionType.INTEGER,
      name: 'er',
      required: true,
    }],
  }, {
    name: 'weapon',
    short: 'w',
    args: [{
      type: PrefixCommandOptionType.STRING,
      name: 'weapon',
      required: true,
    }],
  }, {
    name: 'refinement',
    short: 'r',
    args: [{
      type: PrefixCommandOptionType.INTEGER,
      name: 'refinement',
      required: true,
    }],
  }, {
    name: 'constellations',
    short: 'c',
    args: [{
      type: PrefixCommandOptionType.INTEGER,
      name: 'constellations',
      required: true,
    }],
  }, {
    name: 'artifacts',
    short: 'a',
    args: [{
      type: PrefixCommandOptionType.STRING,
      name: 'artifacts',
      required: true,
    }],
  }, {
    name: 'page',
    short: 'p',
    args: [{
      type: PrefixCommandOptionType.INTEGER,
      name: 'page',
      required: true,
    }],
  }, {
    name: 'strict',
    short: 's',
  }],
  args: [{
    type: PrefixCommandOptionType.STRING,
    name: 'sort',
  }],
}, async (message, { args, options }) => {
  const reply = content => message.reply({ content, allowedMentions: { parse: [], repliedUser: false } });

  options.er ??= 120;
  options.page ||= 1;
  args.sort = args.sort?.toLowerCase() || 'score';

  if (options.weapon) {
    const weapon = Object.entries(weapons).find(([,w]) => w.aliases.concat(w.name).some(a => a.toLowerCase() === options.weapon.toLowerCase()))?.[0];
    if (!weapon) return reply(`Invalid weapon \`${options.weapon}\`.`);
    options.weapon = weapon;
  }

  if (options.artifacts) {
    const sets = {};
    for (const part of options.artifacts.split(/\s*\/\s*/)) {
      const [, count, name] = part.match(/^(\d+)\s*(\S.*)$/s) || [];
      if (!count || !name) return reply('Invalid artifact format.');
      const set = Object.entries(artifacts).find(([,s]) => s.aliases.concat(s.name).some(a => a.toLowerCase() === name.toLowerCase()))?.[0];
      if (!set) return reply(`Invalid artifact set \`${name}\`.`);
      sets[set] = count;
    }
    options.artifacts = sets;
  }

  if (!mappers[args.sort]) return reply(`Invalid sort type \`${args.sort}\`.`);

  const leaderboard = message.client.leaderboard.query(options).sort((a, b) => mappers[args.sort](b) - mappers[args.sort](a));
  const position = leaderboard.toJSON().findIndex(entry => entry.user === message.author.id) + 1;
  const page = options.page > 0
    ? Math.min(options.page, Math.ceil(leaderboard.size / 20)) 
    : Math.max(Math.ceil(leaderboard.size / 20) + options.page + 1, 0);

  return message.reply(Object.assign(DME.render(`
    ---
    footer: page ${page} / ${Math.ceil(leaderboard.size / 20)}
    color: 0xe17f93
    ---
    # Noelle Mains Leaderboard

    Your position: ${position ? `#**${position}**` : '**You are not on this leaderboard**'}.

    ${leaderboard.toJSON().slice((page - 1) * 20, page * 20).map((entry, i) => `- #**${(page - 1) * 20 + i + 1}**: **${Math.round(mappers[args.sort](entry))}** by <@${entry.user}>`).join('\n')}
  `).messages()[0], {
    allowedMentions: { parse: [], repliedUser: false },
  }));
});