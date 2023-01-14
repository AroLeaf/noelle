import { PrefixCommand } from '@aroleaf/djs-bot';
import { getAbyssStats, getAccounts } from '../lib/abyss/index.js';
import { constants } from '../lib/leaderboard/index.js';

export default new PrefixCommand({
  name: 'cb',
  description: `
    Get the Chivalric Blossoms role. Requirement: 36-star the Spiral Abyss using Noelle in every chamber.

    **It is recommended to DM the bot this command, instead of using a public channel, as that will ensure nobody else can quickly grab your Hoyolab cookies before your message is deleted!**

    # \`<cookies>\`
    *Quotation marks are not required for this argument*
    Your Hoyolab cookies. These can be obtained as follows:
    
    - go to [your battle chronicle](https://act.hoyolab.com/app/community-game-records-sea/index.html#/ys)
    - open the browser developer console, this can usually be done with \`ctrl+shift+j\` / \`cmd+shift+j\` on Chrome, or with \`ctr+shift+i\` / \`cmd+shift+i\` and going to the "console" tab on most browsers.
    - paste \`copy(document.cookies)\` and press enter
    
    Your cookies will now be on your clipboard.

    **WARNING!** Only give this bot your cookies if you trust me, its developer, Leaf#1950, admin of Noelle Mains!
    **I promise I don't store these cookies, or use them for anything else than running the required checks for this command.**
    Having these cookies does **not** allow me to block you out of your account, and does **not** give me access to your Genshin account, only to your Hoyolab account.
  `,
}, async (message, args) => {
  const reply = (content) => message.channel.send(content);
  if (message.deletable) await message.delete();
  
  const cookies = args.join(' ');
  if (!cookies) return reply('Missing argument `cookies`!');

  const member = message.client.guilds.resolve(process.env.GUILD).members.resolve(message.author.id);
  if (!member) return reply('You are not a member of Noelle Mains.');

  const accounts = await getAccounts(cookies);
  if (!accounts?.[0]?.game_role_id) return reply('Failed to find a Genshin account attached to your cookies.');
  
  const abyss = await getAbyssStats(cookies, accounts[0].game_role_id);
  if (!abyss) return reply('Failed to find Spiral Abyss stats for your account.');

  if (abyss.floors.reduce((stars, floor) => stars + floor.star, 0) < 36) return reply('You didn\'t 36-star the Spiral Abyss!');
  
  const withoutNoelle = abyss.floors.flatMap(floor => floor.levels.map(level => [floor, level])).filter(([,level]) => !level.battles.flatMap(battle => battle.avatars).some(avatar => avatar.id === constants.NOELLE));
  if (withoutNoelle.length) return reply(`You didn't use Noelle in:\n${withoutNoelle.map(([floor, level]) => `**${floor.index}-${level.index}**`).join(', ')}\nYou need to use Noelle in **all** chambers to be able to claim the role.`);

  await member.roles.add(process.env.CHIVALRIC_BLOSSOMS);
  return reply('You got the role!');
});