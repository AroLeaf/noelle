import { ApplicationCommandOptionType, PrefixCommand, SlashCommand } from '@aroleaf/djs-bot';
import { getAbyssStats, getAccounts } from '../lib/abyss/index.js';
import { constants } from '../lib/leaderboard/index.js';
import DME from 'discord-markdown-embeds';

export default new SlashCommand({
  name: 'chivalric-blossoms',
  description: 'Automatically get the "chivalric blossoms" role.',
  options: [{
    type: ApplicationCommandOptionType.String,
    name: 'cookies',
    description: 'your Hoyolab cookies (run the command without this to get info on how to do this).'
  }],
}, async (interaction, { cookies }) => {
  const reply = content => interaction.reply({ content, ephemeral: true });

  if (!cookies) return interaction.reply(Object.assign(DME.render(`
    ---
    color: 0xe17f93
    ---
    # Your Hoyolab cookies can be obtained as follows:
    
    - go to [your battle chronicle](https://act.hoyolab.com/app/community-game-records-sea/index.html#/ys)
    - open the browser developer console, this can usually be done with \`ctrl+shift+j\` / \`cmd+shift+j\` on Chrome, or with \`ctr+shift+i\` / \`cmd+shift+i\` and going to the "console" tab on most browsers.
    - paste \`copy(document.cookies)\` and press enter
    
    Your cookies will now be on your clipboard.

    **WARNING!** Only give this bot your cookies if you trust me, its developer, Leaf#1950, admin of Noelle Mains!
    **I don't store your cookies, or use them for anything else than running the required checks for this command.**
    Having your cookies does **not** allow me to block you out of your account, and does **not** give me access to your Genshin account, only to your Hoyolab account.
  `).messages()[0], { ephemeral: true }));

  const member = interaction.client.guilds.resolve(process.env.GUILD).members.resolve(interaction.user.id);
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