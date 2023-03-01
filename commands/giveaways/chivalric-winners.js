import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';

export default new PrefixCommand({
  name: 'chivalric-winners',
  description: 'Randomly chooses winners for the Chivalric Blossoms giveaways.',
  args: [{
    type: PrefixCommandOptionType.INTEGER,
    name: 'amount',
    description: 'The amount of winners to choose.',
    required: true,
  }],
}, async (message, { args: { amount } }) => {
  const contestants = message.guild.members.cache.filter(member => member.roles.resolve(process.env.CHIVALRIC_BLOSSOMS));
  const winners = contestants.sort(() => Math.random() - 0.5).first(amount);

  const template = DME.template(`
    ---
    color: 0xe17f93
    ---
    
    # Chivalric Blossoms Winners
    ${winners.map(winner => winner.user.tag).join(', ')}

    # Role Reset
    {status}
  `);

  const reply = await message.reply(template.render({ status: 'Removing roles...' }).messages()[0]);

  for (const contestant of contestants.values()) {
    await contestant.roles.remove(process.env.CHIVALRIC_BLOSSOMS);
  }

  await reply.edit(template.render({ status: 'Role removed from all members!' }).messages()[0]);
});