import { CommandFlagsBitField, PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import { weapons, artifacts, Leaderboard } from '../../lib/leaderboard/index.js';
import DME from 'discord-markdown-embeds';

export default new PrefixCommand({
  name: 'leaderboard',
  description: 'Shows the Noelle Mains leaderboard. By default, it only shows builds with **120%** Energy Recharge or more, and sorts by average 1st hit normal attack damage during burst, with Geo resonance as only team buff.',
  flags: CommandFlagsBitField.Flags.GUILD_ONLY,
  options: [{
    name: 'er',
    short: 'e',
    description: 'Only show builds with at least this much Energy Recharge, defaults to **120%**.',
    args: [{
      type: PrefixCommandOptionType.INTEGER,
      name: 'er',
      required: true,
    }],
  }, {
    name: 'weapon',
    short: 'w',
    description: 'Show only builds with this weapon.',
    args: [{
      type: PrefixCommandOptionType.STRING,
      name: 'weapon',
      required: true,
    }],
  }, {
    name: 'refinement',
    short: 'r',
    description: 'Show only builds with their weapon refined to this level, or less.',
    args: [{
      type: PrefixCommandOptionType.INTEGER,
      name: 'refinement',
      required: true,
    }],
  }, {
    name: 'constellations',
    short: 'c',
    description: 'Show only builds with this amount of constellations unlocked, or less.',
    args: [{
      type: PrefixCommandOptionType.INTEGER,
      name: 'constellations',
      required: true,
    }],
  }, {
    name: 'artifacts',
    short: 'a',
    description: 'Show only builds with this/these artifact set(s). Format examples: `"4 husk"`, `"2 husk / 2 glad"`, `2petra/2husk`.',
    args: [{
      type: PrefixCommandOptionType.STRING,
      name: 'artifacts',
      required: true,
    }],
  }, {
    name: 'page',
    short: 'p',
    description: 'Which page of the leaderboard to show. Negative values count from the end (-1 is the last page).',
    args: [{
      type: PrefixCommandOptionType.INTEGER,
      name: 'page',
      required: true,
    }],
  }, {
    name: 'view',
    short: 'v',
    description: 'Change the stat shown, without changing the stat the leaderboard is sorted by.',
    args: [{
      type: PrefixCommandOptionType.STRING,
      name: 'view',
      required: true,
    }],
  }, {
    name: 'strict',
    short: 's',
    description: 'For the `refinement` and `constellations` options, don\'t allow builds with less than the provided value.',
  }/*, {
    name: 'override',
    short: 'o',
    description: `
      Allows you to override stats for all builds on the leaderboard.
    `,
    args: [{
      type: PrefixCommandOptionType.STRING,
      name: 'override',
      required: true,
    }]
  }*/],
  args: [{
    type: PrefixCommandOptionType.STRING,
    name: 'sort',
    description: `What to sort the leaderboard by. Allowed values: ${Object.keys(Leaderboard.mappers).map(k => `\`${k}\``).join(', ')}, defaults to \`score\`.`,
  }],
}, async (message, { args, options }) => {
  const reply = content => message.reply({ content, allowedMentions: { parse: [], repliedUser: false } });

  options.er ??= 120;
  options.page ||= 1;
  args.sort = args.sort?.toLowerCase() || 'score';
  options.view ??= args.sort;

  if (options.weapon) {
    const weapon = Object.entries(weapons).find(([,w]) => w.aliases.concat(w.name).some(a => a.toLowerCase() === options.weapon.toLowerCase()))?.[0];
    if (!weapon) return reply(`Invalid weapon \`${options.weapon}\`.`);
    options.weapon = weapon;
  }

  if (options.artifacts) {
    const sets = {};
    for (const part of options.artifacts.split(/\s*[\/,]\s*/)) {
      const [, count, name] = part.match(/^(\d+)\s*(\S.*)$/s) || [];
      if (!count || !name) return reply('Invalid artifact format.');
      const set = Object.entries(artifacts).find(([,s]) => s.aliases.concat(s.name).some(a => a.toLowerCase() === name.toLowerCase()))?.[0];
      if (!set) return reply(`Invalid artifact set \`${name}\`.`);
      sets[set] = count;
    }
    options.artifacts = sets;
  }

  if (!Leaderboard.mappers[args.sort]) return reply(`Invalid sort type \`${args.sort}\`.`);

  const leaderboard = message.client.leaderboard.query(options).sort((a, b) => Leaderboard.mappers[args.sort](b) - Leaderboard.mappers[args.sort](a));
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

    ${leaderboard.toJSON().slice((page - 1) * 20, page * 20).flatMap(e => [e,e]).map((entry, i) => `
      - #**${(page - 1) * 20 + i + 1}**:
        **${Leaderboard.mappers[options.view](entry).toFixed(Leaderboard.rounding[options.view])}**
        by **${message.guild.members.resolve(entry.user)?.displayName || `<@${entry.user}>`}**
    `).join('')}
  `).messages()[0], {
    allowedMentions: { parse: [], repliedUser: false },
  }));
});