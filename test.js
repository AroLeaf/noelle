import fs from 'fs/promises';
import rolls from './ERRolls.json' assert { type: 'json' };

await fs.writeFile('damagePerER.json', JSON.stringify(Object.fromEntries(rolls.map(roll => [roll.toFixed(4), 0])), null, 2), 'utf8')