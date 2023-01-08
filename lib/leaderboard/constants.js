export const NOELLE = 10000034;

export const FIGHT_PROP_NAMES = {
  FIGHT_PROP_HP: 'HP',
  FIGHT_PROP_HP_PERCENT: 'PHP',
  FIGHT_PROP_ATTACK: 'ATK',
  FIGHT_PROP_ATTACK_PERCENT: 'PATK',
  FIGHT_PROP_DEFENSE: 'DEF',
  FIGHT_PROP_DEFENSE_PERCENT: 'PDEF',
  FIGHT_PROP_ELEMENT_MASTERY: 'EM',
  FIGHT_PROP_CRITICAL: 'CR',
  FIGHT_PROP_CRITICAL_HURT: 'CD',
  FIGHT_PROP_CHARGE_EFFICIENCY: 'ER',
  FIGHT_PROP_FIRE_ADD_HURT: 'PyroDMG',
  FIGHT_PROP_WATER_ADD_HURT: 'HydroDMG',
  FIGHT_PROP_GRASS_ADD_HURT: 'DendroDMG',
  FIGHT_PROP_ELEC_ADD_HURT: 'ElectroDMG',
  FIGHT_PROP_WIND_ADD_HURT: 'AnemoDMG',
  FIGHT_PROP_ICE_ADD_HURT: 'CryoDMG',
  FIGHT_PROP_ROCK_ADD_HURT: 'GeoDMG',
  FIGHT_PROP_PHYSICAL_ADD_HURT: 'PhysDMG',
}


export const PERCENT_PROPS = [
  'PHP',
  'PATK',
  'PDEF',
  'CR',
  'CD',
  'ER',
  'PyroDMG',
  'HydroDMG',
  'DendroDMG',
  'ElectroDMG',
  'AnemoDMG',
  'CryoDMG',
  'GeoDMG',
  'PhysDMG',
];

export const PROPER_PROP_NAMES = {
  HP: 'HP',
  PHP: 'HP',
  ATK: 'ATK',
  PATK: 'ATK',
  DEF: 'DEF',
  PDEF: 'DEF',
  EM: 'Elemental Mastery',
  CR: 'CRIT Rate',
  CD: 'CRIT DMG',
  ER: 'Energy Recharge',
  PyroDMG: 'Pyro DMG Bonus',
  HydroDMG: 'Hydro DMG Bonus',
  DendroDMG: 'Dendro DMG Bonus',
  ElectroDMG: 'Electro DMG Bonus',
  AnemoDMG: 'Anemo DMG Bonus',
  CryoDMG: 'Cryo DMG Bonus',
  GeoDMG: 'Geo DMG Bonus',
  PhysDMG: 'Physical DMG Bonus',
}


export const NAMELESS = {
  lvl: 90,
  stats: {
    DEF: 950,
    Res: {
      Pyro: 0.1,
      Hydro: 0.1,
      Dendro: 0.1,
      Electro: 0.1,
      Anemo: 0.1,
      Cryo: 0.1,
      Geo: 0.1,
      Phys: 0.1
    }
  }
}

export const ENKA_ERRORS = {
  INVALID_UID: 0,
  NO_CHARACTER_DETAILS: 1,
  CHARACTER_NOT_PUBLIC: 2,
}