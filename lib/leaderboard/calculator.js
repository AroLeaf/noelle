import weapons from './weapons.js';
import artifacts from './artifacts.js';

export function stats(noelle) {
  const collected = {};

  const statSources = [
    // artifacts
    ...noelle.artifacts.map(i => i.stats),
    
    // weapon
    noelle.weapon.stats,
    weapons[noelle.weapon.id].stats[noelle.weapon.refinement],
    
    // ascension stat
    { PDEF: [0, 0, 0.075, 0.15, 0.15, 0.225, 0.3][noelle.ascension] },
  ];
  
  for (const [set, count] of Object.entries(noelle.artifacts.sets)) {
    if (count >= 2) statSources.push(artifacts[set].stats[2]);
    if (count >= 4) statSources.push(artifacts[set].stats[4]);
  }
  
  for (const [k, v] of statSources.flatMap(i => Object.entries(i))) {
    collected[k] ??= 0;
    collected[k] += v;
  }
  
  const stats = { ...noelle.stats };

  for (const [k, v] of Object.entries(collected)) {
    switch (k) {
      case 'PHP':
      case 'PATK':
      case 'PDEF': {
        const _k = k.slice(1)
        stats[_k] ??= 0;
        stats[_k] += (v) * (noelle.stats[_k] || 0);
        break;
      }

      default: {
        stats[k] ??= 0;
        stats[k] += v;
      }
    }
  }

  for (const [set, count] of Object.entries(noelle.artifacts.sets)) artifacts[set]?.computeStats?.(stats, noelle, count);
  weapons[noelle.weapon.id]?.computeStats?.(stats, noelle, noelle.weapon);

  return stats;
}

export function enemyStats(enemy) {
  enemy.stats.res ??= 0;
  return {
    lvl: enemy.lvl,
    stats: {
      DEF: 5 * enemy.lvl + 500,
      Res: typeof enemy.stats.res === 'number' ? {
        Pyro: enemy.stats.res,
        Hydro: enemy.stats.res,
        Dendro: enemy.stats.res,
        Electro: enemy.stats.res,
        Anemo: enemy.stats.res,
        Cryo: enemy.stats.res,
        Geo: enemy.stats.res,
        Phys: enemy.stats.res,
      } : enemy.stats.res,
    },
  }
}

export function damage(noelle, enemy) {
  enemy = enemyStats(enemy);

  const noelleStats = { ...noelle.stats.parsed };

  // geo resonance
  enemy.stats.Res.Geo -= 0.2;
  noelleStats.DMG ??= 0;
  noelleStats.DMG += 0.15;

  // burst
  const DEFBonus = [ 0.40, 0.43, 0.46, 0.50, 0.53, 0.56, 0.60, 0.64, 0.68, 0.72, 0.76, 0.80, 0.85, 0.90 ][noelle.talentLevels.burst - 1] + (noelle.constellations === 6) * 0.5;
  noelleStats.ATK += noelleStats.DEF * DEFBonus;

  const FDMGBonus = [ 'FDMG', 'FNormalDMG' ].reduce((a, v) => a + (noelleStats[v] || 0), 0);
  const PDMGBonus = [ 'DMG', 'BurstDMG', 'NormalDMG', 'GeoDMG' ].reduce((a, v) => a + (noelleStats[v] || 0), 1);
  const baseDMG = [ 0.7912, 0.8556, 0.92, 1.012, 1.0764, 1.15, 1.2512, 1.3524, 1.4536, 1.564, 1.6744 ][noelle.talentLevels.normal - 1] * noelleStats.ATK;
  const DEFMultiplier = 1 - enemy.stats.DEF / (enemy.stats.DEF + 5 * noelle.lvl + 500);
  const RESMultiplier = enemy.stats.Res.Geo < 0
    ? 1 - ( enemy.stats.Res.Geo / 2 )
    : enemy.stats.Res.Geo >= 0.75
      ? 1 / ( 4 * enemy.stats.Res.Geo + 1 )
      : 1 - enemy.stats.Res.Geo;

  const DMG = (baseDMG + FDMGBonus) * PDMGBonus * DEFMultiplier * RESMultiplier;

  return {
    noCrit: DMG,
    crit: DMG + DMG * noelleStats.CD,
    avg: DMG + DMG * noelleStats.CD * Math.min(noelleStats.CR, 1),
  }
}