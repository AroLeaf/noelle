import * as constants from './constants.js';

export function getNoelle(data) {
  return data.avatarInfoList.find(avatar => avatar.avatarId === constants.NOELLE);
}

export function transform(enkaNoelle) {
  const noelle = {
    lvl: +enkaNoelle.propMap[4001].val,
    friendship: enkaNoelle.fetterInfo.expLevel,
    ascension: +enkaNoelle.propMap[1002].val,
    constellations: enkaNoelle.talentIdList.length,
    talentLevels: {
      normal: enkaNoelle.skillLevelMap[10341],
      skill: enkaNoelle.skillLevelMap[10342] + (enkaNoelle.proudSkillExtraLevelMap?.[3432] || 0),
      burst: enkaNoelle.skillLevelMap[10343] + (enkaNoelle.proudSkillExtraLevelMap?.[3439] || 0),
    },
    stats: {
      ATK: enkaNoelle.fightPropMap[4],
      DEF: enkaNoelle.fightPropMap[7],
      ER: 1,
      CR: 0.05,
      CD: 0.5,
    },
  }

  noelle.artifacts = enkaNoelle.equipList.filter(i => i.flat.itemType === 'ITEM_RELIQUARY').map(enkaArtifact => {
    const artifact = {
      set: enkaArtifact.flat.setNameTextMapHash,
      stats: {},
    }

    for (const stat of enkaArtifact.flat.reliquarySubstats.concat(enkaArtifact.flat.reliquaryMainstat)) {
      const propId = stat.mainPropId || stat.appendPropId;
      const propName = constants.FIGHT_PROP_NAMES[propId];
      if (propName) artifact.stats[propName] = constants.PERCENT_PROPS.includes(propName) ? stat.statValue / 100 : stat.statValue;;
    }

    return artifact;
  });

  noelle.artifacts.sets = noelle.artifacts.reduce((a, v) => {
    a[v.set] ??= 0;
    a[v.set]++;
    return a;
  }, {});

  noelle.weapon = enkaNoelle.equipList.filter(i => i.flat.itemType === 'ITEM_WEAPON').map(enkaWeapon => {
    const weapon = {
      id: enkaWeapon.flat.nameTextMapHash,
      lvl: enkaWeapon.weapon.level,
      ascension: enkaWeapon.weapon.promoteLevel,
      refinement: [...Object.values(enkaWeapon.weapon.affixMap)][0],
      stats: {},
    }

    for (const stat of enkaWeapon.flat.weaponStats) {
      const propName = constants.FIGHT_PROP_NAMES[stat.appendPropId];
      if (propName) weapon.stats[propName] = constants.PERCENT_PROPS.includes(propName) ? stat.statValue / 100 : stat.statValue;
    }

    return weapon;
  })[0];

  return noelle;
}