import { Collection } from '@aroleaf/djs-bot';
import { EnkaManager } from './EnkaManager.js';
import Noelle from './Noelle.js';
import * as constants from './constants.js';

export default class Leaderboard {
  constructor(cached) {
    this.enka = new EnkaManager(constants.NOELLE);
    this.cache = new Collection(cached.map(entry => [entry.user, {
      ...entry,
      noelle: new Noelle(entry.noelle),
    }]));
  }

  query(filter = {}) {
    return this.cache.filter(entry => !(
      filter.er / 100 > entry.noelle.stats.ER
      || filter.constellations < entry.noelle.constellations
      || filter.refinement < (entry.noelle.weapon.refinement + 1)
      || filter.weapon && entry.noelle.weapon.id !== filter.weapon
      || filter.artifacts && Object.entries(filter.artifacts).some(([set, count]) => !entry.noelle.artifactSets[set] || entry.noelle.artifactSets[set] < count)
    ));
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
}