import { CommandFlagsBitField, PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import { weapons, artifacts, Leaderboard } from '../../lib/leaderboard/index.js';
import DME from 'discord-markdown-embeds';

// const lvlToAscension = {
//   20: 0,
//   40: 1,
//   50: 2,
//   60: 3,
//   70: 4,
//   80: 5,
//   90: 6,
// };

export default new PrefixCommand({
  name: 'leaderboard',
  aliases: ['lb'],
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
  // }, {
  //   name: 'override',
  //   short : 'o',
  //   description: 'Override builds. Takes 3 arguments: `weapon`, `artifacts`, and `stats`. If you want to set only the weapon, you can leave the other two arguments empty. If you want to set only the artifact, you need to use `auto` for the weapon argument. If you want to set only the stats, you need to use `auto` for both the weapon and artifact arguments.',
  //   args: [{
  //     type: PrefixCommandOptionType.STRING,
  //     name: 'weapon',
  //     description: 'Override the weapon used in all builds. Format examples: `"redhorn 5"`, `"wb 5 80/90"`, `"ss 67/70"`, `mine`, `auto`.',
  //   }, {
  //     type: PrefixCommandOptionType.STRING,
  //     name: 'artifacts',
  //     description: 'Override the artifact set(s) used in all builds. Format examples: `"4 husk"`, `"2 husk / 2 glad"`, `2petra/2husk`, `mine`, `auto`.',
  //   }, {
  //     type: PrefixCommandOptionType.STRING,
  //     name: 'stats',
  //     description: 'Override level, constellation, and ascension level for all builds. Format examples: `"90/90 6"`, `"1"`, `"80/90"`, `mine`, `auto`.',
  //   }],
  }],
  args: [{
    type: PrefixCommandOptionType.STRING,
    name: 'sort',
    description: `What to sort the leaderboard by. Allowed values: ${Object.keys(Leaderboard.mappers).map(k => `\`${k}\``).join(', ')}, defaults to \`score\`.`,
  }],
}, async (message, { args, options: { override, ...options } }) => {
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

  // if (override) {
  //   if (override.weapon) {
  //     switch (override.weapon.toLowerCase()) {
  //       case 'mine': {
  //         const weapon = message.client.leaderboard.cache.get(message.author.id)?.weapon;
  //         if (!weapon) return reply('You don\'t have a saved build to get the weapon from.');
  //         override.weapon = weapon;
  //         break;
  //       }

  //       case 'auto': {
  //         override.weapon = undefined;
  //         break;
  //       }

  //       default: {
  //         const [ weaponName, ...lvlAndRefinement ] = override.weapon.split(/\s+/);
      
  //         const weapon = Object.entries(weapons).find(([,w]) => w.aliases.concat(w.name).some(a => a.toLowerCase() === weaponName.toLowerCase()))?.[0];
  //         if (!weapon) return reply(`Invalid weapon \`${weaponName}\`.`);
  //         override.weapon = {
  //           id: weapon,
  //         };
          
  //         const levels = {};
  //         for (const value of lvlAndRefinement) {
  //           if (value.includes('/')) {
  //             if (levels.ascension || levels.lvl) return reply('Invalid weapon format.');
  //             const [ weaponLevel, ascensionLevel ] = value.split('/').map(n => parseInt(n));
  //             const ascension = lvlToAscension[ascensionLevel];
  //             if (!ascension) return reply(`Invalid ascension level \`${ascensionLevel}\`.`);
  //             if (isNaN(weaponLevel) || weaponLevel < 1 || weaponLevel > 90) return reply(`Invalid weapon level \`${weaponLevel}\`.`);
  //             levels.ascension = ascension;
  //             levels.lvl = weaponLevel;
  //           } else {
  //             if (levels.refinement) return reply('Invalid weapon format.');
  //             const refinement = parseInt(value);
  //             if (isNaN(refinement) || refinement < 1 || refinement > 5) return reply(`Invalid refinement level \`${refinement}\`.`);
  //             levels.refinement = refinement;
  //           }
  //         }
  //         Object.assign(override.weapon, levels);
  //       }
  //     }
  //   }

  //   if (override.artifacts) {
  //     switch (override.artifacts.toLowerCase()) {
  //       case 'mine': {
  //         const artifacts = message.client.leaderboard.cache.get(message.author.id)?.artifacts;
  //         if (!artifacts) return reply('You don\'t have a saved build to get the artifacts from.');
  //         override.artifacts = artifacts;
  //         break;
  //       }

  //       case 'auto': {
  //         override.artifacts = undefined;
  //         break;
  //       }

  //       default: {
  //         const sets = {};
  //         for (const part of override.artifacts.split(/\s*[\/,]\s*/)) {
  //           const [, count, name] = part.match(/^(\d+)\s*(\S.*)$/s) || [];
  //           if (!count || !name) return reply('Invalid artifact format.');
  //           const set = Object.entries(artifacts).find(([,s]) => s.aliases.concat(s.name).some(a => a.toLowerCase() === name.toLowerCase()))?.[0];
  //           if (!set) return reply(`Invalid artifact set \`${name}\`.`);
  //           sets[set] = parseInt(count);
  //           if (isNaN(count) || sets[set] < 1 || sets[set] > 5) return reply(`Invalid artifact count \`${count}\`.`);
  //         }
  //         override.artifacts = sets;
  //       }
  //     }
  //   }

  //   if (override.stats) {
  //     switch (override.stats.toLowerCase()) {
  //       case 'mine': {
  //         const build = message.client.leaderboard.cache.get(message.author.id);
  //         if (!build) return reply('You don\'t have a saved build to get the stats from.');
  //         override.lvl = build.lvl;
  //         override.ascension = build.ascension;
  //         override.constellation = build.constellation;
  //         break;
  //       }

  //       case 'auto': {
  //         override.lvl = undefined;
  //         override.ascension = undefined;
  //         override.constellation = undefined;
  //         break;
  //       }

  //       default: {
  //         for (const value of override.stats.split(/\s+/)) {
  //           if (value.includes('/')) {
  //             if (override.ascension || override.lvl) return reply('Invalid stats format.');
  //             const [ characterLevel, ascensionLevel ] = value.split('/').map(n => parseInt(n));
  //             const ascension = lvlToAscension[ascensionLevel];
  //             if (!ascension) return reply(`Invalid ascension level \`${ascensionLevel}\`.`);
  //             if (isNaN(characterLevel) || characterLevel < 1 || characterLevel > 90) return reply(`Invalid character level \`${characterLevel}\`.`);
  //             override.ascension = ascension;
  //             override.lvl = characterLevel;
  //           } else {
  //             if (override.constellation) return reply('Invalid stats format.');
  //             const constellation = parseInt(value);
  //             if (isNaN(constellation) || constellation < 0 || constellation > 6) return reply(`Invalid constellation level \`${constellation}\`.`);
  //             override.constellation = constellation;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  if (!Leaderboard.mappers[args.sort]) return reply(`Invalid sort type \`${args.sort}\`.`);

  const leaderboard = message.client.leaderboard.query(options).sort((a, b) => Leaderboard.mappers[args.sort](b) - Leaderboard.mappers[args.sort](a));
  const position = leaderboard.toJSON().findIndex(entry => entry.user === message.author.id) + 1;
  const page = options.page > 0
    ? Math.min(options.page, Math.ceil(leaderboard.size / 20)) 
    : Math.max(Math.ceil(leaderboard.size / 20) + options.page + 1, 0);

  const paged = leaderboard.toJSON().slice((page - 1) * 20, page * 20);

  return message.reply(Object.assign(DME.render(`
    ---
    footer: page ${page} / ${Math.ceil(leaderboard.size / 20)}
    color: 0xe17f93
    ---
    # Noelle Mains Leaderboard

    Your position: ${position ? `#**${position}**` : '**You are not on this leaderboard**'}.

    ${paged.map((entry, i) => `
      - #**${(page - 1) * 20 + i + 1}**:
        **${Leaderboard.mappers[options.view](entry).toFixed(Leaderboard.rounding[options.view])}**
        **${message.guild.members.resolve(entry.user)?.displayName || `<@${entry.user}>`}**
    `).join('')}
  `).messages()[0], {
    allowedMentions: { parse: [], repliedUser: false },
  }));
});