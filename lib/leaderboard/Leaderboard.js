import { Collection } from '@aroleaf/djs-bot';
import { EnkaManager } from './EnkaManager.js';
import Noelle from './Noelle.js';
import * as constants from './constants.js';

function deepAssign(target, ...sources) {
  for (const source of sources) {
    for (const key in source) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepAssign(target[key], source[key]);
        continue;
      }
      Object.assign(target, { [key]: source[key] });
    }
  }
  Object.assign(target || {}, ...sources);
  return target;
}

export default class Leaderboard {
  constructor(cached) {
    this.enka = new EnkaManager(constants.NOELLE);
    this.cache = new Collection(cached.map(entry => [entry.user, {
      ...entry,
      noelle: new Noelle(entry.noelle),
    }]));
  }

  query(filter = {}, override = {}) {
    return this.cache.filter(entry => ![
      filter.er / 100 > entry.noelle.stats.ER,
      filter.strict ? filter.constellations && filter.constellations !== entry.noelle.constellations : filter.constellations < entry.noelle.constellations,
      filter.strict ? filter.refinement && filter.refinement !== (entry.noelle.weapon.refinement + 1) : filter.refinement < (entry.noelle.weapon.refinement + 1),
      filter.weapon && entry.noelle.weapon.id !== filter.weapon,
      filter.artifacts && Object.entries(filter.artifacts).some(([set, count]) => !entry.noelle.artifactSets[set] || entry.noelle.artifactSets[set] < count),
    ].some(b => b))
    // .mapValues(entry => {
    //   const noelle = new Noelle(entry.noelle);
    //   deepAssign(noelle.stats, override);
    //   console.log(noelle);
    //   return { ...entry, noelle };
    // });
  }

  async getBuild(uid) {
    const data = await this.enka.fetch(uid);
    return Noelle.fromEnka(data);
  }

  async submit(user, uid, noelle) {
    noelle ??= await this.getBuild(uid);
    this.cache.set(user, { user, uid, noelle });
    return noelle;
  }

  static mappers = {
    score: entry => entry.noelle.getDamage(constants.NAMELESS).average,
    crit: entry => entry.noelle.getDamage(constants.NAMELESS).crit,
    nocrit: entry => entry.noelle.getDamage(constants.NAMELESS).noCrit,
    weighted: entry => entry.noelle.getDamage(constants.NAMELESS).average * entry.noelle.burstStats.ER,
    weightedln: entry => entry.noelle.getDamage(constants.NAMELESS).average * (1 + Math.log(entry.noelle.burstStats.ER)),
    weightedlf: entry => entry.noelle.getDamage(constants.NAMELESS).average * (1 + 0.5 * (1 / (1 + Math.E ** (-25*(entry.noelle.burstStats.ER - 1.2))) - 0.5)),
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

  static rounding = {
    score: 0,
    crit: 0,
    nocrit: 0,
    weighted: 0,
    weightedln: 0,
    def: 0,
    atk: 0,
    er: 1,
    cv: 1,
  }
}