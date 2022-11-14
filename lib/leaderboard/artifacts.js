export default {
  4145306051: {
    name: 'Gilded Dreams',
    aliases: ['gilded', 'gd'],
    stats: {
      2: { EM: 80 },
      4: {  },
    },
  },

  1675079283: {
    name: 'Deepwood Memories',
    aliases: ['deepwood', 'dm'],
    stats: {
      2: { DendroDmg: 0.15 },
      4: {  },
    },
  },

  3626268211: {
    name: 'Echoes of an Offering',
    aliases: ['echoes', 'eo'],
    stats: {
      2: { PATK: 0.18 },
      4: {},
    },
    computeStats: (stats, _, count) => {
      if (count >= 4) {
        stats.FNormalDMG ??= 0;
        stats.FNormalDMG += stats.ATK * 0.7;
      }
    },
  },

  1558036915: {
    name: 'Vermillion Hereafter',
    aliases: ['vermillion', 'vh'],
    stats: {
      2: { PATK: 0.18 },
      4: { PATK: 0.48 },
    },
  },

  1756609915: {
    name: 'Ocean-Hued Clam',
    aliases: ['clam', 'oc'],
    stats: {
      2: {  },
      4: {  },
    },
  },
  
  2546254811: {
    name: 'Husk of Opulent Dreams',
    aliases: ['husk', 'hod'],
    stats: {
      2: { PDEF: 0.3 },
      4: { PDEF: 0.24, GeoDMG: 0.24 },
    },
  },

  2276480763: {
    name: 'Emblem of Severed Fate',
    aliases: ['emblem', 'esf'],
    stats: {
      2: { ER: 0.2 },
      4: {  },
    },
    computeStats: (stats, _, count) => {
      if (count >= 4) {
        stats.BurstDMG ??= 0;
        stats.BurstDMG += Math.min(stats.ER * 0.25, 0.75);
      }
    },
  },

  4144069251: {
    name: 'Shimenawa\'s Reminiscence',
    aliases: ['shimenawa\'s', 'shimenawas', 'shimenawa', 'sr'],
    stats: {
      2: { PATK: 0.18 },
      4: { NormalDMG: 0.5 },
    },
  },

  862591315: {
    name: 'Pale Flame',
    aliases: ['pf'],
    stats: {
      2: { PhysDMG: 0.25 },
      4: { PATK: 0.18, PhysDMG: 0.25 },
    },
  },

  // TODO: not clear what to do with 4pc bonus
  1337666507: {
    name: 'Tenacity of the Millelith',
    aliases: ['millelith', 'tm'],
    stats: {
      2: { PHP: 0.2 },
      4: {  },
    },
  },

  156294403: {
    name: 'Heart of Depth',
    aliases: ['depth', 'hd'],
    stats: {
      2: { HydroDMG: 0.15 },
      4: { NormalDMG: 0.3 },
    },
  },

  933076627: {
    name: 'Blizzard Strayer',
    aliases: ['blizzard', 'bs'],
    stats: {
      2: { CryoDMG: 0.15 },
      4: { },
    },
  },

  1524173875: {
    name: 'Crimson Witch of Flames',
    aliases: ['crimson', 'witch', 'cwf'],
    stats: {
      2: { PyroDMG: 0.15 },
      4: { PyroDMG: 0.075 },
    },
  },

  1632377563: {
    name: 'Lavawalker',
    aliases: ['lw'],
    stats: {
      2: {  },
      4: {  },
    },
  },

  2512309395: {
    name: 'Thundering Fury',
    aliases: ['tf'],
    stats: {
      2: { ElectroDMG: 0.15 },
      4: {  },
    },
  },

  1873342283: {
    name: 'Thundersoother',
    aliases: ['ts'],
    stats: {
      2: {  },
      4: {  },
    },
  },

  1438974835: {
    name: 'Retracing Bolide',
    aliases: ['bolide', 'rb'],
    stats: {
      2: {  },
      4: { NormalDMG: 0.4 },
    },
  },

  2040573235: {
    name: 'Archaic Petra',
    aliases: ['archaic', 'petra', 'ap'],
    stats: {
      2: { GeoDMG: 0.15 },
      4: {  },
    },
  },

  1562601179: {
    name: 'Viridescent Venerer',
    aliases: ['viridescent', 'venerer', 'vv'],
    stats: {
      2: { AnemoDMG: 0.15 },
      4: {  },
    },
  },

  83115355: {
    name: 'Maiden Beloved',
    aliases: ['maiden', 'mb'],
    stats: {
      2: {  },
      4: {  },
    },
  },

  1541919827: {
    name: 'Bloodstained Chivalry',
    aliases: ['bloodstained', 'bc'],
    stats: {
      2: { PhysDMG: 0.25 },
      4: {  },
    },
  },

  1751039235: {
    name: 'Noblesse Oblige',
    aliases: ['noblesse', 'no'],
    stats: {
      2: { BurstDMG: 0.2 },
      4: { PATK: 0.2 },
    },
  },

  147298547: {
    name: 'Wanderer\'s Troupe',
    aliases: ['Wanderer\'s', 'wanderers', 'wanderer', 'wt'],
    stats: {
      2: { EM: 80 },
      4: {  },
    },
  },

  1212345779: {
    name: 'Gladiator\'s Finale',
    aliases: ['gladiator', 'glad', 'gf'],
    stats: {
      2: { PATK: 0.18 },
      4: { NormalDMG: 0.35 },
    },
  },

  3618167299: {
    name: 'Scholar',
    aliases: [],
    stats: {
      2: { ER: 0.2 },
      4: {  },
    },
  },

  1186209435: {
    name: 'Gambler',
    aliases: [],
    stats: {
      2: {  },
      4: {  },
    },
  },

  2890909531: {
    name: 'Martial Artist',
    aliases: ['ma'],
    stats: {
      2: { NormalDMG: 0.15 },
      4: { NormalDMG: 0.25 },
    },
  },

  3535784755: {
    name: 'Brave Heart',
    aliases: ['brave', 'bh'],
    stats: {
      2: { PATK: 0.18 },
      4: { DMG: 0.3 },
    },
  },

  4082302819: {
    name: 'Defender\'s Will',
    aliases: ['defender\'s', 'defenders', 'defender', 'dw'],
    stats: {
      2: { PDEF: 0.3 },
      4: {  },
    },
  },

  2764598579: {
    name: 'The Exile',
    aliases: ['exile'],
    stats: {
      2: { ER: 0.2 },
      4: {  },
    },
  },

  3890292467: {
    name: 'Instructor',
    aliases: [],
    stats: {
      2: { EM: 80 },
      4: { EM: 120 },
    },
  },

  855894507: {
    name: 'Berserker',
    aliases: [],
    stats: {
      2: { CR: 0.12 },
      4: { CR: 0.24 },
    },
  },

  1383639611: {
    name: 'Tiny Miracle',
    aliases: ['miracle', 'tm'],
    stats: {
      2: {  },
      4: {  },
    },
  },

  2364208851: {
    name: 'Resolution of Sojourner',
    aliases: ['resolution', 'sojourner', 'rs'],
    stats: {
      2: { PATK: 0.18 },
      4: {  },
    },
  },

  3782508715: {
    name: 'Traveling Doctor',
    aliases: ['doctor', 'td'],
    stats: {
      2: {  },
      4: {  },
    },
  },

  1103732675: {
    name: 'Lucky Dog',
    aliases: ['lucky', 'ld'],
    stats: {
      2: { DEF: 100 },
      4: {  },
    },
  },

  2191797987: {
    name: 'Adventurer',
    aliases: [],
    stats: {
      2: { HP: 1000 },
      4: {  },
    },
  },
}