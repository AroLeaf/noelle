import { PrefixCommand } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';

const render = DME.render(`
  ---
  color: 0xe17f93
  ---

  # Talent Priorities
  1. **Normal Attack**: Damage dealt by Noelle is almost exclusively from her Normal Attack, thus it's clear we would want to max this first
  2. **Sweeping Time**: Increases the DEF to ATK conversion ratio, but the damage of the skill itself and the value of the conversion is much less than the increase in multiplier from levelling the Normal Attack. At level T9 DEF gives more damage than ATK
  3. **Breastplate**: Increases shield strength, healing, and damage, but isn't really important for DPS. Can be worth levelling for support Noelle builds.
`).messages()[0];

export default new PrefixCommand({
  name: 'talents',
  description: 'Recommended talent upgrade order for Noelle.',
}, async (message) => {
  return message.reply(render);
});