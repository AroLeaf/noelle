import { PrefixCommand } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';

const render = DME.render(`
  ---
  color: 0xe17f93
  ---

  # Artifact Recommendations
  # Artifact Set
  **Husk** is around **10%** more damage than the other two options.
  **1%** dps difference between Bolide and Gladiator's. Choose based on your own playstyle.

  # Details
  - **Husk of Opulent Dreams**: Highest DPS and Increases DEF for more healing and shield size.
  - **Retracing Bolide**: Offers stronger shields and farmability if you can keep a shield up
  - **Gladiator's Finale**: Marginally higher DPS; consistent and unconditional damage boost.

  # Artifact Stats
  *Try to aim for 130+% ER*
  - Sands: ATK / DEF / ER
  - Goblet: GEO DMG
  - Hat: Crit
  - Substats: Crit > ATK / DEF / ER

  # DEF vs ATK
  ATK is better if your Sweeping Time (Noelle's Burst) level is 8 or lower. At higher levels, DEF is better.
`).messages()[0];

export default new PrefixCommand({
  name: 'artifacts',
  description: 'Recommended artifacts for Noelle.',
}, async (message) => {
  return message.reply(render);
});