import { PrefixCommand } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';

const render = DME.render(`
  ---
  color: 0xe17f93
  ---

  # Weapon Recommendations
  - **C0**: RS > SP/SS/Gravestone/Unforged > WB > Fav
  - **C6**: RS > SP/SS > WB(C6)/Gravestone/Unforged > Fav

  # Details
  - **Redhorn Stonethresher**: R1 RS is better than R5 SS, the prior best weapon. Additionally, Redhorn gives Noelle DEF% alongside its massive CRIT DMG% main stat.
  - **Skyward Pride**: Excellent Energy Recharge and damage, but vacuum blades deal physical damage.
  - **Serpent Spine**: Second highest raw damage, but requires some caution to preserve stacks
  - **Favonius Greatsword(R3+)**: Extremely flexible weapon, but lower dps. Allows Noelle to solo battery, much better with higher refinements.
  - **Whiteblind**: F2P and still respectable dps. Offers tankiness and healing. Make sure to get max stacks BEFORE using burst.
  - **Wolf's Gravestone**: Decent damage, best for ability to enable supports as well. 
  - **The Unforged**: Slightly better damage than Gravestone if you can keep shields up (bolide helps). Does not buff supports like Gravestone though.
`).messages()[0];

export default new PrefixCommand({
  name: 'weapons',
  description: 'Recommended weapons for Noelle.',
}, async (message) => {
  return message.reply(render);
});