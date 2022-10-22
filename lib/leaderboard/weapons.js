export default {
  3995710363: {
    name: 'Wolf\'s Gravestone',
    stats: [
      { PATK: 0.60 },
      { PATK: 0.75 },
      { PATK: 0.90 },
      { PATK: 1.05 },
      { PATK: 1.20 },
    ],
  },
  
  // TODO: potential flat DMG
  1089950259: {
    name: 'Skyward Pride',
    stats: [
      { DMG: 0.8 },
      { DMG: 0.10 },
      { DMG: 0.12 },
      { DMG: 0.14 },
      { DMG: 0.16 },
    ],
  },
  
  2792766467: {
    name: 'The Unforged',
    stats: [
      { PATK: 0.40 },
      { PATK: 0.50 },
      { PATK: 0.60 },
      { PATK: 0.70 },
      { PATK: 0.80 },
    ],
  },
  
  1075647299: {
    name: 'Song of Broken Pines',
    stats: [
      { PATK: 0.36 },
      { PATK: 0.45 },
      { PATK: 0.54 },
      { PATK: 0.63 },
      { PATK: 0.72 },
    ],
  },
  
  3914951691: {
    name: 'Redhorn Stonethresher',
    stats: [
      { PDEF: 0.28 },
      { PDEF: 0.35 },
      { PDEF: 0.42 },
      { PDEF: 0.49 },
      { PDEF: 0.56 },
    ],
    computeStats: (stats, _, weapon) => {
      stats.FNormalDMG ??= 0;
      stats.FNormalDMG += stats.DEF * [ 0.4, 0.5, 0.6, 0.7, 0.8 ][weapon.refinement];
    },
  },
  
  2359799475: {
    name: 'Akuoumaru',
    stats: [
      { BurstDMG: 0.384 },
      { BurstDMG: 0.480 },
      { BurstDMG: 0.576 },
      { BurstDMG: 0.672 },
      { BurstDMG: 0.768 },
    ],
  },

  // TODO: calculate actual CR chance
  877751435: {
    name: 'Royal Greatsword',
    stats: [
      { CR: 0.40 },
      { CR: 0.50 },
      { CR: 0.60 },
      { CR: 0.70 },
      { CR: 0.80 },
    ],
  },
  
  680510411: {
    name: 'Whiteblind',
    stats: [
      { PATK: 0.24, PDEF: 0.24 },
      { PATK: 0.30, PDEF: 0.30 },
      { PATK: 0.36, PDEF: 0.36 },
      { PATK: 0.42, PDEF: 0.42 },
      { PATK: 0.48, PDEF: 0.48 },
    ],
  },

  930640955: {
    name: 'The Bell',
    stats: [
      { DMG: 0.12 },
      { DMG: 0.15 },
      { DMG: 0.18 },
      { DMG: 0.21 },
      { DMG: 0.24 },
    ],
  },

  // TODO: potential flat DMG
  2753539619: {
    name: 'Snow-Tombed Starsilver',
    stats: Array(5).fill({}),
  },

  735056795: {
    name: 'Favonius Greatsword',
    stats: Array(5).fill({}),
  },

  1437658243: {
    name: 'Serpent Spine',
    stats: [
      { DMG: 0.30 },
      { DMG: 0.35 },
      { DMG: 0.40 },
      { DMG: 0.45 },
      { DMG: 0.50 },
    ],
  },

  902184579: {
    name: 'Forest Regalia',
    stats: Array(5).fill({}),
  },

  1675686363: {
    name: 'Sacrificial Greatsword',
    stats: Array(5).fill({}),
  },

  20848859: {
    name: 'Blackcliff Slasher',
    stats: Array(5).fill({}),
  },

  3684723963: {
    name: 'Rainslasher',
    stats: Array(5).fill({}),
  },

  // TODO: potential flat DMG
  3722933411: {
    name: 'Prototype Archaic',
    stats: Array(5).fill({}),
  },

  3073454867: {
    name: 'Makhaira Aquamarine',
    stats: Array(5).fill({}),
    computeStats: (stats, _, weapon) => {
      stats.ATK += [ 0.24, 0.30, 0.36, 0.42, 0.48 ][weapon.refinement] * stats.EM;
    }
  },

  // TODO: potential flat DMG
  346510395: {
    name: 'Luxurious Sea-Lord',
    stats: [
      { BurstDMG: 0.12 },
      { BurstDMG: 0.15 },
      { BurstDMG: 0.18 },
      { BurstDMG: 0.21 },
      { BurstDMG: 0.24 },
    ],
  },

  2006422931: {
    name: 'Lithic Blade',
    stats: [
      { PATK: 0.21, CR: 0.09 },
      { PATK: 0.24, CR: 0.12 },
      { PATK: 0.27, CR: 0.15 },
      { PATK: 0.30, CR: 0.18 },
      { PATK: 0.33, CR: 0.21 },
    ],
  },

  4193089947: {
    name: 'Katsuragikiri Nagamasa',
    stats: Array(5).fill({}),
  },

  2614170427: {
    name: 'Skyrider Greatsword',
    stats: [
      { PATK: 0.24 },
      { PATK: 0.28 },
      { PATK: 0.32 },
      { PATK: 0.36 },
      { PATK: 0.40 },
    ],
  },

  // TODO: potential flat DMG
  3097441915: {
    name: 'Debate Club',
    stats: Array(5).fill({}),
  },

  4090429643: {
    name: 'Bloodtainted Greatsword',
    stats: Array(5).fill({}),
  },

  850802171: {
    name: 'White Iron Greatsword',
    stats: Array(5).fill({}),
  },

  1479961579: {
    name: 'Ferrous Shadow',
    stats: Array(5).fill({}),
  },

  1182966603: {
    name: 'Old Merc\'s Pal',
    stats: Array(5).fill({}),
  },

  2666951267: {
    name: 'Waster Greatsword',
    stats: Array(5).fill({}),
  }
}