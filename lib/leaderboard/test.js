import { calculator, constants } from './index.js';

// import Noelle from './Noelle.js';

// const data = await fetch(`https://enka.network/u/701005800/__data.json`).then(res => res.json()).catch(() => {});

// const enkaNoelle = transformer.getNoelle(data);

// const noelle = Noelle.fromEnka(enkaNoelle);
// const damage = noelle.getDamage(constants.NAMELESS);

// console.log(damage, noelle.stats);

console.log(calculator.enemyStats(constants.NAMELESS));