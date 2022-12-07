import * as transformer from './transformer.js';
import weapons from './weapons.js';
import artifacts from './artifacts.js';
import { util } from '@aroleaf/djs-bot';

export default class Noelle {
  constructor(data) {
    this.lvl = data.lvl;
    this.friendship = data.friendship;
    this.ascension = data.ascension;
    this.constellations = data.constellations;
    this.talentLevels = data.talentLevels;
    this.baseStats = data.baseStats;
    this.artifacts = data.artifacts;
    this.artifactSets = data.artifactSets;
    this.weapon = data.weapon;
  }

  static fromEnka(enkaNoelle) {
    return new Noelle(transformer.transform(enkaNoelle));
  }


  get stats() {
    const collected = {};

    const statSources = [
      // artifacts
      ...this.artifacts.map(i => i.stats),
      
      // weapon
      this.weapon.stats,
      weapons[this.weapon.id].stats[this.weapon.refinement],
      
      // ascension stat
      { PDEF: [0, 0, 0.075, 0.15, 0.15, 0.225, 0.3][this.ascension] },
    ];
    
    for (const [set, count] of Object.entries(this.artifactSets)) {
      if (count >= 2) statSources.push(artifacts[set].stats[2]);
      if (count >= 4) statSources.push(artifacts[set].stats[4]);
    }
    
    for (const [k, v] of statSources.flatMap(i => Object.entries(i))) {
      collected[k] ??= 0;
      collected[k] += v;
    }
    
    const stats = structuredClone(this.baseStats);

    for (const [k, v] of Object.entries(collected)) {
      switch (k) {
        case 'PHP':
        case 'PATK':
        case 'PDEF': {
          const _k = k.slice(1)
          stats[_k] ??= 0;
          stats[_k] += v * (this.baseStats[_k] || 0);
          break;
        }

        default: {
          stats[k] ??= 0;
          stats[k] += v;
        }
      }
    }

    for (const [set, count] of Object.entries(this.artifactSets)) artifacts[set]?.computeStats?.(stats, this, count);
    weapons[this.weapon.id]?.computeStats?.(stats, this, this.weapon);

    return stats;
  }

  get burstStats() {
    const DEFBonus = [ 0.40, 0.43, 0.46, 0.50, 0.53, 0.56, 0.60, 0.64, 0.68, 0.72, 0.76, 0.80, 0.85, 0.90 ][this.talentLevels.burst - 1] + (this.constellations === 6) * 0.5;
    return {
      ...this.stats,
      ATK: this.stats.ATK + this.stats.DEF * DEFBonus,
    }
  }


  getDamage(enemy) {
    enemy = structuredClone(enemy);
    const stats = structuredClone(this.burstStats);

    // geo resonance
    enemy.stats.Res.Geo -= 0.2;
    stats.DMG ??= 0;
    stats.DMG += 0.15;

    const n1Scaling = [ 0.7912, 0.8556, 0.9200, 1.0120, 1.0764, 1.1500, 1.2512, 1.3524, 1.4536, 1.5640, 1.6744 ];
    
    const baseDMG = scaling[this.talentLevels.normal - 1] * stats.ATK;
    const FDMGBonus = [ 'FDMG', 'FNormalDMG' ].reduce((a, v) => a + (stats[v] || 0), 0);
    const PDMGBonus = [ 'DMG', 'BurstDMG', 'NormalDMG', 'GeoDMG' ].reduce((a, v) => a + (stats[v] || 0), 1);
    const DEFMultiplier = 1 - enemy.stats.DEF / (enemy.stats.DEF + 5 * this.lvl + 500);
    const RESMultiplier = enemy.stats.Res.Geo < 0
      ? 1 - ( enemy.stats.Res.Geo / 2 )
      : enemy.stats.Res.Geo >= 0.75
      ? 1 / ( 4 * enemy.stats.Res.Geo + 1 )
      : 1 - enemy.stats.Res.Geo;

    const DMG = (baseDMG + FDMGBonus) * PDMGBonus * DEFMultiplier * RESMultiplier;

    return {
      noCrit: DMG,
      crit: DMG + DMG * stats.CD,
      average: DMG + DMG * stats.CD * Math.min(stats.CR, 1),
    } 
  }


  toJSON() {
    return util.objectPick(this, 'lvl', 'friendship', 'ascension', 'constellations', 'talentLevels', 'baseStats', 'artifacts', 'weapon', 'artifactSets');
  }
}